const prompt = require('prompt');
const { Bank } = require('./bank');
const { validateUserInput } = require('./account.validation');
const { error } = require('./colorize.logger');


const bank = new Bank();

function promptUser() {
  console.log("Select an option:");
  console.log("1. Create a new account");
  console.log("2. Display all accounts");
  console.log("3. Update an account");
  console.log("4. Delete an account");
  console.log("5. Deposit into your account");
  console.log("6. Withdraw from your account");
  console.log("7. Search an account");
  console.log("8. Exit");

  prompt.get(["option"], function (err, result) {
    const selectedOption = parseInt(result.option);

    switch (selectedOption) {
      case 1:
        prompt.get(
          ["accountType", "name", "number", "balance"],
          function (err, result) {
            const validationResponse = validateUserInput(result);
            if (!validationResponse.success) {
              console.log(error(validationResponse.message));
              promptUser();
              return;
            }

            bank.createAccount(
              result.accountType,
              result.name,
              result.number,
              parseFloat(result.balance)
            );
            promptUser();
          }
        );
        break;

      case 2:
        bank.displayAllAccounts();
        promptUser();
        break;

      case 3:
        prompt.get(["accountNumber"], function (err, result) {
          const accountNumber = result.accountNumber;
          const account = bank.searchAccount(accountNumber);
          if (!account) {
            console.log(error(`Account with number ${accountNumber} not found.`));
            promptUser();
            return;
          }
          console.log("What do you want to update?")
          console.log('Type 1 to Update name')
          console.log('Type 2 to update number')
          prompt.get(["input"], function (err, result) {
            if (result.input == 1) {
              prompt.get(['name'], function (err, result) {
                bank.updateAccount(accountNumber, { name: result.name });
                promptUser();
              })
            }

            if (result.input == 2) {
              prompt.get(['number'], function (err, result) {
                const existingAccountWithNumber = bank.searchAccount(result.number);
                if(existingAccountWithNumber){
                  console.log(error("Sorry, the number is taken. Choose a different one"));
                  promptUser();
                  return;
                }
                bank.updateAccount(accountNumber, { number: result.number });
                promptUser();
              })
            }
          })
        });
        break;

      case 4:
        console.log("Type the account number to delete");
        prompt.get(['number'], function(err, result) {
          bank.deleteAccount(result.number);
          promptUser();
        })
        break;

      case 5:
        // deposit
        console.log("Account number: ");
        prompt.get(['number'], function(err, result) {
          const accountNumber = result.number;
          const account = bank.searchAccount(accountNumber);
          if(!account) {
            console.log(error("Account not found"));
            promptUser();
          }
          prompt.get(['amount'], function(err, result) {
            bank.depositAmount(accountNumber, result.amount);
            promptUser();
          })
        })
        break;

      case 6:
        // withdraw
        console.log("Account number: ");
        prompt.get(['number'], function(err, result) {
          const accountNumber = result.number;
          const account = bank.searchAccount(accountNumber);
          if(!account) {
            console.log(error("Account not found"));
            promptUser();
          }
          
          prompt.get(['amount'], function(err, result) {
            if(bank.canWithdrawMoney(account)) {
              bank.withdrawAmount(accountNumber, result.amount);
              promptUser();
            }
          })
        })
        break;

      case 7:
        prompt.get(["accountNumber"], function (err, result) {
          bank.searchAccount(result.accountNumber);
          promptUser();
        });
        break;
      case 8:
        // If the user chooses to exit
        console.log("Exiting the application.");
        break;

      default:
        console.log("Invalid option. Please select a valid option.");
        promptUser();
        break;
    }
  });
}

promptUser();
