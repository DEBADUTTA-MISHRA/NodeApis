const Employee = require('../models/employeeModel');
const bcrypt = require('bcrypt');

const createEmployee = async (data) => {
    const emailExists = await Employee.findOne({ email: data.email });
    if (emailExists) {
        return { isDuplicateEmail: true };
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newEmployee = new Employee({ ...data, password: hashedPassword });
    const result = await newEmployee.save();
    return result;
};

module.exports = {
    createEmployee
};
