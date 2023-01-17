'use strict';

///////////////////////////////////////
// Modal window

import {modal, overlay, btnsOpenModal, btnCloseModal, btnScrollTo, section1, navLinks} from "./variables.js";
import {deleteCookie, displayCookie} from "./load-cookie";
import {smoothScrolling, smoothScrollingModernWay} from "./smoothScrolling";

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
smoothScrollingModernWay(btnScrollTo, section1);

/**
 * attaching smooth scrolling to the navigation
 *
 * the idea behind this is, we wil target all the nav links where it will have href attributes consist of
 * id of the sections. we can easily achieve this by calling getAttribute on nav link.
 */
navLinks.forEach((el) =>{
  el.addEventListener('click', (event: Event)=>{
    event.preventDefault();

    const sectionId = el.getAttribute('href');

    const scrollSections = document.querySelector(sectionId!)

    scrollSections!.scrollIntoView({ behavior: 'smooth'})

  })
})
