/* LUMIÈRE HOTEL · playable desktop prologue */
(()=>{'use strict';
const FLAG='lumiere_prologue_complete_v1';
let played=false;
try{played=localStorage.getItem(FLAG)==='yes'}catch(e){}
const replay=new URLSearchParams(location.search).get('intro')==='1';
const speech=['또 떨어졌구나.','이런 메일도 이젠 지겹다. 매번 똑같은 말만 하네.','당분간 자기소개서는 쳐다보기도 싫어.','…며칠쯤 어디 좀 다녀올까. 아무도 아는 사람 없는 곳으로.'];
let screen='inbox',line=0,overlay=null,pending='';
const encountered=new Set();
const host=document.createElement('div');
host.id='lm-prologue';host.setAttribute('aria-label','뤼미에르 호텔 프롤로그');
function frame(content,name,safari){
return '<div class="lm-window"><div class="lm-titlebar"><div class="lm-traffic"><i></i><i></i><i></i></div>'+(safari?'<div class="lm-url">⌁ &nbsp; '+name+'</div>':'<div class="lm-window-name">'+name+'</div>')+'</div>'+content+'</div>';
}
function desktop(windowHTML,hint,bubble){
return '<div class="lm-wall"></div><div class="lm-menu"><div class="lm-menu-left"><strong>●</strong><b>'+((screen==='inbox'||screen==='mail')?'Mail':'Safari')+'</b><span>파일</span><span>편집</span><span>보기</span></div><div class="lm-menu-right"><span>◉</span><span>▰</span><span>11월 2일 월 14:32</span></div></div><div class="lm-stage">'+windowHTML+'</div><div class="lm-dock" aria-label="앱 독"><span class="lm-app safari" title="Safari">◉</span><span class="lm-app mail" title="Mail">✉</span><span class="lm-app notes" title="메모">▤</span></div>'+(hint?'<div class="lm-hint"><strong>현재 목표</strong>'+hint+'</div>':'')+(bubble||'');
}
function mail(opened){
const content='<div class="lm-mail-body"><aside class="lm-sidebar"><div class="lm-sidebar-title">즐겨찾기</div><div class="lm-sidebar-row">✉ &nbsp; 받은편지함 &nbsp; 1</div></aside><div class="lm-mail-main"><div class="lm-toolbar">‹ &nbsp; › &nbsp; │ &nbsp; ▤ &nbsp; ↪ &nbsp; ⚑</div>'+(!opened?'<button class="lm-mail-row" data-lm="openmail"><span class="lm-avatar">H</span><span><strong>채용담당자</strong><b>[채용 결과 안내] 지원해 주셔서 감사합니다.</b><small>채용 전형 결과를 안내드립니다.</small></span></button>':'<article class="lm-mail-open"><h2>[채용 결과 안내] 지원해 주셔서 감사합니다.</h2><div class="lm-mail-meta">보낸 사람: 채용담당자 &nbsp; · &nbsp; 오늘 14:32</div><div class="lm-mail-text">안녕하세요, 지원자님.<br><br>먼저 당사 채용에 관심을 가지고 지원해 주신 점 진심으로 감사드립니다.<br><br>신중한 검토 끝에 아쉽게도 이번 채용 전형에서는 함께하지 못하게 되었음을 안내드립니다.<br><br>앞으로 지원자님의 앞날에 좋은 일들이 가득하시길 기원합니다.<br><br>감사합니다.<br>채용담당자 드림</div></article>')+'</div></div>';
return frame(content,'받은편지함 — Mail',false);
}
function dialog(){
return '<div class="lm-dialog" role="status" aria-live="polite"><div class="lm-speaker">나의 생각</div><p>'+speech[line]+'</p><button data-lm="next">'+(line===speech.length-1?'Safari 열기 →':'계속 ↗')+'</button></div>';
}
function safari(content,bar){return frame('<div class="lm-safari-body">'+content+'</div>',bar,true);}
function draw(){
if(!overlay)return;
let page='',hint='',bubble='';
if(screen==='inbox'){page=mail(false);hint='새로 도착한 메일을 확인해 보자.';}
if(screen==='mail'){page=mail(true);bubble=dialog();}
if(screen==='search'){page=safari('<div class="lm-search-home"><div class="lm-mark">어디로 떠나볼까?</div><form class="lm-search-form" id="lm-search"><span>⌕</span><input name="q" id="lm-query" autocomplete="off" placeholder="여행지를 검색하세요" aria-label="여행지 검색어"/><button type="submit" aria-label="검색">↗</button></form><button type="button" class="lm-suggestion" data-lm="fill">혼자 여행하기 좋은 조용한 여행지 ↗</button></div>','시작 페이지');hint='혼자 떠나기 좋은 곳을 검색해 보자.';}
if(screen==='results'){page=safari('<div class="lm-results"><small>검색 결과 · 혼자 여행하기 좋은 조용한 여행지</small><div class="lm-result"><div class="lm-urltxt">TRAVEL NOTES · 국내여행</div><button data-lm="article">빵집 하나로 다시 알려진 작은 도시, 혼자 걷기 좋은 골목</button><p>사람들이 떠나던 조용한 도시가 최근 여행자들 사이에서 조금씩 입소문을 타고 있다. 걷기 좋은 거리와 작은 가게들, 오래된 극장까지.</p></div><div class="lm-result"><div class="lm-urltxt">주말 여행 · 큐레이션</div><button data-lm="article">붐비지 않는 곳에서 이틀, 도시 밖으로 떠나는 짧은 여행</button><p>유명 관광지 대신 낯선 골목을 천천히 걷는 여행. 요즘 주목받는 작은 동네를 소개한다.</p></div><div class="lm-result"><div class="lm-urltxt">여행 후기</div><button data-lm="article">최근 조용히 뜨는 국내 소도시 여행 기록</button><p>오래된 상점과 새로 생긴 호텔, 일상의 속도를 잠시 늦출 수 있는 장소들.</p></div></div>','검색 결과');hint='눈에 들어오는 여행기를 읽어보자.';}
if(screen==='article'){page=safari('<article class="lm-article"><div class="lm-kicker">TRAVEL NOTES / 국내의 작은 도시</div><h2>한때 사람들이 떠나던 도시,<br>이제는 빵집 앞에 줄이 생겼다</h2><p>몇 년 전만 해도 빈 상가가 많았던 이 도시는 최근 유명해진 빵집을 중심으로 조금씩 달라지고 있다. 주말이면 새로운 가게를 찾아온 사람들이 거리를 걷는다.</p><p>그렇다고 유명 관광지처럼 소란스러운 것은 아니다. 골목 하나만 벗어나도 여전히 조용한 건물과 오래된 가로수가 남아 있다. 혼자 느리게 걷고 싶을 때 찾아가기 좋다.</p><p>숙박 시설 중에는 새로 문을 연 부티크 호텔이 특히 좋은 평을 받는다. 객실마다 전망이 다르고, 소규모 웰니스 프로그램을 운영한다고 한다.</p><button class="lm-hotel-link" data-lm="hotel"><span><small>추천 숙소 · 공식 웹사이트</small><br><b>LUMIÈRE HOTEL</b></span><span>방문하기 ↗</span></button></article>','travel-notes.example / 작은 도시 여행기');hint='호텔 홈페이지를 한번 둘러볼까.';}
overlay.innerHTML=desktop(page,hint,bubble);
if(screen==='search'){setTimeout(()=>overlay&&overlay.querySelector('#lm-query')?.focus(),40);}
}
function begin(){
if(!overlay){overlay=host;document.body.appendChild(overlay)}
document.body.style.overflow='hidden';screen='inbox';line=0;draw();overlay.scrollTop=0;
}
function finish(){
try{localStorage.setItem(FLAG,'yes')}catch(e){}
document.body.style.overflow='';overlay?.remove();overlay=null;
window.scrollTo({top:0,behavior:'instant'});
setTimeout(()=>thought('호텔은 꽤 괜찮아 보인다.\n일단 예약이나 해볼까. 언제가 좋을까?'),550);
}
host.addEventListener('click',e=>{
const hit=e.target.closest('[data-lm]');if(!hit)return;
const act=hit.dataset.lm;
if(act==='openmail'){screen='mail';line=0;draw()}
if(act==='next'){if(line<speech.length-1){line++;const box=overlay?.querySelector('.lm-dialog');if(box){box.querySelector('p').textContent=speech[line];box.querySelector('[data-lm="next"]').textContent=line===speech.length-1?'Safari 열기 →':'계속 ↗';}else{draw()}}else{screen='search';draw()}}
if(act==='fill'){const i=overlay?.querySelector('#lm-query');if(i){i.value='혼자 여행하기 좋은 조용한 여행지';i.focus()}}
if(act==='article'){screen='article';draw()}
if(act==='hotel')finish();
});
host.addEventListener('submit',e=>{
if(e.target.id!=='lm-search')return;e.preventDefault();
const input=host.querySelector('#lm-query');
if(!input||!input.value.trim()){input?.focus();return}
screen='results';draw();
});
function busy(){return !!(document.querySelector('#modal-scrim.open')||document.querySelector('#chat-window.open'))}
function thought(message){
if(overlay)return;
if(busy()){pending=message;return}
let node=document.getElementById('lm-thought');
if(!node){node=document.createElement('div');node.id='lm-thought';document.body.appendChild(node)}
const speaker=document.createElement('div');speaker.className='lm-speaker';speaker.textContent='나의 생각';
const p=document.createElement('p');p.textContent=message;
const button=document.createElement('button');button.type='button';button.textContent='계속 둘러보기 ↗';button.addEventListener('click',()=>node.remove());
node.replaceChildren(speaker,p,button);
}
function once(key,msg){
if(overlay||encountered.has(key))return;
encountered.add(key);setTimeout(()=>thought(msg),120);
}
function afterModal(){
setTimeout(()=>{if(pending&&!busy()){let m=pending;pending='';thought(m)}},160);
}
document.addEventListener('click',e=>{
if(overlay)return;
const t=e.target;
if(t.closest('#notice-list [data-notice]'))once('notice','이런 프로그램도 운영하네. 좀 더 살펴볼까.');
if(t.closest('#all-reviews-btn'))once('reviews','후기가 꽤 많다. 사람들마다 쉬는 방식도 참 다르네.');
if(t.closest('[data-select-room]'))once('rooms','혼자 쓰기엔 조금 사치일까. 그래도 이번엔 편하게 쉬고 싶은데.');
if(t.closest('#retreat-details'))once('retreat','웰니스 프로그램이라… 쉬러 가는 김에 참여해 볼까?');
if(t.closest('#modal-close')||t.id==='modal-scrim')afterModal();
});
document.addEventListener('keydown',e=>{if(e.key==='Escape')afterModal()});
document.getElementById('checkin')?.addEventListener('change',()=>once('date','이 날짜쯤이면 조금 숨을 돌릴 수 있겠지.'));
const foot=document.querySelector('footer');
if(foot){
const reset=document.createElement('button');reset.id='lm-reset';reset.type='button';reset.textContent='↺ 프롤로그 다시 보기';reset.addEventListener('click',()=>{document.getElementById('lm-thought')?.remove();window.scrollTo(0,0);begin()});foot.appendChild(reset);
}
if(!played||replay)begin();

/* New: game-only desktop switching / seasonal promotion */
const PROMO_MAIL='b.runner@icloud.com';
let promoValid=false,deskOpen=false,invitationRead=false,searchValue='';
try{promoValid=sessionStorage.getItem('lm_promo_valid_v2')==='1'}catch(e){}
const deskStyle=document.createElement('style');
deskStyle.textContent="#lm-mini-dock{position:fixed;bottom:16px;right:16px;z-index:1300;display:flex;gap:6px;background:#252733ed;border-radius:13px;border:1px solid #ffffff6e;padding:9px;box-shadow:0 8px 30px #0003}#lm-mini-dock button{border:0;border-radius:7px;padding:9px 12px;color:#fff;background:#ffffff18;cursor:pointer;font-size:12px}#lm-promo-desktop{position:fixed;inset:0;z-index:15000;background:linear-gradient(120deg,#aab3ca,#626a83,#34384d);display:flex;align-items:center;justify-content:center;padding:20px;font-family:Arial,'Noto Sans KR',sans-serif}#lm-promo-desktop .win{background:#fff;width:min(780px,100%);max-height:90vh;overflow:auto;border-radius:13px;box-shadow:0 15px 70px #0005;color:#222}#lm-promo-desktop header{padding:14px 20px;background:#f2f2f3;border-bottom:1px solid #ddd;display:flex;justify-content:space-between;font-size:12px}#lm-promo-desktop header button{border:0;background:transparent;cursor:pointer;font-size:18px}#lm-promo-desktop section{padding:28px;min-height:320px}#lm-promo-desktop input{width:100%;padding:13px;border:1px solid #ddd;border-radius:7px;font-size:14px;box-sizing:border-box}#lm-promo-desktop button.go{background:#5f1023;border:0;border-radius:4px;padding:11px 19px;color:white;margin-top:10px;cursor:pointer}#lm-promo-desktop .result{border-bottom:1px solid #eee;padding:15px 0;font-size:13px}#lm-promo-desktop .result strong{color:#35649a}#lm-promo-application{border-top:1px solid #ddd;margin-top:22px;padding-top:22px}#lm-promo-application label{display:block;font-size:12px;margin:10px 0 6px}#lm-promo-application input{border:1px solid #ddd;padding:12px;width:100%;box-sizing:border-box}#lm-promo-application button{margin-top:15px;background:#5f1023;color:#fff;padding:12px 20px;border:0;cursor:pointer}#lm-promo-error{font-size:12px;color:#93263e;margin-top:8px}";
deskStyle.textContent+='#lm-mini-dock{top:0!important;bottom:auto!important;right:auto!important;left:50%!important;transform:translateX(-50%);border-radius:0 0 12px 12px!important;background:#efeff1f0!important;border-color:#d7d7d7!important}#lm-mini-dock button{color:#292929!important;background:transparent!important}#lm-mini-dock button:hover{background:#ddd!important}';document.head.appendChild(deskStyle);
const mini=document.createElement('div');mini.id='lm-mini-dock';mini.innerHTML='<button type="button" data-pc="hotel">◇ HOTEL</button><button type="button" data-pc="safari">◉ Safari</button><button type="button" data-pc="mail">✉ Mail</button>';document.body.appendChild(mini);
mini.addEventListener('click',e=>{const v=e.target.closest('[data-pc]')?.dataset.pc;if(v==='hotel'){document.getElementById('lm-promo-desktop')?.remove();return}if(v&&!overlay)promoDesktop(v)});
function promoDesktop(view){
document.getElementById('lm-promo-desktop')?.remove();deskOpen=true;
const root=document.createElement('div');root.id='lm-promo-desktop';document.body.appendChild(root);
let contents='';
if(view==='safari'){
contents='<h2 style="font-size:21px">Safari 검색</h2><form id="lm-query-form"><input id="lm-web-query" placeholder="검색어 또는 웹사이트 이름 입력" value="'+safe(searchValue)+'"/><button class="go">검색</button></form>';
if(searchValue){contents+='<p style="color:#888;font-size:11px;margin-top:25px">검색 결과 · '+safe(searchValue)+'</p>';
for(const [name,code] of [['10월 뤼미에르 호텔 프라이빗 리트릿 코드','SN1010'],['9월 루미에르 호텔 특별 프로모션','AB0912'],['8월 프라이빗 리트릿 할인코드','SR0808']])contents+='<div class="result"><small style="color:#888">지난 여행자들의 할인 정보</small><br><strong>'+name+'</strong><p>'+code+'</p></div>';
contents+='<p style="font-size:12px;color:#888">11월 프로모션 코드는 검색되지 않았습니다.</p>'}
}else if(view==='mail'){
contents='<p style="font-size:12px;color:#777">받은 편지함 · '+PROMO_MAIL+'</p><div class="result"><strong>채용 결과 안내</strong><p>지원해 주셔서 감사합니다.</p></div>';
if(promoValid)contents+='<button class="go" id="lm-invite-open">● LUMIÈRE HOTEL · 프라이빗 리트릿 특별 초대 안내</button>';
else contents+='<p style="font-size:12px;color:#999">새로 도착한 메일이 없습니다.</p>';
}else{
contents='<p style="font-size:11px;color:#9d6879">PRIVATE INVITATION · LUMIÈRE RETREAT</p><h2>LUMIÈRE HOTEL</h2><p>프라이빗 리트릿 특별 프로모션에 신청해 주셔서 감사합니다.</p><p>아래 정보를 확인하신 후 공식 홈페이지에서 예약을 진행해 주세요.</p><div style="padding:20px;background:#f9f2f4;line-height:2.2"><b>체크인</b>　2026. 11. 14<br><b>객실</b>　루미에르 스위트<br><b>요금</b>　KRW 129,000 / 1박</div><button class="go" id="lm-invite-reserve">호텔에서 예약하기 ↗</button>';
}
root.innerHTML='<div class="win"><header><span>●　●　●</span><b>'+(view==='safari'?'Safari':'Mail')+'</b><button id="lm-pc-close">×</button></header><section>'+contents+'</section></div>';
root.querySelector('#lm-pc-close').onclick=()=>{root.remove();deskOpen=false};
root.querySelector('#lm-query-form')?.addEventListener('submit',e=>{e.preventDefault();searchValue=root.querySelector('#lm-web-query').value.trim();promoDesktop('safari')});
root.querySelector('#lm-invite-open')?.addEventListener('click',()=>promoDesktop('invite'));
root.querySelector('#lm-invite-reserve')?.addEventListener('click',()=>{root.remove();deskOpen=false;invitationRead=true;const date=document.getElementById('checkin'),out=document.getElementById('checkout'),room=document.getElementById('room-choice');if(date)date.value='2026-11-14';if(out)out.value='2026-11-15';if(room)room.value='suite';document.getElementById('booking-form')?.scrollIntoView({behavior:'smooth',block:'center'})});
}
function safe(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function promoApply(){
const content=document.getElementById('modal-content');if(!content||content.querySelector('#lm-promo-application'))return;
const form=document.createElement('form');form.id='lm-promo-application';
form.innerHTML='<div style="font-size:11px;letter-spacing:.12em;color:#6d3444">SPECIAL PROMOTION</div><h3>프라이빗 리트릿 프로모션 신청</h3><p style="font-size:13px">프로모션 코드와 이메일을 입력하면 초대장을 발송해 드립니다.</p><label>프로모션 코드</label><input name="code" placeholder="" required/><label>이메일 주소</label><input name="email" type="email" placeholder="" required/><div id="lm-promo-error"></div><button>초대장 신청하기 →</button>';
content.appendChild(form);

form.addEventListener('submit',e=>{e.preventDefault();const c=form.elements.code.value.trim().toUpperCase(),m=form.elements.email.value.trim().toLowerCase(),err=form.querySelector('#lm-promo-error');
if(c!=='NB1114'){err.textContent='프로모션 코드가 유효하지 않습니다. 다시 확인해 주세요.';return}
if(m!==PROMO_MAIL){err.textContent='게임 속 Mail 계정의 이메일 주소를 확인해 주세요.';return}
promoValid=true;try{sessionStorage.setItem('lm_promo_valid_v2','1')}catch(e){}
err.style.color='#356843';err.textContent='신청되었습니다. Mail에서 초대장을 확인해 주세요.';
});
}
document.addEventListener('click',e=>{
if(e.target.closest('[data-notice="0"]')||e.target.closest('#retreat-details'))setTimeout(promoApply,0);
if(e.target.closest('#review-preview')||e.target.closest('#all-reviews-btn')){if(!window.__lm_reviewHint){window.__lm_reviewHint=true;setTimeout(()=>{let d=document.getElementById('lm-thought');if(!d){d=document.createElement('div');d.id='lm-thought';d.innerHTML='<div class="lm-speaker">나의 생각</div><p></p><button>계속 둘러보기 ↗</button>';d.querySelector('button').onclick=()=>d.remove();document.body.appendChild(d)}d.querySelector('p').textContent='프로모션 코드? 인터넷에 검색해 볼까?';},220)}}
if(e.target.closest('[data-select-room]')&& !window.__lm_priceThought){window.__lm_priceThought=true;setTimeout(()=>{if(!overlay){let d=document.createElement('div');d.id='lm-thought';d.innerHTML='<div class="lm-speaker">나의 생각</div><p>역시 나한테는 너무 비싸구나…</p><button>계속 둘러보기 ↗</button>';d.querySelector('button').onclick=()=>d.remove();document.body.appendChild(d)}},160)}
});
window.LumiereRetreat={get invited(){return promoValid && invitationRead},get issued(){return promoValid},email:PROMO_MAIL};

})();