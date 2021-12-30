'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn=>btn.addEventListener('click',openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//////////////////////////////////////////
//  SCROLL FUNCTION

const btnScrollTo=document.querySelector('.btn-tn-scroll-to');
const section1=document.querySelector('#section--1');
btnScrollTo.addEventListener('click',function(e){
  const scrollC=section1.getBoundingClientRect();
 //OLD WAY -----------------
  // window.scroll({
  //   left:scrollC.left+window.pageXOffset,
  //   top:scrollC.top+window.pageYOffset, 
  //   behavior :'smooth'});
 //---------------------------
 section1.scrollIntoView({behavior:'smooth'});
});


//////////////////////////////////////////
//PAGE NAVIGATION
//   document.querySelectorAll('.nav__link').forEach(function(el){
//       el.addEventListener('click', function(e){
//         e.preventDefault();
//         const id=this.getAttribute('href'); 
//         document.querySelector(id).scrollIntoView({behavior:'smooth'});
//         console.log(el);
//   });
// });
//USING BUBBLING 

document.query
 document.querySelector('.nav__links').addEventListener('click',function(e){
   e.preventDefault();
   if(e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute('href'); 
    document.querySelector(id).scrollIntoView({behavior:'smooth'});
   }
 });   
  
 //OPERATOINS ------------------------------------------
   const tabContainer=document.querySelector('.operations__tab-container');
   const operations=document.querySelector('.operations');
  //  const tabs=document.querySelector('.operatoins__tab');
  //  const content
