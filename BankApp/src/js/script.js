'use strict';

/////////////////////////////////////////////////
import { accounts } from './variables';
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

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

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


