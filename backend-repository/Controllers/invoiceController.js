const userModel = require('../Models/userModel');
const invoiceModel = require('../Models/invoiceModel');
const productModel = require('../Models/productModel');



module.exports.get_invoices_of_user = async(req,res) => {

    try{
        const user_id = req.body.user_id;

        const user = await userModel.findById(user_id);

        const invoice_ids = user.invoices;

        let invoice_array = []

        let total_product_count = 0;

        let total_price = 0;

        for(let i = invoice_ids.length - 1; i >= 0; i--){

            total_product_count = 0;
            total_price = 0;
            
            const invoice = await invoiceModel.findById(invoice_ids[i]);
            
            const invoiceObj = new Object;

            invoiceObj.invoice_id = invoice_ids[i];
            invoiceObj.address = invoice.address;
            invoiceObj.date = invoice.date;
            invoiceObj.status = invoice.status;
            invoiceObj.username = user.name + ' ' + user.surname;

            const products = invoice.products;
            let products_array = [];

            for(let j = 0; j < products.length; j++){

                const product = products[j];

                const curr_product = await productModel.findById(product.product);
                
                const productObj = new Object;

                productObj.count = product.count;
                productObj.name = curr_product.name;
                productObj.price = curr_product.price * (1 - curr_product.discount);
                productObj.image_path = curr_product.image_path;
                productObj.product_id = product.product;

                total_product_count += product.count;
                total_price += product.count * curr_product.price * (1 - curr_product.discount);

                products_array.push(productObj);
            }

            invoiceObj.products = products_array;
            invoiceObj.total_product_count = total_product_count;
            invoiceObj.total_price = total_price;
            invoice_array.push(invoiceObj)
        }

        res.json({ invoice_array });
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
    
};




module.exports.get_all_deliveries = async(req,res) => {
    //  product name, product img,  product count, product price
    try{
        const user_id = req.body.user_id;
        const user = await userModel.findById(user_id);

        if(user.role.toLowerCase() == "product manager"){

            const invoices = await invoiceModel.find();

            let delivery_array = []
            
            let total_product_count = 0;
            let total_price = 0;

            for(let i = 0; i < invoices.length; i++){
                
                total_product_count = 0;
                total_price = 0;
                
                const invoice = invoices[i];
                const invoiceObj = new Object;
                const user = await userModel.findById(invoice.user_id);

                invoiceObj.invoice_id = invoice._id;
                invoiceObj.user_id = invoice.user_id;
                invoiceObj.address = invoice.address;
                invoiceObj.date = invoice.date;
                invoiceObj.status = invoice.status;
                invoiceObj.username = user.name + " " + user.surname;

                const products = invoice.products;
                let products_array = [];

                for(let j = 0; j < products.length; j++){

                    const product = products[j];

                    const curr_product = await productModel.findById(product.product);
                    
                    const productObj = new Object;

                    productObj.count = product.count;
                    productObj.name = curr_product.name;
                    productObj.price = curr_product.price;
                    productObj.image_path = curr_product.image_path;
                    productObj.product_id = product.product;

                    total_product_count += product.count;
                    total_price += product.count * curr_product.price;
                    products_array.push(productObj);
                }

                invoiceObj.total_product_count = total_product_count;
                invoiceObj.total_price = total_price;
                invoiceObj.products = products_array;
                delivery_array.push(invoiceObj)
            }

            res.json({ delivery_array });
        }
        else{
            throw({ error: user.role + " cannot check the deliveries." })
        }
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
};





module.exports.change_order_status = async(req,res) => {

    try{

        const { invoice_id, status } = req.body;

        await invoiceModel.findByIdAndUpdate(invoice_id, { status }, { useFindAndModify: false });

        res.send('Status updated');
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
    
};

/*
{
    "delivery_array": [
        {
            "invoice_id": "6093f22ae3e08a1980a931e5",
            "user_id": "...",
            "address": "Istanbul Beylikdüzü Adnan Kahveci Neighbourhood",
            "date": "2021-06-05T13:42:00.000Z",
            "status": "delivered",
            "username": "Ahmet Yazıcı",
            "total_product_count": 10,
            "total_price": 100,
            "products": [
                {
                    "count": 2,
                    "name": "First 100 Words: A Padded Board Book",
                    "price": 4.98,
                    "image_path": "https://productimagescs308.s3.us-east-2.amazonaws.com/firstwords.jpeg",
                    "product_id": "..."
                },
                ... #More product can be in an invoice
            ]
        },
        ... #A user can have multiple invoices
    ]
}
*/

module.exports.filter_orders = async(req,res) => {
    
    try{
        const { filter_status, begin_date, end_date } = req.body;
        
        if(filter_status != ""){
            const invoices = await invoiceModel.find({ status: filter_status, date: { $gte: begin_date, $lte: end_date } });
            let delivery_array = []
            
            let total_product_count = 0;
            let total_price = 0;

            for(let i = 0; i < invoices.length; i++){
                
                total_product_count = 0;
                total_price = 0;

                const invoice = invoices[i];
                const invoiceObj = new Object;
                const user = await userModel.findById(invoice.user_id);

                invoiceObj.invoice_id = invoice._id;
                invoiceObj.user_id = invoice.user_id;
                invoiceObj.address = invoice.address;
                invoiceObj.date = invoice.date;
                invoiceObj.status = invoice.status;
                invoiceObj.username = user.name + " " + user.surname;

                const products = invoice.products;
                let products_array = [];

                for(let j = 0; j < products.length; j++){

                    const product = products[j];

                    const curr_product = await productModel.findById(product.product);
                    
                    const productObj = new Object;

                    productObj.count = product.count;
                    productObj.name = curr_product.name;
                    productObj.price = curr_product.price;
                    productObj.image_path = curr_product.image_path;
                    productObj.product_id = product.product;

                    total_product_count += product.count;
                    total_price += product.count * curr_product.price;
                    products_array.push(productObj);
                }

                invoiceObj.total_product_count = total_product_count;
                invoiceObj.total_price = total_price;
                invoiceObj.products = products_array;
                delivery_array.push(invoiceObj)
            }

            res.json({ delivery_array });
        }
        else{
            const invoices = await invoiceModel.find({ date: { $gte: begin_date, $lte: end_date } });
            let delivery_array = []
            
            let total_product_count = 0;
            let total_price = 0;

            for(let i = 0; i < invoices.length; i++){
                
                total_product_count = 0;
                total_price = 0;

                const invoice = invoices[i];
                const invoiceObj = new Object;
                const user = await userModel.findById(invoice.user_id);

                invoiceObj.invoice_id = invoice._id;
                invoiceObj.user_id = invoice.user_id;
                invoiceObj.address = invoice.address;
                invoiceObj.date = invoice.date;
                invoiceObj.status = invoice.status;
                invoiceObj.username = user.name + " " + user.surname;

                const products = invoice.products;
                let products_array = [];

                for(let j = 0; j < products.length; j++){

                    const product = products[j];

                    const curr_product = await productModel.findById(product.product);
                    
                    const productObj = new Object;

                    productObj.count = product.count;
                    productObj.name = curr_product.name;
                    productObj.price = curr_product.price;
                    productObj.image_path = curr_product.image_path;
                    productObj.product_id = product.product;

                    total_product_count += product.count;
                    total_price += product.count * curr_product.price;
                    products_array.push(productObj);
                }

                invoiceObj.total_product_count = total_product_count;
                invoiceObj.total_price = total_price;
                invoiceObj.products = products_array;
                delivery_array.push(invoiceObj)
            }

            res.json({ delivery_array });
        }
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
};



module.exports.get_revenue_graph = async(req,res) => {

    try{
        const invoices = await invoiceModel.find();
        let total_revenue = 0;
        let arr = [];
        for(let i = 0; i < invoices.length; i++){
            
            const invoice = invoices[i];
            let obj = new Object;

            obj.date = invoice.date;

            let curr_invoice_revenue = 0;
            for(let j = 0; j < invoice.products.length; j++){
                
                const product = await productModel.findById(invoice.products[j].product);
                curr_invoice_revenue += product.price * invoice.products[j].count;
            }
            total_revenue += curr_invoice_revenue;
            obj.revenue = total_revenue;
            arr.push(obj)
        }
        
        res.json({arr});
    }
    catch(err){
        if(err){
            console.log(err);
            res.json(err);
        }
    }
};