tabContainer.addEventListener('click',function(e)
{
    const clicked=e.target.closest('.operations__tab')
 if(clicked && clicked.classList.contains('btn')&&!clicked.classList.contains('operations__tab--active')){

   tabContainer.querySelector('.operations__tab--active').classList.remove('operations__tab--active');
   operations.querySelector('.operations__content--active').classList.remove('operations__content--active');
   clicked.classList.add('operations__tab--active');
   const contentContainer= document.querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`);
   contentContainer.classList.add('operations__content--active'); 
 }
 });

 //HOVER OVER NAVIGATION BAR-----------------------------
const nav=document.querySelector('.nav');
 const hoverOver = function(e){
   if(e.target.classList.contains('nav__link'))
   {

     const link=e.target;
     const siblings=link.closest('.nav').querySelectorAll('.nav__link');
     //console.log(siblings);
     siblings.forEach(el=>
      { if(el!==link)  el.style.opacity=this;  
       //console.log(el.style.opacity);
     });
     link.closest('.nav').querySelector('img').style.opacity=this;
   }
 };
   
 nav.addEventListener('mouseover',hoverOver.bind(0.5));
 nav.addEventListener('mouseout',hoverOver.bind(1));



//STICK NAVIGATION-------------------------------------
// const obsCallback = function(entries, observer  ){
//  //console.log(entries);
//   console.log('intersect');
//   entries.forEach(entry=>{console.log(entry)});
// };
// const obsOptions ={
//   root:null,
//   threshold:[0,0.2,0.3]

// };
// const observer=new IntersectionObserver(obsCallback ,obsOptions);
// observer.observe(section1);
const header=document.querySelector('.header');
const navHeight=nav.getBoundingClientRect().height;

function stickyNav(entries){
  //console.log(entries);
  const [entry]=entries;
  //console.log(entry);
  //console.log(entry.isIntersecting);
   if(!entry.isIntersecting)
   nav.classList.add('sticky');
   else
   nav.classList.remove('sticky');
}
const options={
  root:null, 
  threshold:0,
  rootMargin:`-${navHeight}px`,
}
const headerObserver=new IntersectionObserver(stickyNav,options);
headerObserver.observe(header);


// reveal Sections 
const allSections=document.querySelectorAll('.section');

const revealSection = function(entries,observer){
 //console.log(entries);
 const [entry]=entries;
 if(!entry.isIntersecting)return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const options1 ={
  root:null, 
  threshold:0.2,
}
const hiddenSection=new IntersectionObserver(revealSection,options1);
  allSections.forEach(function(section){
  hiddenSection.observe(section);
  section.classList.add('section--hidden');
});

//IMG BLUR --------------------------------------------------------------------

const imgTargets=document.querySelectorAll('img[data-src]');
const imgObserver=function(entries,observer){
 //console.log(entries);
 const [entry]=entries;
 if(!entry.isIntersecting) return;

 entry.target.src=entry.target.dataset.src;
  entry.target.addEventListener('load',function(){
   entry.target.classList.remove('lazy-img');
  });
  
  observer.unobserve(entry.target);

};
 const imgLoad= new IntersectionObserver(imgObserver,{
   root:null,
   threshold:0,
   rootMargin:'-200px',
})
imgTargets.forEach(img=>imgLoad.observe(img));

  //SLIDER --------------------------------------------=========================
  {
//slider start===============================================


    const slides=document.querySelectorAll('.slide');
    const rgtButton=document.querySelector('.slider__btn--right');
    const lftButton=document.querySelector('.slider__btn--left');
    const dots=document.querySelector('.dots');
    let currSlide=0;
    const maxSlide=slides.length;
  //ACTIVE SLIDE HIGHLIGHT DOT====================
  const activeslide=function(slide){
    dots.querySelector('.dots__dot--active')?.classList.remove('dots__dot--active');
    dots.querySelector(`[data-slide="${slide}"]`).classList.add('dots__dot--active');
  };
  
  
    function slider(curr){
      slides.forEach((slide,i)=>slide.style.transform=`translateX(
        ${(i-curr)*100}%
      )`);
    };
  
    slider(0);
    function rightSlide(){
      if(currSlide===maxSlide-1){
        currSlide=0;
      }else{
        currSlide++;
     
      }
      slider(currSlide);
      activeslide(currSlide);
    }
    function leftSlide(){
      if(currSlide===0){
        currSlide=maxSlide-1;
      }else {
        currSlide--;
        
      }
      slider(currSlide);
      activeslide(currSlide);
    }
    rgtButton.addEventListener('click',rightSlide);
    lftButton.addEventListener('click',leftSlide);
    document.addEventListener('keydown',function(e){
      //console.log(e);//ArrowLeft
     if(e.key==='ArrowRight')rightSlide();
     if(e.key==='ArrowLeft')leftSlide();
    });
  
    //Dots 
  
    const createdots=function()
    {
      slides.forEach(function(_,i){
      dots.insertAdjacentHTML('beforeend',`<button class="dots__dot " data-slide="${i}"></button>`)
      });
    };
   createdots();
  
   dots.addEventListener('click',function(e){
     //console.log( dots.querySelector('.dots__dot--active'));
     if(e.target.classList.contains('dots__dot')){
     //  e.target.classList.add('dots__dot--active');
     activeslide(e.target.dataset.slide);
     console.log(e.target.dataset.slide)
       const {slide}=e.target.dataset;
       slider(slide);
     } 
   });
  
  //Slider finish==========================
  }
  
 
// function randomNo(max, min){
//   return Math.floor(Math.random()*(max-min+1)+min)
// }

// document.querySelector('.nav__link').addEventListener('click',function(){
//   this.style.backgroundColor =`rgb(${randomNo(0,255)},
//   ${randomNo(0,255)},${randomNo(0,255)})`;
//   console.log('1st');
// })
// document.querySelector('.nav__links').addEventListener('click',function(){
//   this.style.backgroundColor =`rgb(${randomNo(0,255)},
//   ${randomNo(0,255)},${randomNo(0,255)})`;
//   console.log('2st');

// })
// document.querySelector('.nav').addEventListener('click',function(){
//   this.style.backgroundColor =`rgb(${randomNo(0,255)},
//   ${randomNo(0,255)},${randomNo(0,255)})`;
//   console.log('3st');
// })