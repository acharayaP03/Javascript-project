const header = document.querySelector('.header') as HTMLElement;
// Creating and inserting elements
const message = document.createElement('div') as HTMLDivElement;

export const displayCookie = function () {

    message.classList.add('cookie-message');
    message.innerHTML =
        'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';
    header.append(message);
    return
}

export const deleteCookie = function (){
    const deleteCookieBtn = document.querySelector('.btn--close-cookie') as HTMLButtonElement
        deleteCookieBtn.addEventListener('click', function () {
            message!.parentElement!.removeChild(message)
        });
}