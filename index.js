const prompt = require('prompt');
const { Bank } = require('./bank');

const bank = new Bank();

function promptUser() {
  prompt.start();

  prompt.get(['accountType', 'name', 'number', 'balance'], function (err, result) {
    bank.createAccount(result.accountType, result.name, result.number, parseFloat(result.balance));
    promptUser();
  });
}

promptUser();
