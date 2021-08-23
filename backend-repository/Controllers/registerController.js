const userModel = require('../Models/userModel');
const basketModel = require('../Models/basketModel');
const { handleError } = require('../Additional Functions/login-register-error-handler');


module.exports.register = async(req,res) => {

    try{
        let { email, password, name, surname, phone_number, address, role } = req.body;

        if(!role){
            role = "Customer";
        }

        const user = await userModel.create({ email, password, name, surname, phone_number, address, role, invoices: [] });

        const basket = await basketModel.create({ user });

        await userModel.findByIdAndUpdate(user._id, { basket }, { useFindAndModify: false });

        res.json({ user_id: user._id, user_name: user.name, role: user.role });
    }
    catch(err){
        const errors = handleError(err);
        res.json({ errors });
    }
}