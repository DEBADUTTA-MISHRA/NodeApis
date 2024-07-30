const employeeService = require('../services/employeeService');
const responses = require('../helpers/response');
const messages = require('../constants/constantMessages');

const createEmployee = async (req, res) => {
    try {
        const result = await employeeService.createEmployee(req.body);
        if (result?.isDuplicateEmail) {
            return responses.failResponse(req, res, null, messages.duplicateEmail, 200);
        }
        return responses.successResponse(req, res, result, messages.createdSuccess, 201);
    } catch (error) {
        return responses.errorResponse(req, res, error);
    }
};

module.exports = {
    createEmployee
};
