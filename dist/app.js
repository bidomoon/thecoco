'use strict';
const config=window.THECOCO_CONFIG||{};
const products={"syrup":{"name":"코코넛 꽃 시럽","en":"COCONUT FLOWER NECTAR","image":"assets/syrup.webp","description":"꽃 수액 100%를 55–60°C에서 진공 농축해 만든 액상 시럽입니다. 설탕을 추가하지 않고 수액 자체의 단맛을 농축합니다. 동물성 꿀 대신 곁들일 수 있는 식물성 감미 식재료입니다.","ingredients":"코코넛 꽃 수액 100%","form":"꽃 수액을 농축한 액상 시럽","use":"플레인 요거트·토스트·디저트에 곁들이거나, 음료·베이킹·요리 양념에 사용해 보세요.","point":"55–60°C 저온 진공 농축 · 식물성 원료의 달콤함","source":"https://sokfarm.com/product-detail/mat-hoa-dua-co-dac-organic-sokfarm-2605265715-571"},"sugar":{"name":"코코넛 꽃 설탕","en":"COCONUT FLOWER SUGAR","image":"assets/sugar.webp","description":"꽃 수액을 저온에서 농축하고 알갱이로 만든 설탕입니다. 커피 한 잔부터 쿠키와 케이크까지, 단맛을 내는 원료에 새로운 선택지를 더합니다.","ingredients":"코코넛 꽃 수액으로 만든 설탕","form":"알갱이 형태의 감미 원료","use":"커피·차에 넣거나 쿠키·케이크·견과 음료를 만들 때 사용해 보세요. 레시피와 원하는 단맛에 따라 사용량을 조절하세요.","point":"꽃 수액을 농축해 알갱이로 · 커피·베이킹·요리용 감미 원료","source":"https://sokfarm.com/product-detail/sokfarm-organic-coconut-flower-sugar-2604282359-848"},"aminos":{"name":"코코넛 꽃 발효소스","en":"COCONUT AMINOS","image":"assets/aminos.webp","description":"콩 대신 코코넛 꽃 수액과 바다소금을 3개월 동안 자연 발효한 액상 조미소스입니다. 꽃 수액에서 시작한 감칠맛과 짭짤한 풍미를 드레싱부터 볶음과 조림까지 더해보세요.","ingredients":"코코넛 꽃 수액 · 바다소금","form":"액상 발효 조미소스","use":"두부·버섯·채소 요리에 곁들이거나, 드레싱·볶음·조림·찍어 먹는 소스로 활용해 보세요.","point":"3개월 자연 발효 · 콩 대신 꽃 수액으로 만든 조미소스","source":"https://sokfarm.com/product-detail/nuoc-tuong-mat-hoa-dua-organic-sokfarm-dong-it-muoi"},"nectar":{"name":"코코넛 꽃 수액 음료","en":"COCONUT BLOSSOM DRINK","image":"assets/carton-v8.png","description":"코코넛 열매 속 물이 아닌, 꽃에서 채취한 수액 100%를 담은 음료입니다. 설탕을 더하지 않아도 꽃 수액 자체의 단맛을 즐길 수 있습니다. UHT 처리 후 무균 충전한 330ml 사각팩으로 소개합니다.","ingredients":"코코넛 꽃 수액 100%","form":"UHT 처리 · 무균 충전 · 330ml 사각팩","use":"잘 흔들어 차갑게 그대로 즐기거나, 아이스 커피·과일 음료와 섞어보세요. 제조사 안내는 개봉 후 냉장 보관·당일 음용이며 국내 제품 라벨을 우선 확인하세요.","point":"한 가지 원료의 단맛 · 설탕 추가 없음. 자연 유래 당류가 있으며 당류 0을 뜻하지 않습니다.","source":"https://sokfarm.com/product-detail/organic-fresh-coconut-flower-juice-330ml-uht-single-2604281722-552"}};
const productDialog=document.getElementById('product-dialog'),infoDialog=document.getElementById('info-dialog');let lastFocus=null;
function validUrl(value){try{const u=new URL(value);return u.protocol==='https:'?u.href:null}catch{return null}}
function openDialog(dialog){const prior=document.activeElement;if(!prior.closest('dialog'))lastFocus=prior;document.querySelectorAll('dialog[open]').forEach(d=>d.close());dialog.showModal();document.body.classList.add('modal-open');}
function closeDialog(dialog){dialog.close();document.body.classList.remove('modal-open');if(lastFocus&&lastFocus.isConnected)lastFocus.focus();}
function info(title,message){document.getElementById('info-title').textContent=title;document.getElementById('info-description').textContent=message;openDialog(infoDialog);}
function productDetail(key){const p=products[key];if(!p)return;document.getElementById('detail-en').textContent=p.en;document.getElementById('detail-title').textContent=p.name;document.getElementById('detail-description').textContent=p.description;document.getElementById('detail-use').textContent=p.use;document.getElementById('detail-ingredients').textContent=p.ingredients;document.getElementById('detail-form').textContent=p.form;document.getElementById('detail-point').textContent=p.point;document.getElementById('detail-source').href=p.source;const img=document.getElementById('detail-img');img.src=p.image;img.alt=p.name;const link=document.getElementById('detail-shop');link.dataset.shopProduct=key;link.href=validUrl(config.productUrls?.[key]||config.shopUrl)||'#store';openDialog(productDialog);}
document.querySelectorAll('[data-product]').forEach(b=>b.addEventListener('click',()=>productDetail(b.dataset.product)));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>closeDialog(b.closest('dialog'))));
document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('cancel',()=>document.body.classList.remove('modal-open'));d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))closeDialog(d)});});
document.querySelectorAll('[data-shop]').forEach(link=>{const url=validUrl(config.shopUrl);if(url)link.href=url;link.addEventListener('click',e=>{const key=link.dataset.shopProduct;const target=validUrl((key&&config.productUrls?.[key])||config.shopUrl);if(target){link.href=target;return;}e.preventDefault();info('공식 스토어 오픈 준비 중','더코코의 제품을 구매하실 수 있는 공식 스토어를 준비하고 있습니다. 오픈 후 이곳에서 구매와 결제를 이용하실 수 있습니다.');});});
document.querySelectorAll('[data-contact]').forEach(b=>b.addEventListener('click',()=>{const url=validUrl(config.contactUrl);if(url){window.location.assign(url);return;}info('더코코 비즈니스 안내','프리미엄 유통·납품 파트너를 위한 공식 상담 채널을 준비하고 있습니다. 연락처가 확정되는 대로 이곳에서 안내해 드리겠습니다.');}));
const menuButton=document.querySelector('.menu-button'),mobileMenu=document.getElementById('mobile-menu');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','메뉴 열기');mobileMenu.hidden=true;document.body.classList.remove('menu-open')}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');mobileMenu.hidden=!open;document.body.classList.toggle('menu-open',open);});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});window.matchMedia('(min-width:768px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{const filter=b.dataset.filter;let count=0;document.querySelectorAll('.product-card').forEach(card=>{card.hidden=filter!=='all'&&card.dataset.category!==filter;if(!card.hidden)count++});document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});document.getElementById('filter-status').textContent=b.textContent+' 제품 '+count+'개';}));
const moments=[{"scene":"assets/drink-hero-v5.webp","sceneAlt":"유리잔에 담아 즐기는 수액 음료 연출 장면","index":"01 / DRINK · EVERYDAY","title":"차갑게 그대로도,<br>커피와 함께도.","description":"설탕을 더하지 않은 꽃 수액의 단맛. 차갑게 한 팩 그대로 즐기거나, 아이스 커피와 과일 음료에 섞어 나만의 한 잔을 만들어보세요.","product":"nectar","link":"음료의 특징 자세히 보기"},{"scene":"assets/sweet-use-v4.webp","sceneAlt":"요거트와 토스트, 음료에 시럽을 활용하는 음식 연출 장면","index":"02 / SYRUP · DESSERT & BRUNCH","title":"같은 토스트도,<br>다른 단맛으로.","description":"꽃 수액 100%를 저온 진공 농축한 식물성 시럽. 플레인 요거트와 토스트 위에 한 스푼, 홈카페 음료와 디저트에도 취향만큼 더해보세요.","product":"syrup","link":"시럽의 특징 자세히 보기"},{"scene":"assets/sweet-use-v4.webp","sceneAlt":"커피와 베이킹에 코코넛 꽃 설탕을 사용하는 활용 연출 장면","index":"03 / SUGAR · COFFEE & BAKING","title":"커피와 베이킹의 단맛도,<br>원료부터 다르게.","description":"꽃 수액을 농축해 알갱이로 만든 설탕. 커피와 차, 쿠키와 케이크에 활용해보세요. 원하는 단맛과 레시피에 따라 양을 조절합니다.","product":"sugar","link":"설탕의 특징 자세히 보기"},{"scene":"assets/savory-use-v4.webp","sceneAlt":"두부와 버섯, 채소 요리에 발효소스를 사용하는 음식 연출 장면","index":"04 / AMINOS · EVERYDAY COOKING","title":"콩 대신 꽃 수액,<br>식탁에 더하는 감칠맛.","description":"꽃 수액과 바다소금을 3개월 자연 발효한 소스. 두부와 채소에 찍어 먹거나 드레싱, 버섯 볶음과 조림 양념에 활용해보세요.","product":"aminos","link":"발효소스의 특징 자세히 보기"}];
const tabs=[...document.querySelectorAll('[data-moment]')];
function selectMoment(i,focus=false){const m=moments[i],p=products[m.product];document.getElementById('moment-index').textContent=m.index;document.getElementById('moment-title').innerHTML=m.title;document.getElementById('moment-description').textContent=m.description;const img=document.getElementById('moment-img');img.src=p.image;img.alt=p.name;const scene=document.getElementById('moment-scene-img');scene.src=m.scene;scene.alt=m.sceneAlt;document.getElementById('moment-product-name').textContent=p.name;document.getElementById('moment-detail').dataset.product=m.product;document.getElementById('moment-detail').textContent=m.link;tabs.forEach((t,n)=>{t.classList.toggle('active',n===i);t.setAttribute('aria-selected',String(n===i));t.tabIndex=n===i?0:-1});document.getElementById('moment-panel').setAttribute('aria-labelledby',tabs[i].id);if(focus)tabs[i].focus();}
tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectMoment(i));t.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;else if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;else if(e.key==='Home')next=0;else if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectMoment(next,true);}});});

