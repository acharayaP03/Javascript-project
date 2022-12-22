import { labelDate } from './variables';

/**
 * Calculate date
 */


export  const displayDate = (movementsDate) =>{

  const now = movementsDate !== undefined ? new Date(movementsDate) : new Date();

  const day = `${now.getDate()}`.padStart(2, 0); // this method will padd the string if its only one digit.
  const month = `${now.getMonth() +  1}`.padStart(2, 0);
  const year = now.getFullYear()
  const hour = now.getHours();
  const minutes = now.getMinutes();

  return `${day}/${month}/${year}, ${hour}:${minutes}`
}
/**
 * 
 * @param {*} movements array
 * @param {*} handle html element
 */
export const totalBalance = function (movements, handle) {
  const balance = movements.reduce((accumulator, move) => accumulator + move, 0);

  handle.textContent = '$'+Number(balance).toFixed(2);
}

/**
 * 
 * @param {*} account user accont
 * @param {*} sumIn total sum in
 * @param {*} sumOut 
 * @param {*} sumIntrest 
 */
export const calDisplaySummary = function (account, sumIn, sumOut, sumInterest) {
  const income = account.filter(move => move > 0).reduce((acc, curr) => acc + curr, 0);
  const expenses = account.filter(move => move < 0).reduce((acc, curr) => acc + curr, 0);
  const interest  = account.filter(move => move > 0).map(move => move * 1.2/100).reduce((acc, curr) => acc + curr, 0)

  sumIn.textContent = '$' + Number(income).toFixed(2);
  sumOut.textContent = '$' +Number(Math.abs(expenses)).toFixed(2)
  sumInterest.textContent = '$' + Number(interest).toFixed(2)
} 

export const displayMovements = function (account, container, sort = false) {
  // if html already contains html then,empty container
  container.innerHTML = '';

  const moves = sort ? account.movements.slice().sort((a,b) => a - b) : account.movements
  moves.forEach((move, i) => {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    //display movements date
    const date = displayDate(account.movementsDates[i])
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${date}</div>
        <div class="movements__value">${Number(move).toFixed(2)}</div>
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