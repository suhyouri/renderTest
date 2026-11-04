const { scriptUrl, refreshInterval } = window.APP_CONFIG;
const sides = ['left', 'right'];
const busy = new Set();
function status(side, message) {
  document.getElementById(`status-${side}`).textContent = message;
}
async function request(params, post = false) {
  if (!scriptUrl && !post) {
    const sheet = params.side === 'left' ? 'WMLAlive' : 'WMLNAlive';
    const url = 'https://docs.google.com/spreadsheets/d/1JUW88_DGfv9QLWs2pH_IybOZrIbq_mUFBV7cN9I6okg/gviz/tq?tqx=out:json&headers=1&sheet=' + sheet;
    const response = await fetch(url);
    if (!response.ok) throw new Error('답변을 불러오지 못했습니다.');
    const text = await response.text();
    const result = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1));
    if (result.status === 'error') throw new Error('시트 데이터를 확인해주세요.');
    const headers = result.table.cols.map(col => col.label.trim().toLowerCase());
    const name = headers.indexOf('nickname'), content = headers.indexOf('content');
    if (name < 0 || content < 0) throw new Error('시트 열 이름을 확인해주세요.');
    return {success:true, data:result.table.rows.map(row => ({nickname:String(row.c[name]?.v ?? ''), answer:String(row.c[content]?.v ?? '')})).filter(row => row.answer.trim())};
  }
  if (!scriptUrl) throw new Error('답변 저장 연결을 준비 중입니다. 잠시 후 다시 시도해주세요.');
  const body = new URLSearchParams(params);
  const response = await fetch(post ? scriptUrl : `${scriptUrl}?${body}`, post ? {method:'POST', body, redirect:'follow'} : {});
  if (!response.ok) throw new Error('서버 연결에 실패했습니다. 다시 시도해주세요.');
  const result = await response.json();
  if (!result.success) throw new Error(result.error || '요청에 실패했습니다.');
  return result;
}
async function load(side) {
  const result = await request({action:'getAnswers', side});
  const box = document.getElementById(`answerbox_${side}`);
  const fragment = document.createDocumentFragment();
  for (const value of result.data) {
    const section = document.createElement('section'); section.className = 'post';
    const answer = document.createElement('div'); answer.className = 'answer';
    const text = document.createElement('p'); text.textContent = value.answer; answer.append(text);
    const footer = document.createElement('footer'); footer.className = 'footer';
    const author = document.createElement('span'); author.className = 'post__author'; author.textContent = value.nickname;
    footer.append(author); section.append(answer, footer); fragment.append(section);
  }
  box.replaceChildren(fragment);
}
for (const [i, side] of sides.entries()) {
  const form = document.getElementById(`answer-form-${side}`);
  const nickname = document.getElementById(`nickname_${i + 1}`);
  const answer = document.getElementById(`content_${i + 1}`);
  let pending;
  form.addEventListener('submit', async event => {
    event.preventDefault(); if (busy.has(side)) return;
    if (!nickname.value.trim() || !answer.value.trim()) { status(side, '닉네임과 답변을 입력해주세요.'); return; }
    const values = {nickname:nickname.value.trim(), answer:answer.value.trim()};
    if (!pending || pending.nickname !== values.nickname || pending.answer !== values.answer) pending = {...values, requestId:crypto.randomUUID()};
    busy.add(side); form.querySelector('button').disabled = true; status(side, '저장 중…');
    try {
      await request({action:'addAnswer', side, ...pending, hp_email:form.elements.hp_email.value}, true);
      pending = null; form.reset(); status(side, '저장했습니다.');
      try { await load(side); } catch { status(side, '저장했습니다. 목록은 잠시 후 갱신됩니다.'); }
    } catch (error) { status(side, error.message); }
    finally {busy.delete(side); form.querySelector('button').disabled = false;}
  });
  load(side).catch(error => status(side, error.message));
}
setInterval(() => {
  if (!document.hidden) for (const side of sides) if (!busy.has(side)) load(side).catch(() => {});
}, refreshInterval);
