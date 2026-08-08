/* Executes Arjun's tool calls.
 *
 * The websocket is held by the browser, so toolCall frames land there — but the
 * browser only relays them here. Execution is server-side so the tool surface is
 * an allow-list, arguments are validated, and the model can never reach anything
 * that was not declared.
 *
 * Every tool here is READ ONLY. There is no claim tool, by design: uniqueness is
 * a partial unique index, so a misheard booth would not merely record a wrong row
 * — it would block the real volunteer for that booth, and that is the one failure
 * this system cannot absorb. The enrolment is a button the farmer taps.
 */

const SUPABASE_URL = process.env.BKS_SUPABASE_URL || 'https://lhnorkjfldywnrqqunqn.supabase.co';
const SUPABASE_ANON = process.env.BKS_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxobm9ya2pmbGR5d25ycXF1bnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzgxMjcsImV4cCI6MjA4NzQxNDEyN30.y90MFaq7qJ4YxuF-6HsY0WUZ9zSDJYwfl6F5r-JJrxI';

async function rpc(name, body) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON,
      Authorization: `Bearer ${SUPABASE_ANON}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!r.ok) throw new Error(`${name} ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return r.json();
}

const int = (v) => {
  const n = parseInt(v, 10);
  return Number.isFinite(n) ? n : null;
};

/* One building usually holds more than one booth. He knows the building, not
   which room, so results collapse to one card per building and the booth is
   settled afterwards by the server. */
function groupByBuilding(rows) {
  const map = new Map();
  for (const r of rows || []) {
    const key = `${r.ac_no}|${r.booth_name}`;
    if (!map.has(key)) {
      map.set(key, {
        booth_name: r.booth_name, ac_no: r.ac_no,
        ac_name: r.ac_name, district: r.district, booths: []
      });
    }
    map.get(key).booths.push(r.booth_no);
  }
  return [...map.values()].map((b) => {
    b.booths.sort((x, y) => x - y);
    return b;
  });
}

const TOOLS = {
  async find_building(args) {
    const q = String(args.query_latin || '').trim();
    if (q.length < 3) return { error: 'query_too_short', say: 'Ask him to say the name again, a little longer.' };

    const acNo = int(args.ac_no);
    const rows = await rpc('bks_search_booths', {
      p_query: q,
      p_ac_no: acNo && acNo >= 1 && acNo <= 294 ? acNo : null,
      p_district: args.district ? String(args.district).slice(0, 60) : null,
      p_limit: 20
    });

    const groups = groupByBuilding(rows).slice(0, 5);
    if (!groups.length) {
      return {
        found: 0,
        error: 'no_match',
        say: 'Nothing matched. Ask him to say the village name instead of the school name, or to say it differently.'
      };
    }
    return {
      found: groups.length,
      buildings: groups.map((g) => ({
        booth_name: g.booth_name, ac_no: g.ac_no, ac_name: g.ac_name,
        district: g.district, booth_count: g.booths.length
      })),
      heard_bn: args.query_bn || null
    };
  },

  async get_building_booths(args) {
    const acNo = int(args.ac_no);
    const name = String(args.booth_name || '').trim();
    if (!acNo || !name) return { error: 'bad_args' };

    const info = await rpc('bks_building_booths', { p_ac_no: acNo, p_booth_name: name });
    const assigned = info.assigned_booth_no || info.fallback_booth_no;
    if (!assigned) {
      return {
        error: 'building_full',
        booths: info.booths,
        say: 'Every booth at this building already has a full team. Offer him one of the other buildings from the search.'
      };
    }
    return {
      ac_no: acNo,
      booth_name: name,
      booths: info.booths,
      booth_count: (info.booths || []).length,
      assigned_booth_no: assigned,
      assigned_role: info.assigned_role || 'booth_sahayak',
      say:
        (info.booths || []).length > 1
          ? `This building has ${info.booths.length} booths. Booth ${assigned} is the one to give him. Tell him plainly that the district team will match it against his slip when they call.`
          : `One booth here, number ${assigned}.`
    };
  },

  async get_booth_by_number(args) {
    const acNo = int(args.ac_no);
    const boothNo = int(args.booth_no);
    if (!acNo || !boothNo) return { error: 'bad_args' };

    const rows = await rpc('bks_booths_in_ac', { p_ac_no: acNo });
    const hit = (rows || []).find((r) => Number(r.booth_no) === boothNo);
    if (!hit) return { error: 'not_found', say: 'That booth number does not exist in this constituency. Ask him to check the slip.' };

    const info = await rpc('bks_building_booths', { p_ac_no: acNo, p_booth_name: hit.booth_name });
    return {
      ac_no: acNo, booth_no: boothNo, booth_name: hit.booth_name,
      assigned_booth_no: info.assigned_booth_no || boothNo,
      assigned_role: info.assigned_role || 'booth_sahayak'
    };
  },

  /* Does not enrol anyone. It hands the client a validated selection to render
     as a card. The model cannot fabricate one: every field is re-derived here
     from the database, not taken from the model's arguments. */
  async show_booth_card(args) {
    const acNo = int(args.ac_no);
    const boothNo = int(args.booth_no);
    if (!acNo || !boothNo) return { error: 'bad_args' };

    const rows = await rpc('bks_booths_in_ac', { p_ac_no: acNo });
    const hit = (rows || []).find((r) => Number(r.booth_no) === boothNo);
    if (!hit) return { error: 'not_found', say: 'That booth does not exist. Do not show a card; find the building again.' };

    const [av, acRow] = await Promise.all([
      rpc('bks_booth_availability', { p_ac_no: acNo, p_booth_no: boothNo }),
      (async () => {
        const r = await fetch(
          `${SUPABASE_URL}/rest/v1/bks_wb_constituencies?select=ac_name,district&ac_no=eq.${acNo}&limit=1`,
          { headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` } }
        );
        const j = await r.json();
        return (j && j[0]) || {};
      })()
    ]);

    const role = av.prabhari_taken ? 'booth_sahayak' : 'booth_prabhari';
    return {
      card: {
        ac_no: acNo,
        booth_no: boothNo,
        booth_name: hit.booth_name,
        ac_name: acRow.ac_name || null,
        district: acRow.district || null,
        role,
        held_by: av.held_by || null,
        full_name: args.full_name ? String(args.full_name).slice(0, 120) : null
      },
      say:
        role === 'booth_prabhari'
          ? 'The card is on his screen. Tell him to type his name and press the button.'
          : 'This booth already has a leader, so he joins as a helper. Say so, then tell him to type his name and press the button.'
    };
  }
};

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }

  const name = body && body.name;
  const fn = Object.prototype.hasOwnProperty.call(TOOLS, name) ? TOOLS[name] : null;
  if (!fn) {
    res.status(400).json({ error: 'unknown_tool' });
    return;
  }

  try {
    const result = await fn(body.args || {});
    res.setHeader('cache-control', 'no-store');
    res.status(200).json({ ok: true, result });
  } catch (err) {
    // Reported as a successful response carrying an error field: a dropped tool
    // response hangs the model's turn forever, whereas this lets Arjun recover
    // out loud and offer the farmer another route.
    res.status(200).json({
      ok: true,
      result: { error: 'lookup_failed', say: 'Tell him the line is weak, and ask him to say the name once more.' },
      detail: String(err && err.message || err).slice(0, 200)
    });
  }
};
