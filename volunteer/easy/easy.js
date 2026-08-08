/* Booth volunteer — the easy flow.
 *
 * The old form asked a farmer for four things he does not know: his district,
 * his assembly constituency number, its name, and his booth part number.
 * Those are Election Commission facts, printed on a slip he may not read.
 *
 * He knows exactly one thing: the building he votes in. So that is the only
 * thing this asks for. Everything else -- constituency, AC number, booth
 * number, district -- is looked up from the 80,710-row booth reference and
 * never shown as a question.
 *
 * Nothing is asked here that the district team cannot ask later on the phone.
 * Name and mobile only. Crops, land, age and the rest belong in a conversation
 * with Arjun, not in a form standing in a field.
 */

const SUPABASE_URL = 'https://lhnorkjfldywnrqqunqn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxobm9ya2pmbGR5d25ycXF1bnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzgxMjcsImV4cCI6MjA4NzQxNDEyN30.y90MFaq7qJ4YxuF-6HsY0WUZ9zSDJYwfl6F5r-JJrxI';

/* ------------------------------------------------------------------ */
/* Words                                                               */
/* ------------------------------------------------------------------ */

const T = {
  en: {
    q1:"Where do you vote?",
    q1help:"Type the name of your school or your village.",
    q1ph:"School or village name",
    q1hint:"Start typing — at least 3 letters.",
    searching:"Looking…",
    noneFound:"Nothing found. Try a shorter word, or use the list below.",
    dontKnow:"I don't know the name — show me a list",
    lblDistrict:"Your district",
    lblAc:"Your area",
    browseHint:"Now find your school in the list.",
    chooseDistrict:"Choose your district",
    chooseAc:"Choose your area",
    q2:"Is this where you vote?",
    listen:"Listen",
    multiHelp:"This school has more than one booth. Pick the one that is free — if you are not sure, choose the first. We will confirm it when we call you.",
    boothFree:"This booth is free. You can take it.",
    boothTaken:"{name} already looks after this booth. You can still join as a helper.",
    boothFull:"This booth already has a leader and 4 helpers. Please choose another booth.",
    checking:"Checking…",
    yes:"Yes, this is my booth",
    joinHelper:"Join as a helper here",
    no:"No, search again",
    q3:"What is your name?",
    lblName:"Your name",
    namePh:"Your full name",
    lblPhone:"Your mobile number",
    phoneWhy:"We call this number to confirm. It is never shown on the website.",
    consent:"By pressing Join you agree that BKS may call you on this number about booth work.",
    join:"Join",
    joining:"Joining…",
    back:"Back",
    needName:"Please write your name.",
    needPhone:"Please write your 10-digit mobile number.",
    takenNow:"Someone took this booth a moment ago. Please go back and pick another.",
    phoneUsed:"This mobile number has already joined at another booth.",
    failed:"Could not save. Please check your network and press Join again.",
    doneTitle:"You are the volunteer for your booth",
    codeHelp:"Keep this number. Show it when someone from BKS calls you.",
    sendWa:"Send to my WhatsApp",
    waMsg:"I have joined Bharatiya Krishak Samaj as the booth volunteer for {booth} ({ac}). My number is {code}.",
    micLabel:"Speak instead of typing"
  },
  bn: {
    q1:"আপনি কোথায় ভোট দেন?",
    q1help:"আপনার স্কুল বা গ্রামের নাম লিখুন।",
    q1ph:"স্কুল বা গ্রামের নাম",
    q1hint:"লিখতে শুরু করুন — অন্তত ৩টি অক্ষর।",
    searching:"খোঁজা হচ্ছে…",
    noneFound:"কিছু পাওয়া গেল না। ছোট শব্দ দিয়ে চেষ্টা করুন, বা নীচের তালিকা দেখুন।",
    dontKnow:"নাম জানি না — তালিকা দেখান",
    lblDistrict:"আপনার জেলা",
    lblAc:"আপনার এলাকা",
    browseHint:"এবার তালিকায় আপনার স্কুল খুঁজুন।",
    chooseDistrict:"আপনার জেলা বাছুন",
    chooseAc:"আপনার এলাকা বাছুন",
    q2:"আপনি কি এখানেই ভোট দেন?",
    listen:"শুনুন",
    multiHelp:"এই স্কুলে একাধিক বুথ আছে। যেটি খালি সেটি বাছুন — নিশ্চিত না হলে প্রথমটি বাছুন। ফোন করার সময় আমরা মিলিয়ে নেব।",
    boothFree:"এই বুথ খালি আছে। আপনি নিতে পারেন।",
    boothTaken:"{name} ইতিমধ্যেই এই বুথ দেখছেন। আপনি সহায়ক হিসেবে যোগ দিতে পারেন।",
    boothFull:"এই বুথে একজন দায়িত্বপ্রাপ্ত ও ৪ জন সহায়ক আছেন। অন্য বুথ বাছুন।",
    checking:"দেখা হচ্ছে…",
    yes:"হ্যাঁ, এটাই আমার বুথ",
    joinHelper:"এখানে সহায়ক হিসেবে যোগ দিন",
    no:"না, আবার খুঁজুন",
    q3:"আপনার নাম কী?",
    lblName:"আপনার নাম",
    namePh:"আপনার পুরো নাম",
    lblPhone:"আপনার মোবাইল নম্বর",
    phoneWhy:"নিশ্চিত করতে আমরা এই নম্বরে ফোন করব। ওয়েবসাইটে কখনও দেখানো হয় না।",
    consent:"যোগ দিন চাপলে আপনি সম্মতি দিচ্ছেন যে BKS বুথের কাজে এই নম্বরে ফোন করতে পারে।",
    join:"যোগ দিন",
    joining:"যোগ করা হচ্ছে…",
    back:"পিছনে",
    needName:"আপনার নাম লিখুন।",
    needPhone:"১০ সংখ্যার মোবাইল নম্বর লিখুন।",
    takenNow:"একটু আগে কেউ এই বুথ নিয়ে নিয়েছেন। পিছনে গিয়ে অন্য বুথ বাছুন।",
    phoneUsed:"এই মোবাইল নম্বর অন্য একটি বুথে যোগ দিয়েছে।",
    failed:"সংরক্ষণ করা গেল না। নেটওয়ার্ক দেখে আবার যোগ দিন চাপুন।",
    doneTitle:"আপনি আপনার বুথের স্বেচ্ছাসেবক",
    codeHelp:"এই নম্বরটি রাখুন। BKS থেকে ফোন এলে দেখাবেন।",
    sendWa:"আমার হোয়াটসঅ্যাপে পাঠান",
    waMsg:"আমি ভারতীয় কৃষক সমাজে {booth} ({ac}) বুথের স্বেচ্ছাসেবক হিসেবে যোগ দিয়েছি। আমার নম্বর {code}।",
    micLabel:"লেখার বদলে বলুন"
  }
};

