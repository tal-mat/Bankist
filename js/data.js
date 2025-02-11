"use strict";

// Accounts Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2024-07-21T10:17:24.185Z',
    '2024-07-22T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2024-07-23T23:36:17.929Z',
    '2024-07-24T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-25T12:45:33.035Z',
    '2019-12-02T10:12:56.867Z',
    '2019-12-20T08:04:23.907Z',
    '2020-01-15T14:50:46.235Z',
    '2020-02-05T12:33:06.386Z',
    '2020-04-12T10:43:26.374Z',
    '2020-06-18T14:49:59.371Z',
    '2020-07-22T16:01:20.894Z',
  ],
  currency: 'GBP',
  locale: 'en-GB',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2020-01-10T12:10:33.035Z',
    '2020-02-20T10:48:16.867Z',
    '2020-03-05T07:04:23.907Z',
    '2020-04-15T14:18:46.235Z',
    '2020-05-22T11:33:06.386Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

export const accounts = [account1, account2, account3, account4];