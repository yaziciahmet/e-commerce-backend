const mongoose = require('mongoose');

const invoiceSchema = mongoose.Schema({
    
    user_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product'
        },
        count: Number 
    }],
    address: String,
    date: Date,
    status: String
});

module.exports = mongoose.model('Invoice', invoiceSchema);



