/**
 * Slider main functions for event listeners
 */
import { slides } from "./variables";
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
}

export const previousSlide = function (){
     if(currentSlide === 0){
         currentSlide = maxSlideNum;
     }
     currentSlide--;
     goToSlide(currentSlide)
}