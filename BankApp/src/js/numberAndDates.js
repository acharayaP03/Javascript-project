/**
 * Working with numbers...
 */

/**
 * Conversions.
 */

import { labelBalance } from './variables';

console.log(Number('23'));
console.log('Type coercion with + : ', +'23');

/**
 * parsing pixel value
 */

console.log('Parsing pixel: ', Number.parseInt('30px'));
console.log('Parsing rem: ', Number.parseFloat('2.5rem'));

/**
 * working with Remainder operator
 */

labelBalance.addEventListener('click', (e)=>{
  [...document.querySelectorAll('.movements__row')].forEach((row, index)=>{
    if( (index + 1)% 2 === 0){
      row.style.backgroundColor = 'lightgray'
    }
  })
})

/**
 * Working with Numeric separators
 * these _ will be ignored by js and is more readable and can only be placed in between numbers.
 */

const diameter = 287_460_000_000
console.log('Numeric Separator: ', diameter);

/**
 * Working with big int
 * the max safe integer is stored here in Number.MAX_SAFE_INTEGER
 */

// console.log( 2 ** 53 -1) // out puts the max safe number
// console.log(Number.MAX_SAFE_INTEGER);
// console.log('BigInt representation: ', 9749527498572345274875274357234752345n);


/**
 * Intl api to manipulate date and numbers
 */

const number = 3884764.23;

const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR'
}

console.log('US     ', new Intl.NumberFormat('en-US', options).format(number))
