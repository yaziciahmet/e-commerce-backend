const userModel = require('../Models/userModel');
const validators = require('../Additional Functions/validators')

module.exports.user_profile = async(req,res) => {

     
    try{
        const user_id = req.body.user_id;

        const user = await userModel.findById(user_id);
        res.json({ user });

    }
    catch(err){
        res.json(err);
        
    }
    
}

module.exports.update_profile = async(req,res) => {
    try{
        const user_id = req.body.user_id;

        const attribute = req.params.attribute;
        const value = req.body.value;

        if(value != "")
        {

            if(attribute == "name"){
                
                await userModel.findByIdAndUpdate(user_id, { name: value }, { useFindAndModify: false });
                
            }
            else if(attribute=="surname"){
                await userModel.findByIdAndUpdate(user_id, { surname: value }, { useFindAndModify: false });
            
            }
            else if(attribute == "phone_number"){

                if(validators.isPhoneNumberValid(value)){
                    await userModel.findByIdAndUpdate(user_id, { phone_number: value }, { useFindAndModify: false });
                }
                else{
                    res.json({ errors: ["Please enter a valid phone number"] })
                }
                
            }
            else if(attribute == "address"){
                await userModel.findByIdAndUpdate(user_id, { address: value }, { useFindAndModify: false });
                
            }

            res.send("Successful!")
        }
        else{
            res.json({ errors: [attribute + " cannot be empty! Please enter your " + attribute] })
        }
    } 
    catch(err){
        res.json(err)
    }  

}

module.exports.update_password = async(req,res) => {

    try{
        const user_id = req.body.user_id;

        const new_pass = req.body.new_pass;
        const old_pass = req.body.old_pass;

        const user = await userModel.findById(user_id);

        if(old_pass == user.password){

            if(new_pass.length >= 7){

                
                if(validators.isPasswordStrong(new_pass)){

                    await userModel.findByIdAndUpdate(user_id,{ password: new_pass }, { useFindAndModify: false });

                    res.send("Successful!");

                }else{
                    res.json({ errors: ["Password must contain lowercase, uppercase character and a number"] });
                }

            }else{
                res.json({ errors: ["Password cannot be shorter than 7 characters!"] });
            }

        }else{
            res.json({ errors: ["Password does not match existing password!"] });
        }

        
    } catch(err){
        res.json(err)
    }  
}
