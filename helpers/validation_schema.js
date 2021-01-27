//Backend Validation for schemas before POSTING to our database
const Joi = require("@hapi/joi")

//For validation authentication requests (signup/login)
const authSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    passWord: Joi.string().min(6).required()  //we can add a regex pattern for more secure passwords (TBD)
})


//any additional schemas added must be exported as objects below
module.exports = {
    authSchema
}