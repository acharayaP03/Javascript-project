'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
export const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

export const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

export const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

export const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
export const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
export const accounts = [account1, account2, account3, account4];

// Elements
export const labelWelcome = document.querySelector('.welcome');
export const labelDate = document.querySelector('.date');
export const labelBalance = document.querySelector('.balance__value');
export const labelSumIn = document.querySelector('.summary__value--in');
export const labelSumOut = document.querySelector('.summary__value--out');
export const labelSumInterest = document.querySelector('.summary__value--interest');
export const labelTimer = document.querySelector('.timer');

export const containerApp = document.querySelector('.app');
export const containerMovements = document.querySelector('.movements');

export const btnLogin = document.querySelector('.login__btn');
export const btnTransfer = document.querySelector('.form__btn--transfer');
export const btnLoan = document.querySelector('.form__btn--loan');
export const btnClose = document.querySelector('.form__btn--close');
export const btnSort = document.querySelector('.btn--sort');

export const inputLoginUsername = document.querySelector('.login__input--user');
export const inputLoginPin = document.querySelector('.login__input--pin');
export const inputTransferTo = document.querySelector('.form__input--to');
export const inputTransferAmount = document.querySelector('.form__input--amount');
export const inputLoanAmount = document.querySelector('.form__input--loan-amount');
export const inputCloseUsername = document.querySelector('.form__input--user');
export const inputClosePin = document.querySelector('.form__input--pin');
