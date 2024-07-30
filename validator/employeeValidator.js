const Joi = require('joi');
const responses = require('../helpers/response');
var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const createEmployeeValidator = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().trim().pattern(/^[0-9a-zA-Z ,/-]+$/).required().messages({
            "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).pattern(regularExpression).required(),
        organisation: Joi.string().required()
    });

    try {
        await schema.validateAsync(req.body);

        next();
        
    } catch (error) {
        return responses.errorResponse(req, res, error, 400);
    }
};

module.exports = {
    createEmployeeValidator
};
