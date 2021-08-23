const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({

    product_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product'
        
    },
    user_id: {
        type: String
    },
    username: {
        type: String
    },
    rating:{
        type: Number
    },

    message: {
        type: String
    },
    approved: Boolean

});

module.exports = mongoose.model('Comment', commentSchema);