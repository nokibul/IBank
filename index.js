const prompt = require('prompt');
const { Bank } = require('./bank');
const { validateUserInput } = require('./account.validation');
const { error } = require('./colorize.logger');


const bank = new Bank();

function promptUser() {
  console.log('Select an option:');
  console.log('1. Create a new account');
  console.log('2. Display all accounts');
  console.log('3. Update an account');
  console.log('4. Delete an account');
  console.log('5. Deposit into your account');
  console.log('6. Withdraw from your account');
  console.log('7. Search an account');
  console.log('8. Exit');

  prompt.get(['option'], function (err, result) {
    const selectedOption = parseInt(result.option);

    switch (selectedOption) {
      case 1:
        prompt.get(['accountType', 'name', 'number', 'balance'], function (err, result) {
          const validationResponse = validateUserInput(result);
          if(!validationResponse.success){
            console.log(error(validationResponse.message));
            promptUser();
            return
          }

          bank.createAccount(result.accountType, result.name, result.number, parseFloat(result.balance));
          promptUser();
        });
        break;

      case 2:
        bank.displayAllAccounts();
        promptUser();
        break;

      case 3:
        // update an account
        bank.updateAccount();
        promptUser();
        break;

      case 4:
        promptUser();
        break;

      case 5:
        promptUser();
        break;

      case 6:
        promptUser();
        break;

      case 7:
        promptUser();
        break;

      case 8:
        // If the user chooses to exit
        console.log('Exiting the application.');
        break;

      default:
        console.log('Invalid option. Please select a valid option.');
        promptUser();
        break;
    }
  });
}

promptUser();
