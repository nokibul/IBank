const { validAccountTypes } = require("./account.constant")

const isAccountTypeValid = (accountType) => {
    return validAccountTypes.includes(accountType)
}

const isOpeningBalanceValid = (openingAmount) => {
    return openingAmount < 1000
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

    if(isOpeningBalanceValid(userInput.balance)){
        response.message = 'Invalid opening balance. Opening balance must be atleast 1000$'
        response.success = false;
        return response;
    }
    
    return response
}


module.exports = {
    validateUserInput
}