import {containerApp, labelDate, labelTimer, labelWelcome} from './variables';

/**
 * Calculate date
 */


export  const displayDate = (movementsDate, localDate) =>{

  const now = movementsDate !== undefined ? new Date(movementsDate) : new Date();
  const clacDaysPassed = (dateToday , previousDate) => Math.round(Math.abs(dateToday - previousDate) / (1000 * 60 * 60 * 24));

  const daysPassed = clacDaysPassed(new Date(), movementsDate)

    if(daysPassed === 0) return 'Today'
    if(daysPassed === 1) return 'Yesterday'
    if(daysPassed <= 7) return `${daysPassed} days`

    return new Intl.DateTimeFormat(localDate).format(movementsDate)

}

/**
 * Format currency with Intl Api
 * @param value
 * @param locale
 * @param currency
 * @returns {string}
 */

const formatCurrency = function (value, locale, currency){
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency
  }).format(value);
}

/**
 * Timer
 */

export const starLoginTimer = function (){
  // Set Time to 5 mins
  let time = 300;
  const tick = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, '0');
    const seconds =  String(time % 60 ).padStart(2, '0');

    labelTimer.textContent = `${minutes}:${seconds}`

    //if the time is 0, logout the user;

    if(time === 0){
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0
    }
    time--
  }
  /**
   * calling this setInterval callback will actually resolves issue of timer starting after one second.
   * so the trick is to call the callback then call timer into the clear interval.
   * also decrementing timer after if will resolve issue of logging out app before timer hits 0
   */
  tick()
  const timer = setInterval(tick, 1000)
  return timer;
}
/**
 * 
 * @param {*} movements array
 * @param {*} handle html element
 */
export const totalBalance = function (account, handle) {
  const balance = account.movements.reduce((accumulator, move) => accumulator + move, 0);

  handle.textContent = formatCurrency(balance, account.locale, account.currency)
}

/**
 * 
 * @param {*} account user accont
 * @param {*} sumIn total sum in
 * @param {*} sumOut 
 * @param {*} sumIntrest 
 */
export const calDisplaySummary = function (account, sumIn, sumOut, sumInterest) {
  const income = account.movements.filter(move => move > 0).reduce((acc, curr) => acc + curr, 0);
  const expenses = account.movements.filter(move => move < 0).reduce((acc, curr) => acc + curr, 0);
  const interest  = account.movements.filter(move => move > 0).map(move => move * 1.2/100).reduce((acc, curr) => acc + curr, 0)

  console.log('calcDisplaySummary: ', account)

  sumIn.textContent = formatCurrency(income, account.locale, account.currency)
  sumOut.textContent = formatCurrency(expenses, account.locale, account.currency)
  sumInterest.textContent = formatCurrency(interest, account.locale, account.currency)
}

export const displayMovements = function (account, container, sort = false) {
  // if html already contains html then,empty container
  container.innerHTML = '';

  const moves = sort ? account.movements.slice().sort((a,b) => a - b) : account.movements
  moves.forEach((move, i) => {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    //display movements date
    const movementsDate = new Date(account.movementsDates[i])
    const date = displayDate(movementsDate, account.locale)

    //formating movements
    const formattedMovements = formatCurrency(move, move.locale, account.currency)

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${date}</div>
        <div class="movements__value">${formattedMovements}</div>
      </div>
    `;
    
    container.insertAdjacentHTML('afterbegin', html);
  });
}

export const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};