const express = require('express');
const router = express.Router();

const invoiceController = require('../Controllers/invoiceController');

router.post('/get-invoices-of-user', invoiceController.get_invoices_of_user);
/* Get shopping history of the user
FRONTEND SENDS BACKEND
{
    user_id: "..."
}
BACKEND SENDS FRONTEND
{
    "invoice_array": [
        {
            "invoice_id": "",
            "address": "",
            "date": "2021-06-05T13:42:00.000Z",
            "status": "on the way",    // received - preparing - on the way - delivered,
            "total_product_count": 5,
            "total_price": 100,
            "username": "",
            "products": [
                {
                    "count": 2,
                    "name": "",
                    "price": 4.98,
                    "image_path": "",
                    "product_id": "..."
                },
                ...
            ]
        },
        ...
    ]
}
*/
router.post('/change-order-status', invoiceController.change_order_status);
/*    *Product Manager* -> Delivery
FRONTEND SENDS BACKEND
{
    user_id: "...",
    invoice_id: "...",
    status: "..."  // pending - received - preparing - on the way - delivered - canceled
}
BACKEND SENDS FRONTEND
    "Status updated"   # Sending plain string
*/


router.post('/get-all-deliveries', invoiceController.get_all_deliveries);
/*  *Product Manager* -> Get all of the invoices
FRONTEND SENDS BACKEND
{
    user_id: "..." #id of the current user to check the role
}
BACKEND SEND FRONTEND
{
    "delivery_array": [
        {
            "invoice_id": "",
            "user_id": "...",
            "address": "",
            "date": "",
            "status": "delivered",
            "username": "",
            "total_product_count": 10,
            "total_price": 100,
            "products": [
                {
                    "count": 2,
                    "name": "First 100 Words: A Padded Board Book",
                    "price": 4.98,
                    "image_path": "",
                    "product_id": "..."
                },
                ... #More product can be in an invoice
            ]
        },
        ... 
    ]
}
*/




router.post('/filter-orders', invoiceController.filter_orders);
/*  *Product Manager* -> filtering is only done for status and date
FRONTEND SENDS BACKEND:
{
    filter_status: "..."  // pending - received - preparing - on the way - delivered # send empty status if it is not filtered
    begin_date: "2021-06-05T13:42:00.000Z",   # This is the Date Object
    end_date: "2021-06-05T13:42:00.000Z"
}
BACKEND SENDS FRONTEND:
{
    "delivery_array": [
        {
            "invoice_id": "",
            "user_id": "...",
            "address": "Istanbul Beylikdüzü Adnan Kahveci Neighbourhood",
            "date": "2021-06-05T13:42:00.000Z",
            "status": "delivered",
            "username": "",
            "total_product_count": 10,
            "total_price": 100,
            "products": [
                {
                    "count": 2,
                    "name": "First 100 Words: A Padded Board Book",
                    "price": 4.98,
                    "image_path": "",
                    "product_id": "..."
                },
                ... #More product can be in an invoice
            ]
        },
        ... #A user can have multiple invoices
    ]
}
*/

router.get('/get-revenue-graph', invoiceController.get_revenue_graph);
/*
FRONTEND DOES NOT SEND ANYTHING

BACKEND SENDS TO FRONTEND:
{
    "arr": [
        {
            "date": "2021-05-24T15:15:30.575Z",
            "revenue": 37.94
        },
        ...
    ]
}
NOTE: The last element's revenue in the array is the total revenue
*/
module.exports = router;