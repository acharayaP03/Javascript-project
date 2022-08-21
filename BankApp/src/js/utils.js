
/**
 * 
 * @param {*} movements array
 * @param {*} handle html element
 */
export const totalBalance = function (movements, handle) {
  const balance = movements.reduce((accumulator, move) => accumulator + move, 0);

  handle.textContent = balance + '€';
}

/**
 * 
 * @param {*} account user accont
 * @param {*} sumIn total sum in
 * @param {*} sumOut 
 * @param {*} sumIntrest 
 */
export const calDisplaySummary = function (account, sumIn, sumOut, sumIntrest) {
  const income = account.filter(move => move > 0).reduce((acc, curr) => acc + curr, 0);
  const expenses = account.filter(move => move < 0).reduce((acc, curr) => acc + curr, 0);
  const intrest  = account.filter(move => move > 0).map(move => move * 1.2/100).reduce((acc, curr) => acc + curr, 0)

  sumIn.textContent = income + '€';
  sumOut.textContent = Math.abs(expenses) + '€'
  sumIntrest.textContent = intrest + '€'
} 

export const displayMovements = function (movements, container) {
  // if html already contains html then,empty container
  container.innerHTML = '';

  movements.forEach((move, i) => {
    const type = move > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${move}</div>
      </div>
    `;
    
    container.insertAdjacentHTML('afterbegin', html);
  });
}