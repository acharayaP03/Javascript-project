/**
 * Scroll position:
 * Old scoll ways is done via calculating lef and top position of the desired section combining it with
 * pageXOffset and pageYOffset of the window and passing it to the window's scroll to event as an option with
 * behaviour property to smooth.
 * this will work in most of the old browser as well.
 *
 * but more modern way is to just set scoll section's scrollIntoView method and pass option of behavior to smooth.
 */

export const smoothScrolling = function (scrollBtn: HTMLButtonElement, sectionElement: HTMLElement){
    scrollBtn.addEventListener('click', (e: MouseEvent)=>{
        const section1Cords = sectionElement.getBoundingClientRect();

        console.log(e.target)
        window.scrollTo({
            behavior: 'smooth',
            left: section1Cords.left + window.pageXOffset,
            top: section1Cords.top + window.pageYOffset
        })
    })
}

export const smoothScrollingModernWay = function (scrollBtn: HTMLButtonElement, sectionElement: HTMLElement){
    scrollBtn.addEventListener('click', ()=>{
        sectionElement.scrollIntoView({ behavior: 'smooth'})
    })

}

