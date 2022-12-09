
import { accounts, labelBalance, movements } from './variables';
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

/**
 * flat and flatMap methods.
 * is commonly used for flattening nested arrays.
 * flat takes argument where we specify how many level we want to flaten our array, the default is 1
 */

// flattening array that is one level deep.
const numArr = [[1,2], 3,4, [5,6], [7,8], 9]

const flattenNumArr = numArr.flat()
console.log(flattenNumArr);

// flattening array that is two level dep
const numArrDeep = [[1,2, ['deep', 'array']], 3,4, [5,6], [7,8], 9]
const flattenArrDeep = numArrDeep.flat(2)
console.log(flattenArrDeep);

/**
 * a real use case senario
 */

const accountsMovements = accounts.map( acc => acc.movements)
const flattenMovements = accountsMovements.flat()
const overallBallance = accounts.map( acc => acc.movements).flat().reduce((acc, curr) => acc + curr, 0)

/**
 * Since we are mapping and flattening, we can use flatMap here.
 */

const flatMap_overall_balance = accounts.flatMap(acc => acc.movements).reduce((acc, curr) => acc + curr, 0)
console.log('Flattent movements: ', overallBallance);
console.log('Use of flat map: ', flatMap_overall_balance);


/***
 * Array Sort method
 * Please note, this methods actually mutates the array
 * and if we want to sort num array, we need pass in call back func. that compares array elements
 */


const sortableArrayAsc = movements.sort((a, b) => {
  if(a > b) return 1 // switch the order
  if(a< b ) return -1 // keep the order
})

const sortableArrayAcsSimplified = movements.sort((a, b) => a - b)

const sortableArrayDesc = movements.sort((a, b) => {
  if(a > b) return -1 // switch the order
  if(a< b ) return 1 // keep the order
})

const sortableArrayDescSimplified = movements.sort((a, b) => b - a)
console.log('Sortable array ascending: ', sortableArrayAsc, sortableArrayAcsSimplified);
console.log('Sortable array Descending: ', sortableArrayDesc, sortableArrayDescSimplified);

/**
 * More ways to create and filling arrays.
 */

const anArray = Array.from({ length: 10}, (currentElement, i) => i + 1)
console.log('----------------- More ways to create an arrays-------------------');
console.log(anArray);
labelBalance.addEventListener('click', function(){
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent?.replace('€', ''))
  )

  console.log(movementsUI)
})


