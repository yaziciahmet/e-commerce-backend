const mongoose = require('mongoose')

const basketSchema = mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product'
        },
        count: Number 
    }]
});


module.exports = mongoose.model('Basket', basketSchema);