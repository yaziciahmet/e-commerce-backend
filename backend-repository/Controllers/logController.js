const userModel = require('../Models/userModel');
const { handleError } = require('../Additional Functions/login-register-error-handler');


module.exports.login = async(req,res) => {
    
    try{
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });

        if(user){

            if(password == user.password){
                res.json({ user_id: user._id, user_name: user.name, role: user.role });
            }
            else{
                throw("Incorrect password");
            }
        }
        else{
            throw("Email not registered");
        }
    }
    catch(err){
        const errors = handleError(err);
        res.json({ errors });
    }
    
}

