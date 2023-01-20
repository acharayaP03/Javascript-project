'use strict';

///////////////////////////////////////
// Modal window

import {
  modal,
  overlay,
  btnsOpenModal,
  btnCloseModal,
  tabs,
  tabsContent,
  tabsContainer,
  nav,
  allSections, allImages
} from "./variables.js";
import {deleteCookie, displayCookie} from "./load-cookie";
import {handleHover} from "./utils";



const openModal = function (e: Event) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

displayCookie();
deleteCookie()
//smoothScrolling(btnScrollTo, section1)
//smoothScrollingModernWay(btnScrollTo, section1);

/**
 * attaching smooth scrolling to the navigation
 *
 * the idea behind this is, we wil target all the nav links where it will have href attributes consist of
 * id of the sections. we can easily achieve this by calling getAttribute on nav link.
 * But, there is an issue with this approach. which a event bubbling. if bu any chance, event is attached to the parent element.
 * this will call the parent element as well, which proformance prespective is not a good idea.
 * so we will take another apprach. Event Delegation
 */
// navLinks.forEach((el) =>{
//   el.addEventListener('click', (event: Event)=>{
//     event.preventDefault();
//
//     const sectionId = el.getAttribute('href');
//
//     const scrollSections = document.querySelector(sectionId!)
//
//     scrollSections!.scrollIntoView({ behavior: 'smooth'})
//
//   })
// })

/**
 * Event Delegationg: On this appraach, we will attach event handler to the parent element
 * e.target will allow us to access all child element.
 */

const parentNavLink = document.querySelector('.nav__links') as HTMLElement

parentNavLink.addEventListener('click', (e) => {
  e.preventDefault();
  const target = e.target as HTMLAnchorElement
  // check if class name exist
  if (target.classList.contains('nav__link')) {

    const sectionId = target.getAttribute('href');
    const scrollSections = document.querySelector(sectionId!) as HTMLElement;

    scrollSections!.scrollIntoView({ behavior: 'smooth'})

  }
})

/**
 * Dom Traversing: one very important method we have used here is the <element>.closest() which allows to target any
 * children element and do event handeling and many more
 */

tabsContainer.addEventListener('click', (e: Event)=>{
  e.preventDefault();

  const target = e.target as HTMLElement;
  const clickedTab = target.closest('.operations__tab');

  //if tab is already active, when we click it will return null,
  //so we will prevent it by null guard
  if(!clickedTab) return

  tabs.forEach((tab) => (<Element>tab).classList.remove('operations__tab--active'))
  tabsContent.forEach(content => (<Element>content).classList.remove('operations__content--active'))
  // 1.) activate tab buttons
  clickedTab.classList.add('operations__tab--active')
  // 2.) activate tab content after tab is activated.
  // @ts-ignore
  document.querySelector(`.operations__content--${clickedTab.dataset.tab}`).classList.add('operations__content--active')
})

/**
 * Passing arguments to Event handlers.
 * We will apply this technique to our navigation,
 * the idea is, when we hover over any nav items, only the nav item that the mouse pointer is on, will have opacity
 * of 1, others will receive 0.5.
 *
 * for this menu fade animation, we wil utilize mouseout and mouseover listeners since the event needs to bubble up.
 * since event won't bubble up for mouseenter, we cannot use it for this purpose.
 *
 * the bind method, passes the opacity argument via this key word. since we are calling handleHover as a listener's
 * call back function, the 'e' object is automatically passed to it,
 * */

nav.addEventListener('mouseover', handleHover.bind('0.5'))

nav.addEventListener('mouseout', handleHover.bind('1'))

/**
 * Sticky Navigations:
 * although, this seems to work, it is a bit of problematic due to performance, since scroll event will be triggered
 * every time user scrolls.
 *
 * the better way to handle this situation is use Intersection Observer api.
 * a very good explanation is provided with infite scroll at here
 * https://wesbos.com/javascript/06-serious-practice-exercises/scroll-events-and-intersection-observer
 */

// const initialCords = section1.getBoundingClientRect();
// window.addEventListener('scroll', function (){
//   if(window.scrollY > initialCords.top){
//     nav.classList.add('sticky')
//   }else {
//     nav.classList.remove('sticky')
//   }
// })

const header = document.querySelector('.header') as HTMLElement;
const navHeight = nav.getBoundingClientRect().height;
// @ts-ignore
const stickyNavigation = function(entries){
  const [entry] = entries;
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}
// @ts-ignore

const headerObserver = new IntersectionObserver(stickyNavigation, {
  // @ts-ignore
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(header)

/**
 * Reveal sections with Intersection Observer api
 */

// @ts-ignore
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  //@ts-ignore
  roo: null,
  threshold: 0.15
})

allSections.forEach(function (section){
  sectionObserver.observe(<Element>section);
  (<Element>section).classList.add('section--hidden')
})

/**
 * Lazy loading images with Intersection Observer API
 */

// @ts-ignore
const loadImages = function (entries, observe){
  const [ entry ] = entries;

  if(!entry.isIntersecting) return

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src
  /**
   * once the src is replaced,
   * we can trigger the load event to replace the css class that blurs the previous img
   *
   * this trick is done by loading low quality image first then loading good quality image once user scroll image section.
   */
  entry.target.addEventListener('load', function (){
    entry.target.classList.remove('lazy-img')
  })

  // stop observer
  observe.unobserve(entry.target)
}

const imageObserver = new IntersectionObserver(loadImages, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

allImages.forEach(image => imageObserver.observe(<Element>image))