selectMoment(0);

// Guide links reveal the relevant answer before navigating to it.
document.querySelectorAll('[data-faq]').forEach(link=>link.addEventListener('click',event=>{const answer=document.querySelectorAll('.faq-list details')[Number(link.dataset.faq)];if(!answer)return;event.preventDefault();answer.open=true;answer.querySelector('summary').focus({preventScroll:true});answer.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}));

const recipeDialog=document.getElementById('recipe-dialog');
document.querySelector('[data-recipe-poster]').addEventListener('click',()=>openDialog(recipeDialog));
const film=document.getElementById('sokfarm-film'),filmStart=document.querySelector('.film-start');
filmStart.addEventListener('click',async()=>{try{await film.play();}catch{filmStart.hidden=true;film.focus();}});
film.addEventListener('play',()=>{filmStart.hidden=true;});
film.addEventListener('ended',()=>{filmStart.hidden=false;});

// Highlight the reading position without changing keyboard focus or history.
const readingLinks=[...document.querySelectorAll('.desktop-nav a[href^="#"]')];
const readingSections=readingLinks.map(link=>document.querySelector(link.getAttribute('href'))).filter(Boolean);
let readingFrame=0;
function updateReadingPosition(){
 readingFrame=0;
 const marker=document.querySelector('.header').getBoundingClientRect().bottom+100;
 const current=readingSections.filter(section=>section.getBoundingClientRect().top<=marker).at(-1);
 readingLinks.forEach(link=>{
  if(current&&link.getAttribute('href')==='#'+current.id)link.setAttribute('aria-current','location');
  else link.removeAttribute('aria-current');
 });
}
function queueReadingPosition(){if(!readingFrame)readingFrame=requestAnimationFrame(updateReadingPosition);}
window.addEventListener('scroll',queueReadingPosition,{passive:true});
window.addEventListener('resize',queueReadingPosition,{passive:true});
window.addEventListener('load',queueReadingPosition);
queueReadingPosition();
