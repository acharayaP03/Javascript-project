'use strict';

/////////////////////////////////////////////////
import {
  account1, accounts, btnSort, btnTransfer, inputTransferAmount, labelDate, movements,
  btnLogin,
  containerMovements,
  labelBalance,
  labelSumIn,
  labelSumOut,
  labelSumInterest,
  inputLoginUsername,
  inputLoginPin,
  labelWelcome,
  containerApp, btnClose, inputClosePin, inputCloseUsername, btnLoan, inputLoanAmount, inputTransferTo
} from './variables';
import {totalBalance, calDisplaySummary, displayMovements, createUsernames, displayDate, starLoginTimer} from './utils';

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);



createUsernames(accounts)

 let currentLoggedInuser, timer;


/**
 * fix date for the current balance
 */



btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentLoggedInuser = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log('Current Logged In User: ', currentLoggedInuser);
  
  if(currentLoggedInuser?.pin === Number(inputLoginPin.value)){

    starLoginTimer();

    labelWelcome.textContent = `Welcome back, ${currentLoggedInuser.owner.split(' ').at(0)}`;
    containerApp.style.opacity = 100;

    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      //weekday: 'long'
    }
    const localeDate = navigator.language;
    labelDate.textContent = new Intl.DateTimeFormat(currentLoggedInuser.locale, options).format(new Date())

    // clear the input fields 
    inputLoginUsername.value = inputLoginPin.value = '';
    // let's input field to loose its focus.
    inputLoginPin.blur();

    // show logged in user movements.
    displayMovements(currentLoggedInuser, containerMovements);
    // show logged in user balance
    totalBalance(currentLoggedInuser, labelBalance);
    // show logged in user summary..
    calDisplaySummary(currentLoggedInuser, labelSumIn, labelSumOut, labelSumInterest)

    /**
     * here this timer will help us to create a timer variable, which we can remove if there is already timer started on
     * memory. this actually happens when more than one user is logged in to app.
     */
    if(timer){
      timer = clearInterval(timer)
    }
  }else{
    console.log('Wrong pin');
  }
});

/**
 * Transfer
 */

btnTransfer.addEventListener('click', (e) =>{
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && receiverAcc && currentLoggedInuser.balance >= amount && receiverAcc?.username !== currentLoggedInuser.username){
    currentLoggedInuser.movements.push(-amount);
    receiverAcc.movements.push(amount)

    currentLoggedInuser.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    displayMovements(currentLoggedInuser, containerMovements);

    /**
     * clear previous, and restart the timer.
     */
    clearInterval(timer)
    timer = starLoginTimer(timer)
  }

})


btnLoan.addEventListener('click', (e) =>{
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  setTimeout(() =>{
    if(amount > 0 && currentLoggedInuser.movements.some(move => move >= amount * 0.1)){
      currentLoggedInuser.movements.push(amount);
    }
    currentLoggedInuser.movementsDates.push(new Date().toISOString());
    displayMovements(currentLoggedInuser, containerMovements);
    totalBalance(currentLoggedInuser, labelBalance);
  }, 5000)
  inputLoanAmount.value = ''
  /**
   * clear previous, and restart the timer.
   */
  clearInterval(timer)
  timer = starLoginTimer(timer)
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
  /**
   * clear previous, and restart the timer.
   */
  clearInterval(timer)
})


/**
 * Sort btn
 */
// preserve state of sort
let sorted = false
btnSort.addEventListener('click', (e) =>{

  e.preventDefault();
  displayMovements(currentLoggedInuser.movements, containerMovements, !sorted)
  sorted = !sorted

  /**
   * clear previous, and restart the timer.
   */
})


