const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please provide your name!'],
            trim: true,
        },
        image: {
            type: String,
            default: '',
        },
        email: {
            type: String,
            required: [true, 'Please provide your email!'],
            lowercase: true,
        },
        description: {
            type: String,
            default: 'Đây là mô tả của User',
        },
        role: {
            type: String,
            enum: ['Admin', 'User', 'Owner'],
            default: 'User',
        },
        password: {
            type: String,
            required: [true, 'Please provide your passsword!'],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const User = mongoose.model('User', userSchema);
module.exports = User;