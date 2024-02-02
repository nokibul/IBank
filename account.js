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

module.exports = {
    CurrentAccount,
    SavingsAccount,
    SalaryAccount
};