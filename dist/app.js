'use strict';
const config=window.THECOCO_CONFIG||{};
const products={"nectar":{"name":"코코넛 꽃 수액 음료","en":"COCONUT BLOSSOM DRINK","image":"assets/carton-v8.png","description":"코코넛 열매 속 물이 아닌, 꽃에서 채취한 수액 100%를 담은 음료입니다. 설탕을 더하지 않아도 꽃 수액 자체의 단맛을 즐길 수 있습니다. UHT 처리 후 무균 충전한 330ml 사각팩으로 소개합니다.","ingredients":"코코넛 꽃 수액 100%","form":"UHT 처리 · 무균 충전 · 330ml 사각팩","use":"잘 흔들어 차갑게 그대로 즐기거나, 아이스 커피·과일 음료와 섞어보세요. 제조사 안내는 개봉 후 냉장 보관·당일 음용이며 국내 제품 라벨을 우선 확인하세요.","point":"한 가지 원료의 단맛 · 설탕 추가 없음. 자연 유래 당류가 있으며 당류 0을 뜻하지 않습니다.","source":"https://sokfarm.com/product-detail/organic-fresh-coconut-flower-juice-330ml-uht-single-2604281722-552"}};
const productDialog=document.getElementById('product-dialog'),infoDialog=document.getElementById('info-dialog');let lastFocus=null;
function validUrl(value){try{const u=new URL(value);return u.protocol==='https:'?u.href:null}catch{return null}}
function openDialog(dialog){const prior=document.activeElement;if(!prior.closest('dialog'))lastFocus=prior;document.querySelectorAll('dialog[open]').forEach(d=>d.close());dialog.showModal();document.body.classList.add('modal-open');}
function closeDialog(dialog){dialog.close();document.body.classList.remove('modal-open');if(lastFocus&&lastFocus.isConnected)lastFocus.focus();}
function info(title,message){document.getElementById('info-title').textContent=title;document.getElementById('info-description').textContent=message;openDialog(infoDialog);}
function productDetail(key){const p=products[key];if(!p)return;document.getElementById('detail-en').textContent=p.en;document.getElementById('detail-title').textContent=p.name;document.getElementById('detail-description').textContent=p.description;document.getElementById('detail-use').textContent=p.use;document.getElementById('detail-ingredients').textContent=p.ingredients;document.getElementById('detail-form').textContent=p.form;document.getElementById('detail-point').textContent=p.point;document.getElementById('detail-source').href=p.source;const img=document.getElementById('detail-img');img.src=p.image;img.alt=p.name;const link=document.getElementById('detail-shop');link.dataset.shopProduct=key;link.href=validUrl(config.productUrls?.[key]||config.shopUrl)||'#store';openDialog(productDialog);}
document.querySelectorAll('[data-product]').forEach(b=>b.addEventListener('click',()=>productDetail(b.dataset.product)));
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>closeDialog(b.closest('dialog'))));
document.querySelectorAll('dialog').forEach(d=>{d.addEventListener('cancel',()=>document.body.classList.remove('modal-open'));d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))closeDialog(d)});});
document.querySelectorAll('[data-shop]').forEach(link=>{const url=validUrl(config.shopUrl);if(url)link.href=url;link.addEventListener('click',e=>{const key=link.dataset.shopProduct;const target=validUrl((key&&config.productUrls?.[key])||config.shopUrl);if(target){link.href=target;return;}e.preventDefault();info('공식 스토어 오픈 준비 중','코코넛 꽃 수액 음료 330ml를 구매하실 수 있는 공식 스토어를 준비하고 있습니다. 오픈 후 이곳에서 구매와 결제를 이용하실 수 있습니다.');});});
document.querySelectorAll('[data-contact]').forEach(b=>b.addEventListener('click',()=>{const url=validUrl(config.contactUrl);if(url){window.location.assign(url);return;}info('더코코 비즈니스 안내','프리미엄 유통·납품 파트너를 위한 공식 상담 채널을 준비하고 있습니다. 연락처가 확정되는 대로 이곳에서 안내해 드리겠습니다.');}));
const menuButton=document.querySelector('.menu-button'),mobileMenu=document.getElementById('mobile-menu');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','메뉴 열기');mobileMenu.hidden=true;document.body.classList.remove('menu-open')}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'메뉴 닫기':'메뉴 열기');mobileMenu.hidden=!open;document.body.classList.toggle('menu-open',open);});
mobileMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});window.matchMedia('(min-width:768px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
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
