const prompt = require('prompt');

class Bank {
  constructor() {
    this.accounts = [];
  }

  createAccount(accountType, name, number, balance) {
    let account;

    switch (accountType.toLowerCase()) {
      case 'current':
        account = new CurrentAccount(name, number, balance);
        break;
      case 'savings':
        account = new SavingsAccount(name, number, balance);
        break;
      case 'salary':
        account = new SalaryAccount(name, number, balance);
        break;
      default:
        console.log('Invalid account type.');
        return;
    }

    this.accounts.push(account);
    console.log(`${accountType} account created for ${name} with account number ${number}`);
  }

  getAccountDetails(accountNumber) {
    const account = this.accounts.find(acc => acc.number === accountNumber);

    if (account) {
      console.log(`Account details for account number ${accountNumber}:`);
      console.log(account.getAccountDetails());
    } else {
      console.log(`Account with number ${accountNumber} not found.`);
    }
  }
}

class Account {
  constructor(name, number, balance = 0) {
    this.name = name;
    this.number = number;
    this.creationDate = new Date();
    this.balance = balance;
  }

  getAccountDetails() {
    return `Name: ${this.name}\nAccount Number: ${this.number}\nCreation Date: ${this.creationDate}\nBalance: ${this.balance}`;
  }
}

class CurrentAccount extends Account {
  constructor(name, number, balance) {
    super(name, number, balance);
    this.accountType = 'Current Account';
  }
}

class SavingsAccount extends Account {
  constructor(name, number, balance) {
    super(name, number, balance);
    this.accountType = 'Savings Account';
  }
}

class SalaryAccount extends Account {
  constructor(name, number, balance) {
    super(name, number, balance);
    this.accountType = 'Salary Account';
  }
}

const bank = new Bank();

function promptUser() {
  prompt.start();

  prompt.get(['accountType', 'name', 'number', 'balance'], function (err, result) {
    bank.createAccount(result.accountType, result.name, result.number, parseFloat(result.balance));
    promptUser();
  });
}

promptUser();
