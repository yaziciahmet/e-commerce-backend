const express = require('express');
const router = express.Router();

const logController = require('../Controllers/logController');

router.post('/login', logController.login); 
/*
FRONTEND SENDS TO BACKEND
{
    email: "xxx@mail.com",
    password: "123456abc"
}

BACKEND SENDS TO FRONTEND
if no error:
    {
        user_id: "...",
        user_name: "Ahmet"
    }
if error:
    {
        errors: []  # Array of error strings are returned
    }
*/


module.exports = router;