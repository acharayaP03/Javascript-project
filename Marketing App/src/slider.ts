/**
 * Slider main functions for event listeners
 */
import {dotContainer, slides} from "./variables";
// 1). define initial slide
let currentSlide = 0;

// 2). define maximum slide number depending on the length of the slide elements it contains

 const maxSlideNum = slides.length;

/**
 *
 * @param slide is a amount that we want to translate the position of element.
 */

export const goToSlide = function (slide: number) {
     slides.forEach((s, slideIndex) => s.style.transform = `translateX(${100 * (slideIndex - slide)}%`)
}

export const nextSlide = function (){
     if (currentSlide === maxSlideNum - 1){
         currentSlide = 0;
     }else {
         currentSlide++
     }
     goToSlide(currentSlide)
    addActiveClassToDot(currentSlide)
}

export const previousSlide = function (){
     if(currentSlide === 0){
         currentSlide = maxSlideNum;
     }
     currentSlide--;
     goToSlide(currentSlide)
    addActiveClassToDot(currentSlide)
}

/**
 * Creating dots below the slides...
 */

export const createDots = function (){
    slides.forEach((_, slideIndex) => dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${slideIndex}"></button>`))
}

export const addActiveClassToDot = function (slide: number | string){
    document.querySelectorAll<HTMLElement>('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'))
    document.querySelector(`.dots__dot[data-slide="${slide}"]`)!.classList.add('dots__dot--active')
}