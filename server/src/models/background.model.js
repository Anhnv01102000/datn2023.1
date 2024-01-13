const mongoose = require('mongoose');

const backgroundSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide your name!'],
            trim: true,
        },
        image: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

const Background = mongoose.model('Background', backgroundSchema);
module.exports = Background;