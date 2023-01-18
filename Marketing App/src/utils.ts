/**
 * This file contains all reusable functions
 */

export const handleHover = function (e: Event){
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
            if(el !== target) { // @ts-ignore
                el.style.opacity = this
            }
        })
    }
    // @ts-ignore
    logo.style.opacity = this
}