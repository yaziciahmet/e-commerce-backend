const userModel = require('../Models/userModel');
const productModel = require('../Models/productModel');
const commentModel = require('../Models/commentModel');

module.exports.get_comments = async(req,res) => {

    try{

        const product_id = req.body.product_id;
        const product = await productModel.findById(product_id);

        const comments = product.comments;
        let comment_array = [];

        for(let i = 0; i < comments.length; i++){
            const comment = await commentModel.findById(comments[i]);
            if(comment.approved){
                let comment_info = new Object;
                const { username, user_id, rating, message, _id } = comment;
                comment_info.username = username;
                comment_info.user_id = user_id;
                comment_info.rating = rating;
                comment_info.message = message;
                comment_info.comment_id= _id;
                comment_array.push(comment_info);
            }
        }
        res.json({ comment_array });
    }
    
    catch(err){
        if(err){
            res.json(err);
        }
    }
}

module.exports.add_comment = async(req,res) => {

    try{

        const { product_id, user_id, rating, message } = req.body;
        const user = await userModel.findById(user_id);
        const username = user.name + " " + user.surname;

        const comment = await commentModel.create({ product_id, username, user_id, rating, message, approved: false });

        await productModel.findByIdAndUpdate(product_id, { $push: { comments: comment } },{ useFindAndModify: false });

        res.send("Added comment.");

    }
    
    catch(err){
        if(err){
            res.json(err);
        }
    }

}

module.exports.delete_comment = async(req,res) => {

    try{

        const { product_id, comment_id } = req.body;
        await productModel.findByIdAndUpdate(product_id, { $pull: { comments: comment_id } },{ useFindAndModify: false });
        await commentModel.findByIdAndDelete(comment_id, { useFindAndModify: false });

        res.send("Deleted comment.");
    }
    
    catch(err){
        if(err){
            res.json(err);
        }
    }
}



module.exports.update_comment_status = async(req,res) => {
    
    try{
        const { user_id, comment_id, approved } = req.body;
        const user = await userModel.findById(user_id);

        if(user.role.toLowerCase() == "product manager"){

            if(approved){
                await commentModel.findByIdAndUpdate(comment_id, { approved: true }, { useFindAndModify: false });
            }
            else{
                const comment = await commentModel.findById(comment_id);
                await productModel.findByIdAndUpdate(comment.product_id, { $pull: { comments: comment_id } },{ useFindAndModify: false });
                await commentModel.findByIdAndRemove(comment_id, { useFindAndModify: false });
            }
            res.send("Comment status updated successfully.");
        }
        else{
            throw({ error: user.role + " cannot update comment status." })
        }
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }
    
};



module.exports.get_pending_comments = async(req,res) => {

    try{
        const user_id = req.body.user_id;
        const user = await userModel.findById(user_id);

        if(user.role.toLowerCase() == "product manager"){
            const comments = await commentModel.find({ approved: false });
            res.json(comments);
        }
        else{
            throw({ error: user.role + " cannot update comment status." })
        }
    }
    catch(err){
        if(err){
            res.json(err);
        }
    }    
}
