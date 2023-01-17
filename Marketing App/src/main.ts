'use strict';

///////////////////////////////////////
// Modal window

import {modal, overlay, btnsOpenModal, btnCloseModal, btnScrollTo, section1} from "./variables.js";
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

smoothScrollingModernWay(btnScrollTo, section1)
