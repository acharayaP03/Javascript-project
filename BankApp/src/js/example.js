
/////////////////////////////////////////////////

/**
 * map method
 */
const eurToUsd = 1.1;

const movementsUsd = movements.map( mov => eurToUsd * mov )
const movementDescription = movements.map( (move, i) => `Movement ${ i + 1 }: You ${ move > 0 ? 'deposited' : 'withdrew'} ${Math.abs(move)}`)

/**
 * Filter methods
 */
const deposits = movements.filter(move => move > 0 )
const withdrawal = movements.filter(withdraw => withdraw < 0)

/**
 * Reduce methods
 */

const accountBalance = movements.reduce((accumulator, current, currIndex, orriginal) =>{
    console.log(current, orriginal);
  return accumulator + current
}, 0);

/**
 * Reduce to rescue when finding max and min value
 */

const maxDeposit = movements.reduce((acc, curr) =>{
    if( acc > curr) return acc;
    else return curr
}, movements.at(0));

console.log(movementDescription, deposits, withdrawal, accountBalance, maxDeposit); 

/**
 * methods chaining
 */

const totalDepositsInUsd = movements
.filter(move => move > 0)
.map(move => move * eurToUsd)
.reduce((accumulator, current) => accumulator + current, 0)

console.log(totalDepositsInUsd);

/**
 * Find methods
 * 
 */

const firstWihtdrawal = movements.find(move => move < 0); // return the first element when it finds it 

console.log(firstWihtdrawal)
const account = accounts.find(acc => acc.owner === 'Jessica Davis')

console.log(account);
