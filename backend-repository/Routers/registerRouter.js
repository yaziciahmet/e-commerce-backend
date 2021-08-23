const express = require('express');
const router = express.Router();

const registerController = require('../Controllers/registerController');

router.post('/register', registerController.register); 
/*
FRONTEND SENDS TO BACKEND
{
    email: "xxx@mail.com",
    password: "123456abc",
    name: "Ahmet",
    surname: "Yazıcı",
    phone_number: "05054413204",
    address: "America Mahallesi, Uzay Caddesi"    
}

BACKEND SENDS TO FRONTEND
if no error:
    {
        user_id: "...",
        user_name: "Ahmet",
        role: "Product Manager"
    }
if error:
    {
        errors: []  # Array of error strings are returned
    }
*/

module.exports = router;