const {verify} = require("jsonwebtoken");

const validateTok = (request, response, next) => {
    const accessToken = request.header("accessToken")

    if (!accessToken) return response.json({error: "please login"})

    try{
        const validToken = verify(accessToken, "secret");
        request.user = validToken;
        if(validToken){
            return next();
        }
    }
    catch (error){
        return response.json({error: error})
    }
};

module.exports = {validateTok};