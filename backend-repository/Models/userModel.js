const mongoose = require('mongoose');
const validators = require('../Additional Functions/validators')

const userSchema = mongoose.Schema({
   
    email: {
        type: String,
        required: [true, "Email can not be empty"],
        unique: true,
        validate: {
            validator: validators.isEmailValid,
            message: "Email is not valid"
        }
    },
    password: {
        type: String,
        required: [true, "Password can not be empty"],
        minlength: [7, "Password can not be shorter than 7 characters"],
        validate: {
            validator: validators.isPasswordStrong,
            message: "Password must contain lowercase, uppercase character and a number"
        }
    },
    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    surname: {
        type: String,
        required: [true, "Please enter your surname"]
    },
    phone_number: { 
        type: String,
        required: [true, "Please enter your phone number"],
        validate: {
            validator: validators.isPhoneNumberValid,
            message: "Phone number is not valid"
        }
    },
    address: { 
        type: String,
        required: [true, "Please enter your address"]
    },
    role: String,
    basket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Basket'
    },
    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice'
    }]
    
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);