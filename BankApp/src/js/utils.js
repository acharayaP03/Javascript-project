
/**
 * 
 * @param {*} movements array
 * @param {*} handle html element
 */
export const totalBalance = function (movements, handle) {
  const balance = movements.reduce((accumulator, move) => accumulator + move, 0);

  handle.textContent = balance + '€';
}