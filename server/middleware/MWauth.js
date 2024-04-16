const {verify} = require("jsonwebtoken");

const validateTok = (request, response, next) => {
    const accessToken = request.header("accessToken")

    if (!accessToken) return response.json({error: "please login to comment"})

    try{
        const validToken = verify(accessToken, "secret");
        if(validToken){
            return next();
        }
    }
    catch (error){
        return response.json({error: error})
    }
};

module.exports = {validateTok};