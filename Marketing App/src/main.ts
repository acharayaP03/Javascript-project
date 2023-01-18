'use strict';

///////////////////////////////////////
// Modal window

import {modal, overlay, btnsOpenModal, btnCloseModal, tabs, tabsContent, tabsContainer, nav} from "./variables.js";
import {deleteCookie, displayCookie} from "./load-cookie";
import {Button} from "./types";



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
 * since event wont't bubble up for mouseenter, we cannot use it for this purpose.
 * */

nav.addEventListener('mouseover', function (e){
 const target = e.target as HTMLElement;
  /**
   * here are traversing up to the parent so that we can find child element easily.
   */

  /**
   * properly type annotationd ot siblings element,
   * if we dont convert the node list type to array, style property will not be available.
   */
 const siblings: HTMLElement[] = Array.from((target.closest('.nav') as HTMLElement).querySelectorAll('.nav__link'));

 const logo = (target.closest('.nav') as HTMLElement).querySelector('img') as HTMLImageElement;
 if(target.classList.contains('nav__link')){
  siblings.forEach(el => {
    if(el !== target) el.style.opacity = '0.5'
  })
 }
 logo.style.opacity = '0.5'
})

nav.addEventListener('mouseout', function (e){
  const target = e.target as HTMLElement;
  /**
   * here are traversing up to the parent so that we can find child element easily.
   */

  /**
   * properly type annotationd ot siblings element,
   * if we dont convert the node list type to array, style property will not be available.
   */
  const siblings: HTMLElement[] = Array.from((target.closest('.nav') as HTMLElement).querySelectorAll('.nav__link'));

  const logo = (target.closest('.nav') as HTMLElement).querySelector('img') as HTMLImageElement;
  if(target.classList.contains('nav__link')){
    siblings.forEach(el => {
      if(el !== target) el.style.opacity = '1'
    })
  }
  logo.style.opacity = '1'
})

