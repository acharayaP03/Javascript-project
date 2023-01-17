'use strict';

///////////////////////////////////////
// Modal window

import {modal, overlay, btnsOpenModal, btnCloseModal} from "./variables.js";
import {deleteCookie, displayCookie} from "./load-cookie";



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