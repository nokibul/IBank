const { CurrentAccount, SavingsAccount, SalaryAccount } = require('./account');
const { green } = require('./colorize.logger');

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
    displayAllAccounts() {
      console.log('\nAll Accounts:');
      this.accounts.forEach(account => {
        console.log(green(account.getAccountDetails()));
        console.log('------------------------');
      });
    }
    
    updateAccount(accountNumber, newName) {
      const account = this.accounts.find(acc => acc.number === accountNumber);

      if (account) {
          account.name = newName;
          console.log(`Account with number ${accountNumber} updated with new name: ${newName}`);
      } else {
              console.log(`Account with number ${accountNumber} not found.`);
          }
      }

    deleteAccount(accountNumber) {
      const index = this.accounts.findIndex(acc => acc.number === accountNumber);

      if (index !== -1) {
          this.accounts.splice(index, 1);
          console.log(`Account with number ${accountNumber} deleted.`);
      } else {
              console.log(`Account with number ${accountNumber} not found.`);
          }
      }

    depositAmount(accountNumber, amount) {
      const account = this.accounts.find(acc => acc.number === accountNumber);

      if (account) {
        account.balance += amount;
        console.log(`Deposited ${amount} into account ${accountNumber}. New balance: ${account.balance}`);
      } else {
          console.log(`Account with number ${accountNumber} not found.`);
        }
      }

    withdrawAmount(accountNumber, amount) {
      const account = this.accounts.find(acc => acc.number === accountNumber);

      if (account) {
        if (amount <= account.balance) {
          account.balance -= amount;
          console.log(`Withdrawn ${amount} from account ${accountNumber}. New balance: ${account.balance}`);
        } else {
            console.log(`Insufficient funds in account ${accountNumber}.`);
        }
      } else {
              console.log(`Account with number ${accountNumber} not found.`);
          }
      }
  }

  module.exports = {
    Bank
  };