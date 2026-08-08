/* Arjun — voice-first booth enrolment.
 *
 * Arjun navigates by voice; the farmer taps to enrol. That split is the whole
 * safety design. Booth uniqueness is a partial unique index, so if Arjun
 * mishears a school name and claims the wrong booth, he does not merely record
 * a wrong row — he BLOCKS the real volunteer for that booth, who is then told
 * his booth is taken and goes home. There is no claim tool. The model can read
 * the booth database and nothing else.
 *
 * Audio plumbing (PCM16 in at 16k, PCM24k out, barge-in) is ported from the
 * proven implementation in arjun-acharya-app's GeminiLiveOverlay.
 */

const SUPABASE_URL = 'https://lhnorkjfldywnrqqunqn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxobm9ya2pmbGR5d25ycXF1bnFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzgxMjcsImV4cCI6MjA4NzQxNDEyN30.y90MFaq7qJ4YxuF-6HsY0WUZ9zSDJYwfl6F5r-JJrxI';

/* ------------------------------------------------------------------ */
/* Words                                                               */
/* ------------------------------------------------------------------ */

const T = {
  bn: {
    introTitle:'অর্জুনের সঙ্গে কথা বলুন',
    introLead:'বাংলার প্রতিটি বুথে একজন করে কৃষক ভাই। অর্জুন আপনাকে দু-এক মিনিটে আপনার বুথ খুঁজে দেবে। শুধু কথা বলুন — লিখতে হবে না।',
    start:'শুরু করুন',
    preferType:'আমি লিখে করতে চাই',
    micNote:'শুরু করলে মাইক্রোফোনের অনুমতি চাইবে। অনুমতি দিন।',
    connecting:'জোড়া লাগছে…',
    ready:'অর্জুন শুনছে। বোতাম টিপে বলুন।',
    tapToTalk:'বলতে চাপুন',
    tapToStop:'শেষ হলে চাপুন',
    listening:'শুনছি…',
    arjunSpeaking:'অর্জুন বলছে…',
    thinking:'একটু দেখি…',
    endCall:'কথা শেষ',
    lblArea:'এলাকা', lblBuilding:'যেখানে ভোট দেন', lblBooth:'বুথ',
    confirmTitle:'এটাই কি আপনার বুথ?',
    lblName:'আপনার নাম', namePh:'আপনার পুরো নাম',
    lblPhone:'আপনার মোবাইল নম্বর', phonePh:'১০ সংখ্যার নম্বর',
    consent:'যোগ দিন চাপলে আপনি সম্মতি দিচ্ছেন যে ভারতীয় কৃষক সমাজ বুথের কাজে এই নম্বরে ফোন করতে পারে। নম্বরটা ওয়েবসাইটে কখনও দেখানো হবে না।',
    join:'যোগ দিন', joining:'যোগ করা হচ্ছে…',
    talkMore:'অর্জুনের সঙ্গে আবার কথা বলি',
    rolePrabhari:'বুথ প্রভারী', roleSahayak:'বুথ সহায়ক',
    multiBooths:'এই ভবনে {n}টি বুথ আছে। আপনাকে {b} নম্বরে রাখা হচ্ছে, কারণ ওটা খালি। ফোন করার সময় আমাদের লোক আপনার স্লিপ দেখে মিলিয়ে নেবেন।',
    heldBy:'এই বুথে {name} ইতিমধ্যেই আছেন, তাই আপনি সহায়ক হিসেবে যোগ দিচ্ছেন।',
    needName:'আপনার নাম লিখুন।',
    needPhone:'১০ সংখ্যার মোবাইল নম্বর লিখুন।',
    takenNow:'একটু আগে কেউ এই বুথ নিয়ে নিয়েছেন। অর্জুনের সঙ্গে আবার কথা বলুন।',
    phoneUsed:'এই মোবাইল নম্বর ইতিমধ্যেই একটি বুথে যোগ দিয়েছে।',
    rateLimited:'এখন অনেক জন একসঙ্গে যোগ দিচ্ছেন। একটু পরে আবার চেষ্টা করুন।',
    failed:'সংরক্ষণ করা গেল না। নেটওয়ার্ক দেখে আবার চাপুন।',
    doneTitle:'আপনি আপনার বুথের স্বেচ্ছাসেবক',
    codeHelp:'এই নম্বরটি রাখুন। কেউ ফোন করলে বলবেন।',
    sendWa:'হোয়াটসঅ্যাপে পাঠান',
    waMsg:'আমি ভারতীয় কৃষক সমাজে {booth} ({ac}) বুথের স্বেচ্ছাসেবক হিসেবে যোগ দিয়েছি। আমার নম্বর {code}।',
    micDenied:'মাইক্রোফোনের অনুমতি পাওয়া যায়নি। লিখে করতে পারেন।',
    connectFailed:'অর্জুনের সঙ্গে জোড়া লাগানো গেল না। লিখে করতে পারেন।'
  },
  en: {
    introTitle:'Talk to Arjun',
    introLead:'One farmer for every booth in Bengal. Arjun will find your booth in a minute or two. Just talk — no typing.',
    start:'Start',
    preferType:'I would rather type',
    micNote:'You will be asked for microphone permission. Please allow it.',
    connecting:'Connecting…',
    ready:'Arjun is listening. Press the button and speak.',
    tapToTalk:'Press to talk',
    tapToStop:'Press when finished',
    listening:'Listening…',
    arjunSpeaking:'Arjun is speaking…',
    thinking:'One moment…',
    endCall:'End',
    lblArea:'Area', lblBuilding:'Where you vote', lblBooth:'Booth',
    confirmTitle:'Is this your booth?',
    lblName:'Your name', namePh:'Your full name',
    lblPhone:'Your mobile number', phonePh:'10 digits',
    consent:'By pressing Join you agree that BKS may call you on this number about booth work. It is never shown on the website.',
    join:'Join', joining:'Joining…',
    talkMore:'Talk to Arjun again',
    rolePrabhari:'Booth Prabhari', roleSahayak:'Booth Sahayak',
    multiBooths:'This building has {n} booths. You are being given booth {b} because it is free. The district team will match it against your slip when they call.',
    heldBy:'{name} already looks after this booth, so you are joining as a helper.',
    needName:'Please write your name.',
    needPhone:'Please write your 10-digit mobile number.',
    takenNow:'Someone took this booth a moment ago. Talk to Arjun again.',
    phoneUsed:'This mobile number has already joined a booth.',
    rateLimited:'A lot of people are joining at once. Please try again shortly.',
    failed:'Could not save. Check your network and press again.',
    doneTitle:'You are the volunteer for your booth',
    codeHelp:'Keep this number. Say it when someone calls you.',
    sendWa:'Send on WhatsApp',
    waMsg:'I have joined Bharatiya Krishak Samaj as the booth volunteer for {booth} ({ac}). My number is {code}.',
    micDenied:'Microphone permission was refused. You can type instead.',
    connectFailed:'Could not connect to Arjun. You can type instead.'
  }
};

