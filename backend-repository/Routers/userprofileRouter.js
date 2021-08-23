const express = require('express');
const router = express.Router();

const userprofileController = require('../Controllers/userprofileController');

router.post('/user-profile', userprofileController.user_profile); 
/* 
FRONTEND SENDS TO BACKEND
{
    user_id: "..."
}
BACKEND SENDS TO FRONTEND
{
    user: {
        email: "",
        password: "",
        name: "",
        surname: "",
        phone_number: "",
        address: ""
    }
}
*/

router.post('/update-profile/password', userprofileController.update_password);
/* 
FRONTEND SENDS TO BACKEND
{
    user_id: "...",
    old_pass: "",
    new_pass: ""
}
BACKEND SENDS TO FRONTEND
if no error:
    "Successfull!" # Sending plain string 
if error:
    {
        errors: [] # Array of error strings
    }
*/

router.post('/update-profile/:attribute', userprofileController.update_profile); // value
/* 
FRONTEND SENDS TO BACKEND
{
    user_id: "...",
    value: "..."
}
BACKEND SENDS TO FRONTEND
if no error:
    "Successfull!" # Sending plain string 
if error:
    {
        errors: [] # Array of error strings
    }
*/


module.exports = router;