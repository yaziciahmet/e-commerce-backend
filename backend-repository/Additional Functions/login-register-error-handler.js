
module.exports.handleError = (err) => {

    let errorArray = []
    console.log(err);

    // LOGIN ERRORS
    if(err == "Incorrect password"){
        errorArray.push("Incorrect password");
    }

    if(err == "Email not registered"){
        errorArray.push("Email not registered");
    }

    // REGISTER ERRORS
    if(err.code == 11000){
        errorArray.push('Email already registered');
    }

    if(err._message == 'User validation failed'){
        Object.values(err.errors).forEach(({ properties }) => {
            errorArray.push(properties.message);
        })
    }
    
    return errorArray;
}