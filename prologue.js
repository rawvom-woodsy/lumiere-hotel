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
let promoArticle=-1,mailDetails=false;
function promoDesktop(view){
document.getElementById('lm-promo-desktop')?.remove();deskOpen=true;
const root=document.createElement('div');root.id='lm-promo-desktop';document.body.appendChild(root);
let contents='';
if(view==='safari'){
contents='<h2 style="font-size:21px">Safari 검색</h2><form id="lm-query-form"><input id="lm-web-query" placeholder="검색어 또는 웹사이트 이름 입력" value="'+safe(searchValue)+'"/><button class="go">검색</button></form>';
if(!searchValue)contents+='<button class="go" id="lm-pc-suggestion" style="background:#f5edf0;color:#652f40;border:1px solid #dfc9d1">뤼미에르 호텔 프라이빗 리트릿 프로모션 코드 ↗</button>';
if(searchValue){
if(/(뤼미에르|루미에르|lumiere|리트릿|프로모션)/i.test(searchValue)){
contents+='<p style="color:#888;font-size:11px;margin-top:25px">검색 결과 · '+safe(searchValue)+'</p>';
const links=[['10월 프라이빗 리트릿 할인코드 공유해요','10월에 다녀온 여행자의 할인 신청 경험'],['9월 뤼미에르 호텔 할인받아 다녀온 후기','프라이빗 리트릿 실제 투숙 후기'],['8월 스위트룸 특별 프로모션 후기','여름 휴가 중 경험한 프라이빗 리트릿']];
for(let i=0;i<links.length;i++)contents+='<div class="result"><small style="color:#888">개인 블로그 · 여행 후기</small><br><button type="button" data-lm-searcharticle="'+i+'" style="border:0;background:none;color:#295e9e;font-weight:bold;font-size:15px;padding:7px 0;text-align:left;cursor:pointer">'+links[i][0]+'</button><p>'+links[i][1]+'</p></div>';
contents+='<p style="font-size:12px;color:#888">11월 프로모션 코드는 검색되지 않았습니다.</p>';
}else contents+='<p style="font-size:13px;color:#777;margin-top:25px">검색어와 관련된 결과가 없습니다. 다른 검색어를 입력해 보세요.</p>';
}
if(promoArticle>=0){const posts=[{"title":"10월의 조용한 휴식, 뤼미에르 호텔에서 보낸 주말","author":"느린여행자","date":"2026.10.13","paragraphs":["요즘은 관광지를 빠르게 둘러보는 여행보다 숙소에서 조용히 머무는 휴식이 더 좋아졌어요. 이번엔 작은 도시에서 주말을 보내기로 했습니다.","뤼미에르 호텔은 로비부터 차분했어요. 체크인도 빨랐고 객실이 조용해서 도착하자마자 한동안 창밖을 바라봤습니다. 침구가 좋아 깊게 잠들었고 아침에는 근처 빵집을 걸어서 다녀왔어요.","10월 10일에는 호텔 리트릿 프로그램에 참여했습니다. 상담 뒤에 혼자 쉬는 시간이 이어져서 부담스럽지 않았어요. 여행 마지막 날에는 다시 일상으로 돌아갈 힘이 조금 생긴 것 같았습니다.","가격이 부담스러워 망설였는데 후기에서 프로모션을 알게 됐어요. 저처럼 예약을 고민하는 분들을 위해 제가 사용했던 코드를 아래에 남깁니다.","10월에 사용한 프라이빗 리트릿 프로모션 코드는 SN1010이었습니다. 다음 시즌에도 되는지는 모르겠어요."]},{"title":"가을 호캉스 기록｜조식부터 리트릿까지","author":"오후의기록","date":"2026.09.16","paragraphs":["연차를 내고 며칠 쉬고 싶어서 뤼미에르 호텔을 예약했습니다. 화려한 관광 계획 없이 조용한 곳에서 좋은 밥 먹고 늦잠을 자고 싶었어요.","객실 컨디션은 기대 이상이었고 창가 의자가 마음에 들었어요. 조식은 따뜻한 메뉴가 많아서 만족스러웠고 직원들도 친절했습니다.","9월 12일에는 마음 돌봄 상담을 받았습니다. 다른 참가자들과 어울려야 할까 봐 걱정했던 것과 달리 편안한 시간이었어요.","댓글에 가격 문의가 있어서 예약할 때 적었던 할인 정보를 덧붙여요. 제가 사용한 코드는 AB0912였습니다."]},{"title":"여름휴가 숙소 후기, 생각보다 좋았던 스위트","author":"여름의페이지","date":"2026.08.11","paragraphs":["올해는 먼 곳에 가는 대신 조용한 호텔에서 쉬는 걸 여름휴가 계획으로 정했어요. 사진이 마음에 들어 예약했는데 실제 객실도 깔끔하고 편안했습니다.","낮에는 동네 빵집에 다녀오고 오후엔 객실에서 책을 읽었습니다. 호텔 주변이 생각보다 한적해 늦은 저녁 산책도 좋았어요.","8월 8일의 Summer Rest 프로그램은 간단한 상담과 휴식 중심으로 진행됐습니다. 무엇을 해야 한다는 부담 없이 쉴 수 있는 점이 좋았어요.","예약 비용이 궁금하다는 분들을 위해 남겨요. 당시 프라이빗 리트릿 할인에 사용한 프로모션 코드는 SR0808이었습니다."]}];const post=posts[promoArticle];contents='<button id="lm-article-back" style="border:0;background:none;color:#356098;cursor:pointer">← 검색 결과</button><div style="margin-top:24px;color:#999;font-size:11px">개인 여행 블로그 · '+post.date+' · '+post.author+'</div><h2 style="font-size:22px;line-height:1.5">'+post.title+'</h2><div style="font-size:12px;color:#999;padding:12px 0;border-bottom:1px solid #ddd;margin-bottom:24px">뤼미에르 호텔 개인 투숙 기록</div>'+post.paragraphs.map(p=>'<p style="font-size:14px;line-height:2.15;margin:0 0 32px;color:#444">'+p+'</p>').join('')+'<p style="font-size:11px;color:#999;border-top:1px solid #eee;padding-top:15px">개인이 작성한 여행 후기입니다.</p>';}
}else if(view==='mail'){
contents='<p style="font-size:12px;color:#777">받은 편지함 · '+PROMO_MAIL+'</p><button id="lm-rejection-open" class="result" style="display:block;text-align:left;width:100%;background:#f6f8fa;border:1px solid #eee;cursor:pointer"><strong>채용담당자 · [채용 결과 안내] 지원해 주셔서 감사합니다.</strong><p>채용 전형 결과를 안내드립니다.</p></button>';
if(promoValid)contents+='<button id="lm-invite-open" class="result" style="display:block;text-align:left;width:100%;background:#f6f8fa;border:1px solid #eee;cursor:pointer;padding:17px;margin-top:7px"><strong>뤼미에르 호텔 예약팀 · 프라이빗 리트릿 특별 초대 안내</strong><p>프로모션 신청이 확인되었습니다. 예약 정보를 확인해 주세요.</p></button>';
}else if(view==='rejection'){
contents='<button id="lm-mail-back" style="border:0;background:none;color:#3c6396;cursor:pointer">← 받은편지함</button><h2 style="font-size:19px">[채용 결과 안내] 지원해 주셔서 감사합니다.</h2><div style="font-size:12px;border-bottom:1px solid #ddd;padding:12px 0">채용담당자 &lt;info@samson.com&gt;<br><button id="lm-mail-detail" style="border:0;background:none;padding:7px 0;color:#777;cursor:pointer">받는 사람 ▼</button>'+(mailDetails?'<div style="background:#f8f8f8;padding:13px;line-height:2"><b>보낸 사람:</b> info@samson.com<br><b>받는 사람:</b> '+PROMO_MAIL+'<br><b>날짜:</b> 2026. 11. 2. 오후 2:32<br><b>제목:</b> [채용 결과 안내] 지원해 주셔서 감사합니다.<br><b>발송 도메인:</b> samson.com<br><b>보안:</b> 표준 암호화(TLS)</div>':'')+'</div><div style="font-size:13px;line-height:2.1;margin-top:25px">안녕하세요, 지원자님.<p>먼저 당사 채용에 관심을 가지고 지원해 주신 점 진심으로 감사드립니다.</p><p>신중한 검토 끝에 아쉽게도 이번 채용 전형에서는 함께하지 못하게 되었음을 안내드립니다.</p><p>앞으로 지원자님의 앞날에 좋은 일들이 가득하시길 기원합니다.</p>감사합니다.<br>채용담당자 드림</div>';
}else{
contents='<button id="lm-mail-back" style="border:0;background:none;color:#3c6396;cursor:pointer">← 받은편지함</button><h2 style="font-size:19px;margin:22px 0 8px">프라이빗 리트릿 특별 초대 안내</h2><div style="font-size:12px;border-bottom:1px solid #ddd;padding:12px 0"><strong>뤼미에르 호텔 예약팀</strong> &lt;info@lumierehotel.com&gt;<br><button id="lm-invite-detail" style="border:0;background:none;padding:7px 0;color:#777;cursor:pointer">받는 사람 ▼</button>　'+PROMO_MAIL+(mailDetails?'<div style="background:#f8f8f8;padding:13px;line-height:2"><b>보낸 사람:</b> info@lumierehotel.com<br><b>받는 사람:</b> '+PROMO_MAIL+'<br><b>날짜:</b> 2026. 10. 16. 오후 3:10<br><b>제목:</b> 프라이빗 리트릿 특별 초대 안내<br><b>발송 도메인:</b> lumierehotel.example<br><b>보안:</b> 표준 암호화(TLS)</div>':'')+'</div><div style="font-size:13px;line-height:2.1;margin-top:26px"><p>안녕하세요, 고객님.</p><p>뤼미에르 호텔의 프라이빗 리트릿 프로모션에 관심을 가져주셔서 감사합니다.</p><p>고객님의 프로모션 신청이 확인되어 아래 일정에 특별 초대해 드립니다.</p><div style="background:#f9f5f6;padding:18px 22px;margin:24px 0;border-left:3px solid #5f1023"><b>체크인</b>　2026년 11월 14일<br><b>객실 유형</b>　루미에르 스위트<br><b>특별 요금</b>　129,000원 / 1박</div><p>지정된 날짜와 객실 유형을 선택하시면 특별 프로모션 예약을 진행하실 수 있습니다.</p><p>뤼미에르 호텔에서 편안한 시간을 보내시길 바랍니다.</p><p>감사합니다.<br>뤼미에르 호텔 예약팀 드림</p><button class="go" id="lm-invite-reserve">객실 예약하기 ↗</button></div>';

}
root.innerHTML='<div class="win"><header><span>●　●　●</span><b>'+(view==='safari'?'Safari':'Mail')+'</b><button id="lm-pc-close">×</button></header><section>'+contents+'</section></div>';
root.querySelector('#lm-pc-close').onclick=()=>{root.remove();deskOpen=false};
root.querySelector('#lm-query-form')?.addEventListener('submit',e=>{e.preventDefault();searchValue=root.querySelector('#lm-web-query').value.trim();promoArticle=-1;promoDesktop('safari')});
root.querySelector('#lm-pc-suggestion')?.addEventListener('click',()=>{searchValue='뤼미에르 호텔 프라이빗 리트릿 프로모션 코드';promoDesktop('safari')});
root.querySelectorAll('[data-lm-searcharticle]').forEach(b=>b.addEventListener('click',()=>{promoArticle=Number(b.dataset.lmSearcharticle);promoDesktop('safari')}));
root.querySelector('#lm-article-back')?.addEventListener('click',()=>{promoArticle=-1;promoDesktop('safari')});
root.querySelector('#lm-rejection-open')?.addEventListener('click',()=>{mailDetails=false;promoDesktop('rejection')});
root.querySelector('#lm-mail-detail')?.addEventListener('click',()=>{mailDetails=!mailDetails;promoDesktop('rejection')});
root.querySelector('#lm-invite-detail')?.addEventListener('click',()=>{mailDetails=!mailDetails;promoDesktop('invite')});
root.querySelector('#lm-mail-back')?.addEventListener('click',()=>promoDesktop('mail'));
root.querySelector('#lm-invite-open')?.addEventListener('click',()=>{mailDetails=false;promoDesktop('invite')});
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
function showReviewAfterClose(){
  if(document.getElementById('modal-scrim')?.classList.contains('open'))return;
  let d=document.getElementById('lm-thought');
  if(!d){d=document.createElement('div');d.id='lm-thought';d.innerHTML='<div class="lm-speaker">나의 생각</div><p></p><button>계속 둘러보기 ↗</button>';d.querySelector('button').onclick=()=>d.remove();document.body.appendChild(d)}
  d.querySelector('p').textContent='프로모션 코드? 인터넷에 검색해 볼까?';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape' && window.__lm_reviewPopupVisited && !window.__lm_reviewHint && document.querySelector('#modal-content .all-reviews')){window.__lm_reviewHint=true;setTimeout(showReviewAfterClose,100)}});
document.addEventListener('click',e=>{
if(e.target.closest('[data-notice="0"]')||e.target.closest('#retreat-details'))setTimeout(promoApply,0);
if(e.target.closest('#all-reviews-btn')){window.__lm_reviewPopupVisited=true}
if(window.__lm_reviewPopupVisited && !window.__lm_reviewHint && (e.target.closest('#modal-close')||e.target.id==='modal-scrim')){
  if(document.querySelector('#modal-content .all-reviews') && !document.getElementById('modal-scrim')?.classList.contains('open')){
    window.__lm_reviewHint=true;
    setTimeout(showReviewAfterClose,100);
  }
}
if(e.target.closest('[data-select-room]')&& !window.__lm_priceThought){window.__lm_priceThought=true;setTimeout(()=>{if(!overlay){let d=document.createElement('div');d.id='lm-thought';d.innerHTML='<div class="lm-speaker">나의 생각</div><p>역시 나한테는 너무 비싸구나…</p><button>계속 둘러보기 ↗</button>';d.querySelector('button').onclick=()=>d.remove();document.body.appendChild(d)}},160)}
});
window.LumiereRetreat={get invited(){return promoValid && invitationRead},get issued(){return promoValid},email:PROMO_MAIL};

})();