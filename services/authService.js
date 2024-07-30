const Employee = require('../models/employeeModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (email, password, otp) => {
    const employee = await Employee.findOne({ email });
    if (!employee) {
        return null;
    }

    // Check OTP if provided
    if (otp) {
        if (employee.otp !== otp || employee.otpExpiration < new Date()) {
            return null;
        }

        // Clear OTP after successful verification
        employee.otp = null;
        employee.otpExpiration = null;
        await employee.save();
    }

    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) {
        return null;
    }

    const token = jwt.sign({ _id: employee._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token };
};

module.exports = {
    login
};
