const express = require('express');
const router = express.Router();

const productController = require('../Controllers/productController');

router.get('/all-products', productController.get_all_products);
/*
FRONTEND SENDS BACKEND nothing

BACKEND SENDS FRONTEND
[
    {
        _id: "...",
        name: "First 100 Words: A Padded Board Book",
        price: 4.98,
        image_path: "",
        count: 8,
        description: "Beloved child educator Roger Priddy's classic First 100 Words is now...",
        author: "Roger Priddy",
        category: "Children's Books",
        publisher: "Yapıkredi",
    },
    ...
] # Array of product objects
*/

router.get('/get-categories', productController.get_categories);
/*
FRONTEND SENDS BACKEND nothing

BACKEND SENDS FRONTEND
[
    "category1",
    "category2",
    ...
] # Array of strings
*/

router.get('/get-publishers', productController.get_publishers);
/*
FRONTEND SENDS BACKEND nothing

BACKEND SENDS FRONTEND
[
    "publisher1",
    "publihser2",
    ...
] # Array of strings
*/

router.get('/get-product/:id', productController.get_product); 
/*
FRONTEND SENDS BACKEND nothing

BACKEND SENDS FRONTEND
{
    _id: "...",
    name: "First 100 Words: A Padded Board Book",
    price: 4.98,
    image_path: "",
    count: 8,
    description: "Beloved child educator Roger Priddy's classic First 100 Words is now...",
    author: "Roger Priddy",
    category: "Children's Books",
    publisher: "Yapıkredi",
}
*/

router.post('/add-product', productController.add_product);
/*   * Product Manager* -> product ekle-çıkar, product sayısı arttır-azalt
FRONTEND SENDS BACKEND
{
    user_id: "...",
    name: "Harry Potter Azkaban",
    price: 10,
    image_path: "",
    count: 50,
    description: "The exciting adventures of the Harry Potter continues...",
    author: "J.K. Rowling",
    category: "Fiction",
    publisher: "Yapıkredi"
}
BACKEND SENDS FRONTEND
If no error:
    "Product Added" # Sending plain string
If error:
    { error: "message" }
*/


router.post('/update-product-count', productController.update_product_count);
/*
FRONTEND SENDS BACKEND
{
    user_id: "...",
    product_id: "...",
    count: 100
}
BACKEND SENDS FRONTEND
If no error:
    "Update successful."  # Sending plain string
If error:
    { error: "message" }
*/

router.post('/filter-products', productController.filter_products); 
/*
FRONTEND SENDS BACKEND
DEFAULT:
{
    category: "",
    price_range: [0,1000],
    min_star: 0, -- Don't send this yet 
    increasing_price: false,
    decreasing_price: false,
    increasing_star: false,  -- Don't send this yet 
    decreasing_star: false  -- Don't send this yet 
}
Change the values correspondingly according to do user inputs and filter selections
NOTE: For now do not implement star filtering because we don't have comments and stars model yet

BACKEND SENDS FRONTEND
[
    {
        _id: "...",
        name: "First 100 Words: A Padded Board Book",
        price: 4.98,
        image_path: "",
        count: 8,
        description: "Beloved child educator Roger Priddy's classic First 100 Words is now...",
        author: "Roger Priddy",
        category: "Children's Books",
        publisher: "Yapıkredi",
    },
    ...
] # Array of product objects
*/

router.post('/search-products', productController.search_products);
/*
FRONTEND SENDS BACKEND
{
    search_word: "Harry Potter"
}
BACKEND SENDS FRONTEND
[
    {
        _id: "...",
        name: "First 100 Words: A Padded Board Book",
        price: 4.98,
        image_path: "",
        count: 8,
        description: "Beloved child educator Roger Priddy's classic First 100 Words is now...",
        author: "Roger Priddy",
        category: "Children's Books",
        publisher: "Yapıkredi",
    },
    ...
] # Array of product objects
*/
router.post('/set-price', productController.set_price);
/*
FRONTEND SENDS BACKEND
{
    product:
    {
        id: " " //product-id
       new_price: number 
    }
    
}
BACKEND SENDS FRONTEND
[
    message=> "updated price!"
    ...
] 
*/
router.post('/apply-discount', productController.apply_discount);
/*
FRONTEND SENDS BACKEND
{
    productIdList:[ "..." ], //product-id array
    discount-ratio: 0.2
    
}
BACKEND SENDS FRONTEND
[
    message=> "added discount ratio!"
    ...
] 
*/


/*
 */

router.get('/get-editors-choices', productController.get_editors_choices);
module.exports = router;