let lang = 'en';
const t = (k, vars) => {
  let s = (T[lang] && T[lang][k]) || T.en[k] || k;
  if(vars) for(const v in vars) s = s.replaceAll(`{${v}}`, vars[v]);
  return s;
};

/* ------------------------------------------------------------------ */
/* Supabase                                                            */
/* ------------------------------------------------------------------ */

const headers = () => ({
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json'
});

async function rpc(name, body){
  const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method:'POST', headers: headers(), body: JSON.stringify(body || {})
  });
  if(!r.ok) throw new Error(await r.text().catch(()=>String(r.status)));
  return r.json();
}
async function sel(rel, query){
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${rel}?${query}`, {headers: headers()});
  if(!r.ok) throw new Error(String(r.status));
  return r.json();
}

/* ------------------------------------------------------------------ */
/* State + helpers                                                     */
/* ------------------------------------------------------------------ */

const state = {
  constituencies: [],
  building: null,   // {booth_name, ac_no, ac_name, district, booths:[booth_no]}
  booth: null,      // chosen booth_no
  role: 'booth_prabhari',
  supportOnly: false
};

const $ = id => document.getElementById(id);
const screens = ['s1','s2','s3','s4'];

function go(id){
  screens.forEach(s => $(s).classList.toggle('show', s === id));
  const i = screens.indexOf(id);
  [...$('dots').children].forEach((d, n) => d.classList.toggle('on', n <= Math.min(i, 2)));
  window.scrollTo({top:0, behavior:'smooth'});
  const h = $(id).querySelector('h1');
  if(h){ h.setAttribute('tabindex','-1'); h.focus({preventScroll:true}); speak(h.textContent); }
}

function setStatus(el, kind, msg){
  el.hidden = false;
  el.className = `status ${kind}`;
  el.textContent = msg;
}

/* Read aloud. For someone who cannot read the school name, hearing it is the
   whole point -- so this fires on every screen change, not only on request. */
let voices = [];
function loadVoices(){ try{ voices = speechSynthesis.getVoices() || []; }catch(e){ voices = []; } }
if('speechSynthesis' in window){
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}
function speak(text){
  if(!('speechSynthesis' in window) || !text) return;
  try{
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    // Booth names in the ECI data are romanised, so an Indian English voice
    // pronounces them far closer to the real name than a Bengali voice would.
    const want = lang === 'bn' ? ['bn-IN','bn'] : ['en-IN','en-GB','en-US'];
    const v = voices.find(x => want.includes(x.lang)) || voices.find(x => want.some(w => x.lang.startsWith(w.split('-')[0])));
    if(v) u.voice = v;
    u.lang = (v && v.lang) || want[0];
    u.rate = 0.92;
    speechSynthesis.speak(u);
  }catch(e){ /* speech is a bonus, never a dependency */ }
}

/* ------------------------------------------------------------------ */
/* Language                                                            */
/* ------------------------------------------------------------------ */

function applyLang(){
  document.documentElement.lang = lang;
  document.body.classList.toggle('bn', lang === 'bn');
  document.querySelectorAll('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
  document.querySelectorAll('[data-tph]').forEach(el => { el.placeholder = t(el.dataset.tph); });
  document.querySelectorAll('[data-ta]').forEach(el => { el.setAttribute('aria-label', t(el.dataset.ta)); });
  if(state.constituencies.length) fillDistricts();
}

document.querySelectorAll('.lang button').forEach(b => {
  b.addEventListener('click', () => {
    lang = b.dataset.lang;
    document.querySelectorAll('.lang button').forEach(x => x.classList.toggle('active', x === b));
    applyLang();
  });
});

/* ------------------------------------------------------------------ */
/* Screen 1 — search by the place he knows                             */
/* ------------------------------------------------------------------ */

/* One building often holds several booths (Garbati High School is booths
   358, 359 and 360). He knows the building, not the booth, so results are
   grouped by building and the booth is settled afterwards. */
function groupByBuilding(rows){
  const map = new Map();
  for(const r of rows){
    const key = `${r.ac_no}|${r.booth_name}`;
    if(!map.has(key)){
      map.set(key, {booth_name:r.booth_name, ac_no:r.ac_no, ac_name:r.ac_name, district:r.district, booths:[]});
    }
    map.get(key).booths.push(r.booth_no);
  }
  return [...map.values()].map(b => (b.booths.sort((x,y)=>x-y), b));
}

function renderResults(listEl, groups){
  listEl.innerHTML = '';
  groups.forEach(g => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pick';
    const b = document.createElement('b');
    b.textContent = g.booth_name;
    const s = document.createElement('small');
    s.textContent = `${g.ac_name} · ${g.district}`;
    btn.append(b, s);
    btn.addEventListener('click', () => choose(g));
    li.append(btn);
    listEl.append(li);
  });
}

let searchTimer = null;
$('q').addEventListener('input', () => {
  clearTimeout(searchTimer);
  const v = $('q').value.trim();
  if(v.length < 3){ $('results').innerHTML = ''; $('searchHint').textContent = t('q1hint'); return; }
  $('searchHint').textContent = t('searching');
  searchTimer = setTimeout(async () => {
    try{
      const rows = await rpc('bks_search_booths', {p_query:v, p_limit:12});
      const groups = groupByBuilding(rows || []);
      renderResults($('results'), groups);
      $('searchHint').textContent = groups.length ? '' : t('noneFound');
    }catch(e){
      $('searchHint').textContent = t('noneFound');
    }
  }, 280);
});

/* ---- browse fallback ---- */
$('browseBtn').addEventListener('click', async () => {
  const b = $('browse');
  b.hidden = !b.hidden;
  if(!b.hidden && !state.constituencies.length){
    try{
      state.constituencies = await sel('bks_wb_constituencies','select=ac_no,ac_name,district&order=ac_no');
      fillDistricts();
    }catch(e){ /* falls back to search only */ }
  }
});

function fillDistricts(){
  const ds = [...new Set(state.constituencies.map(c => c.district))].sort();
  $('bDistrict').innerHTML = `<option value="">${t('chooseDistrict')}</option>` +
    ds.map(d => `<option>${d}</option>`).join('');
}

$('bDistrict').addEventListener('change', () => {
  const d = $('bDistrict').value;
  $('bResults').innerHTML = '';
  $('browseHint').hidden = true;
  if(!d){ $('bAcWrap').hidden = true; return; }
  const acs = state.constituencies.filter(c => c.district === d);
  $('bAc').innerHTML = `<option value="">${t('chooseAc')}</option>` +
    acs.map(c => `<option value="${c.ac_no}">${c.ac_name}</option>`).join('');
  $('bAcWrap').hidden = false;
});

$('bAc').addEventListener('change', async () => {
  const ac = parseInt($('bAc').value, 10);
  $('bResults').innerHTML = '';
  if(!ac) return;
  $('browseHint').hidden = false;
  $('browseHint').textContent = t('searching');
  try{
    const rows = await rpc('bks_booths_in_ac', {p_ac_no: ac});
    const meta = state.constituencies.find(c => Number(c.ac_no) === ac) || {};
    const groups = groupByBuilding((rows||[]).map(r => ({
      ...r, ac_no: ac, ac_name: meta.ac_name, district: meta.district
    })));
    renderResults($('bResults'), groups);
    $('browseHint').textContent = t('browseHint');
  }catch(e){
    $('browseHint').textContent = t('noneFound');
  }
});

/* ------------------------------------------------------------------ */
/* Screen 2 — confirm, and settle which booth                          */
/* ------------------------------------------------------------------ */

async function choose(group){
  state.building = group;
  state.booth = group.booths[0];
  state.role = 'booth_prabhari';
  state.supportOnly = false;

  $('pickName').textContent = group.booth_name;
  $('pickSub').textContent = `${group.ac_name} · ${group.district}`;
  $('multi').hidden = group.booths.length < 2;
  if(group.booths.length > 1) renderMulti(group);

  go('s2');
  await checkBooth();
}

function renderMulti(group){
  const ul = $('multiList');
  ul.innerHTML = '';
  group.booths.forEach((no, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'pick';
    btn.innerHTML = `<b>${i + 1} / ${group.booths.length}</b>`;
    btn.addEventListener('click', async () => {
      state.booth = no;
      [...ul.querySelectorAll('.pick')].forEach(p => p.style.borderColor = '');
      btn.style.borderColor = 'var(--green)';
      await checkBooth();
    });
    li.append(btn);
    ul.append(li);
  });
}

async function checkBooth(){
  const box = $('statusBox');
  setStatus(box, 'busy', t('checking'));
  $('yesBtn').disabled = true;
  try{
    const info = await rpc('bks_booth_availability', {p_ac_no: state.building.ac_no, p_booth_no: state.booth});
    const taken = Boolean(info && info.prabhari_taken);
    const support = (info && info.support_count) || 0;
    const limit = (info && info.support_limit) || 4;

    if(!taken){
      state.role = 'booth_prabhari'; state.supportOnly = false;
      setStatus(box, 'ok', t('boothFree'));
      $('yesBtn').textContent = t('yes');
      $('yesBtn').disabled = false;
    } else if(support >= limit){
      setStatus(box, 'warn', t('boothFull'));
      $('yesBtn').disabled = true;
    } else {
      state.role = 'booth_sahayak'; state.supportOnly = true;
      setStatus(box, 'warn', t('boothTaken', {name: (info && info.held_by) || '—'}));
      $('yesBtn').textContent = t('joinHelper');
      $('yesBtn').disabled = false;
    }
  }catch(e){
    // If the check cannot run, never block him. The claim itself is atomic
    // and will reject a clash; losing a willing volunteer is the worse error.
    state.role = 'booth_prabhari';
    box.hidden = true;
    $('yesBtn').textContent = t('yes');
    $('yesBtn').disabled = false;
  }
}

document.querySelector('[data-speak="pick"]').addEventListener('click', () => {
  speak(`${$('pickName').textContent}. ${$('pickSub').textContent}`);
});

$('yesBtn').addEventListener('click', () => go('s3'));
$('noBtn').addEventListener('click', () => { go('s1'); $('q').focus(); });
$('backBtn').addEventListener('click', () => go('s2'));

/* ------------------------------------------------------------------ */
/* Screen 3 — name and phone, nothing else                             */
/* ------------------------------------------------------------------ */

const digits = s => String(s || '').replace(/\D/g, '').slice(-10);

$('joinBtn').addEventListener('click', async () => {
  const box = $('formStatus');
  const name = $('name').value.trim();
  const phone = digits($('phone').value);

  if(name.length < 2){ setStatus(box, 'warn', t('needName')); $('name').focus(); return; }
  if(!/^[6-9][0-9]{9}$/.test(phone)){ setStatus(box, 'warn', t('needPhone')); $('phone').focus(); return; }

  setStatus(box, 'busy', t('joining'));
  $('joinBtn').disabled = true;

  const payload = {
    district: state.building.district,
    ac_no: state.building.ac_no,
    ac_name: state.building.ac_name,
    booth_no: state.booth,
    booth_name: state.building.booth_name,
    role: state.role,
    full_name: name,
    phone,
    preferred_language: lang,
    language_context: lang,
    consent_contact: true,
    consent_data: true,
    source: 'bks-volunteer-easy'
  };

  try{
    const res = await rpc('bks_claim_booth', {payload});
    if(res && res.ok){
      $('doneName').textContent = state.building.booth_name;
      $('doneSub').textContent = `${state.building.ac_name} · ${state.building.district}`;
      $('code').textContent = res.claim_code;
      const msg = t('waMsg', {booth: state.building.booth_name, ac: state.building.ac_name, code: res.claim_code});
      $('waBtn').href = `https://wa.me/?text=${encodeURIComponent(msg)}`;
      go('s4');
      return;
    }
    const reason = res && res.reason;
    setStatus(box, 'warn',
      reason === 'booth_taken' ? t('takenNow') :
      reason === 'phone_already_enrolled' ? t('phoneUsed') :
      t('failed'));
  }catch(e){
    setStatus(box, 'warn', t('failed'));
  }finally{
    $('joinBtn').disabled = false;
  }
});

/* ------------------------------------------------------------------ */
/* Voice input                                                         */
/* ------------------------------------------------------------------ */

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;

function wireMic(btn, target, onDone){
  if(!SR){ btn.hidden = true; return; }
  btn.addEventListener('click', () => {
    const rec = new SR();
    rec.lang = lang === 'bn' ? 'bn-IN' : 'en-IN';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    btn.classList.add('on');
    rec.onresult = e => {
      const said = e.results[0][0].transcript;
      target.value = said;
      target.dispatchEvent(new Event('input', {bubbles:true}));
      if(onDone) onDone(said);
    };
    rec.onerror = () => btn.classList.remove('on');
    rec.onend = () => btn.classList.remove('on');
    try{ rec.start(); }catch(e){ btn.classList.remove('on'); }
  });
}

wireMic($('mic'), $('q'));
wireMic($('micName'), $('name'));

/* ------------------------------------------------------------------ */

applyLang();
$('q').focus({preventScroll:true});
