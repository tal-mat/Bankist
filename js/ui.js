"use strict";

import { containerMovements, labelBalance, labelSumIn, labelSumOut, labelSumInterest } from "./elements.js";
import { formatMovementDate, formatCur } from "./helpers.js";

// UI update functions

// Function to display movements in the UI
export const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  // Sort movements if needed
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    // Format the movement date to a readable format based on the account locale
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    // Format the movement value to a currency format with 2 decimal places
    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    // Present the last movments at the top of the container
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// Function to calculate and display the account balance
export const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((sum, mov) => sum + mov, 0);

  // Show the account balance with the sign of the currency formatted
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

// Function to calculate and display the summary (incomes, outgoings, interest)
export const calcDisplaySummary = function (acc) {
  // Calculate total income
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency)

  // Calculate total outgoings
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  // Calculate total interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter(int => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
}

// Function to update the UI with movements, balance, and summary
export const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};