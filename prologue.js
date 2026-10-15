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
if(act==='next'){if(line<speech.length-1){line++;draw()}else{screen='search';draw()}}
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
})();