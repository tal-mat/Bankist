"use strict";

import { accounts } from "./data.js";
import { labelWelcome, containerApp, btnLogin, btnTransfer, btnLoan, btnClose, btnSort, inputLoginUsername, inputLoginPin, inputTransferTo, inputTransferAmount, inputLoanAmount, inputCloseUsername, inputClosePin, labelDate, } from "./elements.js";
import { updateUI, displayMovements } from "./ui.js";
import { startLogOutTimer } from "./timer.js";

// Event handlers

let currentAccount, timer;

// Event handler for login button
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting 
  e.preventDefault();

  // Find the account based on the username
  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

  // Check if the account exists and pin is correct
  if (currentAccount && currentAccount?.pin === +(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(" ")[0]} `;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }

    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(now);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Timer for log out
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

// Event handler for transfer button
btnTransfer.addEventListener('click', function (e) {
  // Prevent form from submitting 
  e.preventDefault();

  const amount = +(inputTransferAmount.value);
  const recevierAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = "";

  // Check if transfer amount is valid and sufficient balance exists
  if (amount > 0 &&
    recevierAcc &&
    currentAccount.balance >= amount &&
    recevierAcc.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    recevierAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    recevierAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer for log out
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// Event handler for loan button
btnLoan.addEventListener('click', function (e) {
  // Prevent form from submitting 
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  // Check if the loan amount is valid and at least one deposit is >= 10% of the loan amount
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {

    // Add setTimeout to simulate the fact that the back takes some time to process the loan request
    setTimeout(function () {
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer for log out
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }

  // Clear input field
  inputLoanAmount.value = "";
});

// Event handler for close account button
btnClose.addEventListener('click', function (e) {
  // Prevent form from submitting 
  e.preventDefault();

  let currentUserToDelete = inputCloseUsername.value;
  let currentUserPinToDelete = +(inputClosePin.value);

  // Check if username and pin match the current account
  if (currentUserToDelete &&
    currentUserPinToDelete &&
    currentAccount &&
    currentUserToDelete === currentAccount.username &&
    currentUserPinToDelete === currentAccount.pin
  ) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  // Clear input fields
  currentUserToDelete = currentUserPinToDelete = "";
});

// A flag for the btnSort of the current account movements 
let sorted = false;
// Event handler for sorting the account movements
btnSort.addEventListener('click', function (e) {
  // Prevent form from submitting 
  e.preventDefault();

  // Toggle sorting of movements
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;

});