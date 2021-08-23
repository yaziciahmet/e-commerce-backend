const express = require('express');
const router = express.Router();

const basketController = require('../Controllers/basketController');

router.post('/basket',basketController.view_basket);
/*
FRONTEND SENDS BACKEND
{
    user_id: "..."
}
BACKEND SENDS FRONTEND
{
    products: [
        {
            _id: "",
            count : 2,
            image_path: "...",
            name: "book name",
            author: "book author",
            price: 10 # total price of a single book is written here, meaning count * unitprice = 2 * 5 for example
        },
        ...
    ],
    total_price: 150 # total price of all the books written here
} # Array of product objects
*/

router.post('/add-to-basket', basketController.add_to_basket); 
/*
FRONTEND SENDS BACKEND
{
    user_id: "...",
    product_id: "...",
    count: 10
}
BACKEND SENDS FRONTEND
    "Product added to basket!"  # Sending plain string
*/

router.post('/remove-from-basket',basketController.remove_from_basket);
/*
Removing is done 1 by 1
FRONTEND SENDS BACKEND
{
    user_id: "...",
    product_id: "..."
}
BACKEND SENDS FRONTEND
    "Removed Product!"  # Sending plain string
*/

router.post('/checkout',basketController.checkout);
/*
FRONTEND SENDS BACKEND
{
    user_id: "...",
    new_address: "..." # if user entered another addres, if not dont send anything or send empty
}
BACKEND SENDS FRONTEND
    "Cleared Basket!"   # Sending plain string
*/


module.exports = router;