let lang = 'bn';
const t = (k, v) => {
  let s = (T[lang] && T[lang][k]) || T.bn[k] || k;
  if(v) for(const key in v) s = s.split(`{${key}}`).join(v[key]);
  return s;
};

const $ = id => document.getElementById(id);
const screens = ['sIntro','sLive','sCard','sDone'];
function go(id){
  screens.forEach(s => $(s).classList.toggle('show', s === id));
  window.scrollTo({top:0,behavior:'smooth'});
}

function applyLang(){
  document.documentElement.lang = lang;
  document.body.classList.toggle('en', lang === 'en');
  document.querySelectorAll('[data-t]').forEach(el => { el.textContent = t(el.dataset.t); });
  document.querySelectorAll('[data-tph]').forEach(el => { el.placeholder = t(el.dataset.tph); });
}
document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => {
  lang = b.dataset.lang;
  document.querySelectorAll('.lang button').forEach(x => x.classList.toggle('active', x === b));
  applyLang();
}));

/* ------------------------------------------------------------------ */
/* Audio helpers — ported from the proven GeminiLiveOverlay            */
/* ------------------------------------------------------------------ */

function b64ToBytes(b64){
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for(let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function bytesToB64(bytes){
  let bin = '';
  const chunk = 0x8000;
  for(let i = 0; i < bytes.length; i += chunk){
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}
function downsampleToPcm16(input, inputRate, outputRate){
  outputRate = outputRate || 16000;
  const ratio = inputRate / outputRate;
  const length = Math.floor(input.length / ratio);
  const out = new Int16Array(length);
  for(let i = 0; i < length; i++){
    const s = Math.max(-1, Math.min(1, input[Math.floor(i * ratio)] || 0));
    out[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return new Uint8Array(out.buffer);
}
function pcm24kToBuffer(ctx, b64){
  const bytes = b64ToBytes(b64);
  const pcm = new Int16Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 2));
  const buf = ctx.createBuffer(1, pcm.length, 24000);
  const ch = buf.getChannelData(0);
  for(let i = 0; i < pcm.length; i++) ch[i] = pcm[i] / 0x8000;
  return buf;
}

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

const S = {
  ws:null, ctx:null, stream:null, source:null, processor:null,
  recording:false, connected:false,
  playHead:0, playing:[],
  card:null,          // validated selection from show_booth_card
  ac:null, building:null
};

/* ------------------------------------------------------------------ */
/* Connect                                                             */
/* ------------------------------------------------------------------ */

function setStatus(text){ $('status').textContent = text; }
function micMode(mode){
  const b = $('micBtn');
  b.classList.remove('listening','speaking');
  if(mode === 'listening'){ b.classList.add('listening'); $('micLabel').textContent = t('tapToStop'); }
  else if(mode === 'speaking'){ b.classList.add('speaking'); $('micLabel').textContent = t('arjunSpeaking'); }
  else { $('micLabel').textContent = t('tapToTalk'); }
}

async function start(){
  go('sLive');
  setStatus(t('connecting'));
  $('micBtn').disabled = true;

  // The AudioContext must be created inside the tap, or iOS keeps it suspended.
  try{
    S.ctx = S.ctx || new (window.AudioContext || window.webkitAudioContext)();
    await S.ctx.resume();
  }catch(e){ /* resume later */ }

  let token;
  try{
    const r = await fetch('/api/arjun-token', {
      method:'POST', headers:{'content-type':'application/json'},
      body: JSON.stringify({ lang })
    });
    token = await r.json();
    if(!r.ok || !token.websocketUrl) throw new Error(token.detail || token.error || 'token');
  }catch(err){
    console.error('[arjun] token', err);
    setStatus(t('connectFailed'));
    $('micBtn').disabled = true;
    return;
  }

  const ws = new WebSocket(token.websocketUrl);
  S.ws = ws;

  ws.onopen = () => {
    // The token already carries the setup, including the tool declarations.
    // The socket still wants a first setup frame; an empty one lets the
    // token-bound setup win, which is what keeps the tool surface server-side.
    ws.send(JSON.stringify({ setup: {} }));
    setTimeout(() => {
      if(ws.readyState === WebSocket.OPEN && !S.connected) ready();
    }, 6000);
  };
  ws.onmessage = ev => { handleMessage(ev.data).catch(e => console.warn('[arjun] msg', e)); };
  ws.onerror = e => { console.error('[arjun] ws error', e); setStatus(t('connectFailed')); };
  ws.onclose = () => {
    if(!S.connected) setStatus(t('connectFailed'));
    S.recording = false;
    micMode('idle');
  };
}

function ready(){
  S.connected = true;
  setStatus(t('ready'));
  $('micBtn').disabled = false;
  micMode('idle');
}

/* ------------------------------------------------------------------ */
/* Messages                                                            */
/* ------------------------------------------------------------------ */

async function handleMessage(raw){
  let text = raw;
  if(raw instanceof Blob) text = await raw.text();
  if(!text) return;

  let msg;
  try{ msg = JSON.parse(text); }catch(e){ return; }

  if('setupComplete' in msg){ ready(); return; }

  if(msg.toolCall){ await runToolCalls(msg.toolCall.functionCalls || []); return; }
  if(msg.toolCallCancellation){ return; }  // nothing in flight is worth resuming

  const sc = msg.serverContent;
  if(!sc) return;

  if(sc.interrupted){ stopPlayback(); }

  const heard = sc.inputTranscription && sc.inputTranscription.text;
  if(heard) $('userSaid').textContent = ($('userSaid').textContent + ' ' + heard).trim();

  const said = sc.outputTranscription && sc.outputTranscription.text;
  if(said) $('arjunSaid').textContent = ($('arjunSaid').textContent + ' ' + said).trim();

  const parts = (sc.modelTurn && sc.modelTurn.parts) || [];
  for(const p of parts){
    const data = p.inlineData && p.inlineData.data;
    if(data) enqueueAudio(data);
  }

  if(sc.turnComplete){
    if(!S.recording) micMode('idle');
    // Clear the farmer's line so the next turn reads cleanly; Arjun's stays
    // on screen as the last thing he said.
    setTimeout(() => { $('userSaid').textContent = ''; }, 1200);
  }
}

/* Tool calls arrive on this socket, but the browser only relays them: the
   lookup itself runs server-side against an allow-list. */
async function runToolCalls(calls){
  micMode('speaking');
  setStatus(t('thinking'));
  const responses = [];

  for(const call of calls){
    let result;
    try{
      const r = await fetch('/api/arjun-tool', {
        method:'POST', headers:{'content-type':'application/json'},
        body: JSON.stringify({ name: call.name, args: call.args || {} })
      });
      const j = await r.json();
      result = j.result || { error:'lookup_failed' };
    }catch(err){
      console.warn('[arjun] tool', call.name, err);
      result = { error:'lookup_failed', say:'Tell him the line is weak and ask him to repeat the name.' };
    }

    applyToolResult(call.name, result);
    responses.push({ id: call.id, name: call.name, response: result });
  }

  if(S.ws && S.ws.readyState === WebSocket.OPEN){
    S.ws.send(JSON.stringify({ toolResponse: { functionResponses: responses } }));
  }
  setStatus(S.recording ? t('listening') : t('ready'));
}

/* The screen is the receipt. It fills in as facts are settled, so a farmer can
   hand the phone to his son to check. */
function applyToolResult(name, result){
  if(!result || result.error) return;

  if(name === 'find_building' && result.buildings && result.buildings.length){
    const b = result.buildings[0];
    S.ac = { ac_no:b.ac_no, ac_name:b.ac_name, district:b.district };
    showRow('rowAc','vAc', `${b.ac_name} · ${b.district}`);
  }
  if(name === 'get_building_booths'){
    S.building = { ac_no:result.ac_no, booth_name:result.booth_name, booths:result.booths };
    showRow('rowBuilding','vBuilding', result.booth_name);
    if(result.assigned_booth_no) showRow('rowBooth','vBooth', String(result.assigned_booth_no));
  }
  if(name === 'show_booth_card' && result.card){
    S.card = result.card;
    renderCard(result.card);
  }
}

function showRow(rowId, valId, text){
  $('stateCard').hidden = false;
  $(rowId).hidden = false;
  $(valId).textContent = text;
}

/* ------------------------------------------------------------------ */
/* Playback                                                            */
/* ------------------------------------------------------------------ */

function enqueueAudio(b64){
  if(!S.ctx) return;
  const buf = pcm24kToBuffer(S.ctx, b64);
  const src = S.ctx.createBufferSource();
  src.buffer = buf;
  src.connect(S.ctx.destination);
  const now = S.ctx.currentTime;
  if(S.playHead < now) S.playHead = now;
  src.start(S.playHead);
  S.playHead += buf.duration;
  S.playing.push(src);
  if(!S.recording) micMode('speaking');
  src.onended = () => {
    S.playing = S.playing.filter(x => x !== src);
    if(!S.playing.length && !S.recording) micMode('idle');
  };
}

function stopPlayback(){
  S.playing.forEach(s => { try{ s.stop(); }catch(e){} });
  S.playing = [];
  S.playHead = 0;
}

/* ------------------------------------------------------------------ */
/* Recording — latched, not hold-to-talk                               */
/* ------------------------------------------------------------------ */
/* Push-to-hold is wrong for a farmer holding a phone one-handed: he releases
   mid-sentence, or holds it and says nothing. Tap on, tap off. */

$('micBtn').addEventListener('click', async () => {
  if(!S.connected) return;
  if(S.recording){ stopRecording(); return; }
  await startRecording();
});

async function startRecording(){
  stopPlayback();
  $('userSaid').textContent = '';
  try{
    S.stream = await navigator.mediaDevices.getUserMedia({ audio:true });
  }catch(err){
    setStatus(t('micDenied'));
    return;
  }
  S.recording = true;
  micMode('listening');
  setStatus(t('listening'));

  await S.ctx.resume();
  const source = S.ctx.createMediaStreamSource(S.stream);
  const processor = S.ctx.createScriptProcessor(4096, 1, 1);
  S.source = source; S.processor = processor;

  processor.onaudioprocess = ev => {
    if(!S.recording || !S.ws || S.ws.readyState !== WebSocket.OPEN) return;
    const pcm = downsampleToPcm16(ev.inputBuffer.getChannelData(0), S.ctx.sampleRate);
    S.ws.send(JSON.stringify({
      realtimeInput: { audio: { data: bytesToB64(pcm), mimeType:'audio/pcm;rate=16000' } }
    }));
  };
  source.connect(processor);
  processor.connect(S.ctx.destination);
}

function stopRecording(){
  if(!S.recording) return;
  S.recording = false;
  try{
    if(S.ws && S.ws.readyState === WebSocket.OPEN){
      S.ws.send(JSON.stringify({ realtimeInput: { audioStreamEnd: true } }));
    }
  }catch(e){}
  if(S.processor) S.processor.disconnect();
  if(S.source) S.source.disconnect();
  S.processor = null; S.source = null;
  if(S.stream){ S.stream.getTracks().forEach(tr => tr.stop()); S.stream = null; }
  micMode('idle');
  setStatus(t('thinking'));
}

function hangUp(){
  stopRecording();
  stopPlayback();
  S.connected = false;
  try{ if(S.ws) S.ws.close(); }catch(e){}
  S.ws = null;
}

/* ------------------------------------------------------------------ */
/* The card — Arjun cannot press this                                  */
/* ------------------------------------------------------------------ */

function renderCard(card){
  $('cardBuilding').textContent = card.booth_name;
  $('cardSub').textContent = [card.ac_name, card.district].filter(Boolean).join(' · ') +
    (card.booth_no ? ` · ${lang === 'bn' ? 'বুথ' : 'Booth'} ${card.booth_no}` : '');
  $('cardRole').textContent = card.role === 'booth_sahayak' ? t('roleSahayak') : t('rolePrabhari');

  const n = S.building && S.building.booths && S.building.booths.length;
  if(n > 1){
    $('cardMulti').hidden = false;
    $('cardMulti').textContent = t('multiBooths', { n, b: card.booth_no });
  } else if(card.role === 'booth_sahayak' && card.held_by){
    $('cardMulti').hidden = false;
    $('cardMulti').textContent = t('heldBy', { name: card.held_by });
  } else {
    $('cardMulti').hidden = true;
  }

  if(card.full_name && !$('cName').value) $('cName').value = card.full_name;
  go('sCard');
}

const digits = s => String(s || '').replace(/\D/g,'').slice(-10);

$('joinBtn').addEventListener('click', async () => {
  const box = $('cardStatus');
  const name = $('cName').value.trim();
  const phone = digits($('cPhone').value);
  if(name.length < 2){ setState(box,'warn',t('needName')); $('cName').focus(); return; }
  if(!/^[6-9][0-9]{9}$/.test(phone)){ setState(box,'warn',t('needPhone')); $('cPhone').focus(); return; }

  setState(box,'busy',t('joining'));
  $('joinBtn').disabled = true;

  const c = S.card;
  const payload = {
    district: c.district, ac_no: c.ac_no, ac_name: c.ac_name,
    booth_no: c.booth_no, booth_name: c.booth_name,
    role: c.role, full_name: name, phone,
    preferred_language: lang, language_context: lang,
    consent_contact: true, consent_data: true,
    source: 'bks-arjun-voice'
  };

  try{
    const r = await fetch(`${SUPABASE_URL}/rest/v1/rpc/bks_claim_booth`, {
      method:'POST',
      headers:{ apikey:SUPABASE_ANON_KEY, Authorization:`Bearer ${SUPABASE_ANON_KEY}`, 'content-type':'application/json' },
      body: JSON.stringify({ payload })
    });
    const res = await r.json();
    if(res && res.ok){
      hangUp();
      $('doneBuilding').textContent = c.booth_name;
      $('doneSub').textContent = [c.ac_name, c.district].filter(Boolean).join(' · ');
      $('doneCode').textContent = res.claim_code;
      $('waBtn').href = 'https://wa.me/?text=' + encodeURIComponent(
        t('waMsg', { booth:c.booth_name, ac:c.ac_name || '', code:res.claim_code })
      );
      go('sDone');
      return;
    }
    const reason = res && res.reason;
    setState(box,'warn',
      reason === 'booth_taken' ? t('takenNow') :
      reason === 'phone_already_enrolled' ? t('phoneUsed') :
      reason === 'rate_limited' ? t('rateLimited') :
      t('failed'));
  }catch(err){
    setState(box,'warn',t('failed'));
  }finally{
    $('joinBtn').disabled = false;
  }
});

function setState(el, kind, msg){
  el.hidden = false;
  el.className = `status ${kind}`;
  el.textContent = msg;
}

$('startBtn').addEventListener('click', start);
$('endBtn').addEventListener('click', () => { hangUp(); go('sIntro'); });
$('backToTalk').addEventListener('click', () => { go('sLive'); });

applyLang();
