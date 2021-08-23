const basketModel = require('../Models/basketModel');
const userModel = require('../Models/userModel');
const invoiceModel = require('../Models/invoiceModel');
const productModel = require('../Models/productModel');


module.exports.view_basket = async(req,res) => {

    try{
        const user_id = req.body.user_id;

        const user = await userModel.findById(user_id);
        const basket_id = user.basket;
        const basket = await basketModel.findById(basket_id);
        
        let returnProducts = new Array;
        let count = 0;
        let total_price = 0;
        
        (basket.products).forEach(async (item) => {
            let productInfo = new Object;
            
            const product = await productModel.findById(item.product);
            
            productInfo._id = item.product;
            productInfo.count = item.count;
            productInfo.image_path = product.image_path;
            productInfo.name = product.name;
            productInfo.author = product.author;
            productInfo.price = product.price * item.count * (1 - product.discount);

            total_price += productInfo.price;
            
            returnProducts.push(productInfo);
            count += 1;
            
            if(count == basket.products.length){
                res.json({ products: returnProducts, total_price });
            }
        });

        if(basket.products.length == 0){
            res.json({ products: [], total_price: 0 });
        }
    }
    catch(err){
        console.log(err);
        if(err){
            res.json(err);
        }
    }
}





module.exports.add_to_basket = async(req,res) => {

    try{
        const user_id = req.body.user_id;
        const product_id = req.body.product_id;
        const count = req.body.count;

        const user = await userModel.findById(user_id);
        const basket_id = user.basket;

        const found = await basketModel.findOneAndUpdate({ _id: basket_id, 'products.product': product_id }, { $inc: { 'products.$.count': count } }, { useFindAndModify: false });
        
        if(found == null){
            
            await basketModel.findByIdAndUpdate(basket_id, { $push: { products: { product: product_id, count: count } } }, { useFindAndModify: false });
        }

        res.send("Product added to basket!")
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
}






module.exports.remove_from_basket = async(req,res) => {
    
    try{
        const user_id = req.body.user_id;
        const product_id = req.body.product_id;

        const user = await userModel.findById(user_id);
        const basket_id = user.basket;

        await basketModel.updateOne({ _id: basket_id, 'products.product': product_id }, { $inc: { 'products.$.count': -1 } });
        
        await basketModel.updateOne({ _id: basket_id, 'products.product': product_id }, { $pull: { products: { product: product_id, count: 0 } } }, { useFindAndModify: false });
        
        res.send("Removed Product!")
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }

}




module.exports.checkout = async(req,res) => {

    try{
        const user_id = req.body.user_id;
        const new_address = req.body.new_address;

        const user = await userModel.findById(user_id);
        const basket_id = user.basket;

        const basket = await basketModel.findById(basket_id);

        (basket.products).forEach(async (product) => {
            
            await productModel.findByIdAndUpdate(product.product, { $inc: { count: -1 * product.count } }, { useFindAndModify: false });
        });

        let today = new Date();
        let invoice;

        if(new_address == "" || new_address == null || new_address == undefined){
             invoice = await invoiceModel.create({ user_id, products: basket.products, address: user.address, date: today, status: "pending" });
        }
        else{
            invoice = await invoiceModel.create({ user_id, products: basket.products, address: new_address, date: today, status: "pending" });
        }
        
        
        await userModel.findByIdAndUpdate(user_id, { $push: { invoices: invoice } }, { useFindAndModify: false });
        await basketModel.findByIdAndUpdate(basket_id, { products: [] }, { useFindAndModify: false });

        res.send("Cleared Basket!");    
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }

}