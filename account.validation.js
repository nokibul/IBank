const { validAccountTypes } = require("./account.constant")

const isAccountTypeValid = (accountType) => {
    return validAccountTypes.includes(accountType)
}

const isOpeningBalanceValid = (openingAmount) => {
    return openingAmount >= 1000
}

const isValidNumber = (number) =>{
    if(isNaN(number)) {
        return false
    }
    return true
}

const validateUserInput = (userInput) => {
    const response = {
        success: true,
        message: ''
    }

    if(!isAccountTypeValid(userInput.accountType)){
        response.message = `Invalid account type. Account type must be one of : ${validAccountTypes}`;
        response.success = false;
        return response;
    }

    if(!isValidNumber(userInput.number)){
        response.message = 'Invalid account number. Account number must be valid number'
        response.success = false;
        return response
    }
    
    if(!isValidNumber(userInput.balance)) {
        response.message = 'Invalid balance. Balance must be a valid number'
        response.success = false;
        return response;
    }
    if(isValidNumber(userInput.balance) && !isOpeningBalanceValid(userInput.balance)){
        response.message = 'Invalid opening balance. Opening balance must be atleast 1000$'
        response.success = false;
        return response;
    }

    return response
}


module.exports = {
    validateUserInput
}