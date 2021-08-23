const emailValidator = require('email-validator');
const validatePhoneNumber = require('validate-phone-number-node-js');


module.exports.isEmailValid = (email) => {
    return emailValidator.validate(email);
};


module.exports.isPasswordStrong = (password) => {

    let lowercaseExist = false;
    let uppercaseExist = false;
    let numberExist = false;

    for(let i = 0; i < password.length; i++){
        if('a' <= password[i] && 'z' >= password[i]){
            lowercaseExist = true;
        }
        else if('A' <= password[i] && 'Z' >= password[i]){
            uppercaseExist = true;
        }
        else if('0' <= password[i] && '9' >= password[i]){
            numberExist = true;
        }
    }

    return lowercaseExist && uppercaseExist && numberExist;
};



module.exports.isPhoneNumberValid = (phoneNumber) => {

    return validatePhoneNumber.validate(phoneNumber);    
};