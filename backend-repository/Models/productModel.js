const mongoose = require('mongoose')

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique:true
    },
    price:{
        type: Number,
        required: true,
    },
    image_path:{
        type: String,
        required: true,
    },
    count:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    author:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    publisher:{
        type: String,
        required: true
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    discount:{
        type: Number
    },
    unit_cost:{
        type: Number
    }
}, { timestamps:true });

productSchema.index({ name: 'text', author: 'text', publisher: 'text' });

module.exports = mongoose.model('Product',productSchema);