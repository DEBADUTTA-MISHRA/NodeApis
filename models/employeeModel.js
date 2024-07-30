const mongoose = require('mongoose');
const validator = require('validator');

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            index: true
        },
        email: {
            type: String,
            validate: {
                validator: validator.isEmail,
                message: "{VALUE} is not a valid email",
            },
            required: true,
            index: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        organisation: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true
        },
        otp: {
            type: String,
            default: null
        },
        otpExpiration: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
