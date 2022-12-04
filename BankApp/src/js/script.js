'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  username: 'js',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  username: 'jd',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  username: 'stw',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  username: 'ss',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

export const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

/////////////////////////////////////////////////

import {
  btnLogin,
  containerMovements,
  labelBalance,
  labelSumIn,
  labelSumOut,
  labelSumInterest,
  inputLoginUsername,
  inputLoginPin,
  labelWelcome,
  containerApp, btnClose, inputClosePin, inputCloseUsername, btnLoan, inputLoanAmount
} from './variables';
import { totalBalance, calDisplaySummary, displayMovements } from './utils';


let currentLoggedInuser;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentLoggedInuser = accounts.find(acc => acc.username === inputLoginUsername.value);
  
  if(currentLoggedInuser?.pin === Number(inputLoginPin.value)){
    console.log(currentLoggedInuser.pin);

    labelWelcome.textContent = `Welcome back, ${currentLoggedInuser.owner.split(' ').at(0)}`;
    containerApp.style.opacity = 100;

    // clear the input fields 
    inputLoginUsername.value = inputLoginPin.value = '';
    // let's input field to loose its focus.
    inputLoginPin.blur();

    // show logged in user movements.
    displayMovements(currentLoggedInuser.movements, containerMovements);
    // show logged in user balance
    totalBalance(currentLoggedInuser.movements, labelBalance);
    // show logged in user summary..
    calDisplaySummary(currentLoggedInuser.movements, labelSumIn, labelSumOut, labelSumInterest)
  }else{
    console.log('Wrong pin');
  }
});


btnLoan.addEventListener('click', (e) =>{
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentLoggedInuser.movements.some(move => move >= amount * 0.1)){
    currentLoggedInuser.movements.push(amount);
  }
  console.log(currentLoggedInuser.movements);
  displayMovements(currentLoggedInuser.movements, containerMovements);
  inputLoanAmount.value = ''
})

/**
 * close account
 */
btnClose.addEventListener('click', (e) =>{
  e.preventDefault();
  console.log('index: ');
  if(inputCloseUsername.value === currentLoggedInuser.username && Number(inputClosePin.value) === currentLoggedInuser.pin){
    /**
     * @findIndex utilizes the callback function to loop over array.
     */
    const index = accounts.findIndex(acc => acc.username === currentLoggedInuser.username)
    // once you find the index, remove it from the array.
    accounts.splice(index, 1);

    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
})


