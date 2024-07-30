"use strict";

// Utility functions

// Function to format the movement date to a readable format
export const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  // If the days passed from the momvent date to the current date is 0, 1, or less than 7, then write "Today", "Yesterday" or the number of the days passed, else, show 'day/month/year' of the movement
  if (daysPassed === 0) return "Today";
  if (daysPassed === 1) return "Yesterday";
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
};

// Function to format a num as a currency string for a given locale and currency
export const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

// Function to create usernames for each account based on the owner's name
export const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLocaleLowerCase()
      .split(" ")
      .reduce((shortUsername, currentValue) => shortUsername + currentValue[0], "");
  })
};