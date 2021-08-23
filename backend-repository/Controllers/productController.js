const productModel = require('../Models/productModel');
const userModel = require('../Models/userModel');



module.exports.get_all_products = async(req, res) => {

    try{
        const products = await productModel.find();

        res.json(products);
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
};



module.exports.get_product = async(req, res) => {

    try{
        const product_id = req.params.id;
        const product = await productModel.findById(product_id);

        res.json(product);
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
};


module.exports.add_product = async(req, res) => {

    try{
        const user_id = req.body.user_id;
        const user = await userModel.findById(user_id);

        if(user.role.toLowerCase() == "product manager"){
            const { name, price, image_path, count, description, author, category, publisher } = req.body;

            await productModel.create({ name, price, image_path, count, description, author, category, publisher, comments: [] });
        
            res.send('Product Added');
        }
        else{
            throw({ error: user.role + " cannot add or update product(s)." })
        }
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
};



module.exports.update_product_count = async(req, res) => {

    try{
        const { user_id, product_id, count } = req.body;

        const user = await userModel.findById(user_id);

        if(user.role.toLowerCase() == "product manager"){
            await productModel.findByIdAndUpdate(product_id, { count }, { useFindAndModify: false });
            res.send("Update successful.")
        }
        else{
            throw({ error: user.role + " cannot add or update product(s)." })
        }
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
    
};



module.exports.filter_products = async(req, res) => {

    try{
        const { category, price_range, increasing_price, decreasing_price, publisher } = req.body;
        let filteredProducts = new Object;
        
        if(category != ""){
            if(increasing_price){
                if(publisher == ""){
                    filteredProducts = await productModel.find({ category, price: { $gte: price_range[0], $lte: price_range[1] } }).sort({ price: 'asc' });
                }
                else{
                    filteredProducts = await productModel.find({ category, publisher, price: { $gte: price_range[0], $lte: price_range[1] } }).sort({ price: 'asc' });
                }
            }
            else if(decreasing_price){
                if(publisher == ""){
                    filteredProducts = await productModel.find({ category, price: { $gte: price_range[0], $lte: price_range[1] } }).sort({ price: 'desc' });
                }
                else{
                    filteredProducts = await productModel.find({ category, publisher, price: { $gte: price_range[0], $lte: price_range[1] } }).sort({ price: 'desc' });
                }
            }
            else{
                if(publisher == ""){
                    filteredProducts = await productModel.find({ category, price: { $gte: price_range[0], $lte: price_range[1] } })
                }
                else{
                    filteredProducts = await productModel.find({ category, publisher, price: { $gte: price_range[0], $lte: price_range[1] } })
                }
            }
        }
        else{
            if(increasing_price){
                if(publisher == ""){
                    filteredProducts = await productModel.find({ price: { $gte: price_range[0], $lte: price_range[1] } }).sort({ price: 'asc' });
                }
                else{
                    filteredProducts = await productModel.find({ publisher, price: { $gte: price_range[0], $lte: price_range[1] } }).sort({ price: 'asc' });
                }
            }
            else if(decreasing_price){
                if(publisher == ""){
                    filteredProducts = await productModel.find({ price: { $gte: price_range[0], $lte: price_range[1] } }).sort({ price: 'desc' });
                }
                else{
                    filteredProducts = await productModel.find({ publisher, price: { $gte: price_range[0], $lte: price_range[1] } }).sort({ price: 'desc' });
                }
            }
            else{
                if(publisher == ""){
                    filteredProducts = await productModel.find({ price: { $gte: price_range[0], $lte: price_range[1] } })
                }
                else{
                    filteredProducts = await productModel.find({ publisher, price: { $gte: price_range[0], $lte: price_range[1] } })
                }
            }
        }
        res.json(filteredProducts);
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
};

module.exports.get_publishers = async(req,res) => {

    try{
        const publishers = await productModel.find().distinct('publisher');
        res.json(publishers);
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
}

// name - author - publisher 
module.exports.search_products = async(req, res) => {
    
    try{
        const search_word = req.body.search_word;

        const searchProducts = await productModel.find({ $text: { $search: search_word } });

        res.json(searchProducts);
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
};





module.exports.get_categories = async(req,res) => {
    
    try{
        const categories = await productModel.find().distinct('category');
        res.json(categories);
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
    
};

module.exports.set_price= async(req,res)=> {
    try{
        const { product } = req.body;
        
        await productModel.findByIdAndUpdate(product.id, { price: product.new_price }, { useFindAndModify: false });
        
        res.send("updated price!");
    }
    catch(err){
        res.json(err);
    }
    
}

module.exports.apply_discount= async(req,res)=> {
    try{
        const { productIdList, discount_ratio } = req.body;
        for(let i=0; i < productIdList.length; i++){
            let productId = productIdList[i]
            await productModel.findByIdAndUpdate(productId, { discount: discount_ratio }, { useFindAndModify: false });
        }
        res.send("added discount ratio!")
    }
    catch(err){
        res.json(err);
    }
    
}

module.exports.xxx= async(req,res)=> {

    const products = await productModel.find();
    let sum = 0;
    for(let i=0; i<products.length; i++){
        sum+= products[i].unit_cost*products[i].count;
    }
    console.log(sum);
    const user = await userModel.findById("60831b9ff18bd95ed15f40ef");
    res.json(user);
}




module.exports.get_editors_choices = async(req,res) => {

    try{
        const product1 = await productModel.findById("608333074aef8e1fd0e975f7");
        const product2 = await productModel.findById("608335774aef8e1fd0e975fa");
        const product3 = await productModel.findById("608335d14aef8e1fd0e975fb");
        const product4 = await productModel.findById("608336014aef8e1fd0e975fc");
        const product5 = await productModel.findById("6083365d69c6ae6155c64a83");
        const product6 = await productModel.findById("608335d14aef8e1fd0e975fb");
        const product7 = await productModel.findById("608337624aef8e1fd0e975fe");

        let productArray = [];
        
        productArray.push(product1);
        productArray.push(product2);
        productArray.push(product3);
        productArray.push(product4);
        productArray.push(product5);
        productArray.push(product6);
        productArray.push(product7);

        
        res.json(productArray);
    }
    catch(err){
        if(err){
            res.json(err);
            console.log(err);
        }
    }
}