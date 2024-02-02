const { CurrentAccount, SavingsAccount, SalaryAccount } = require('./account');
const { MINIMUM_BALANCE_TO_WITHDRAW } = require('./account.constant');
const { green, error } = require('./colorize.logger');

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

    displayAllAccounts() {
      console.log('\nAll Accounts:');
      this.accounts.forEach(account => {
        console.log(green(account.getAccountDetails()));
        console.log('------------------------');
      });
    }
    
    updateAccount(accountNumber, data) {
      const account = this.accounts.find(acc => acc.number === accountNumber);
      if(data.name) {
        account.name = data.name;
      }
      if(data.number) {
        account.number = data.number;
      }
      console.log(`Account ${accountNumber} updated.`);
      console.log(green(account.getAccountDetails()));
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
          console.log(green(`Withdrawn ${amount} from account ${accountNumber}. New balance: ${account.balance}`));
        } else {
            console.log(error(`Insufficient funds in account ${accountNumber}.`));
        }
      } else {
              console.log(error(`Account with number ${accountNumber} not found.`));
          }
    }
    searchAccount(accountNumber){
      const account = this.accounts.find(acc => acc.number === accountNumber);
      console.log("Account found");
      console.log(green(account.getAccountDetails()));
      return account;
    }

    canWithdrawMoney(account) {
      if(account.balance >= MINIMUM_BALANCE_TO_WITHDRAW) {
        return true;
      }
      return false;
    }

  }

  module.exports = {
    Bank
  };