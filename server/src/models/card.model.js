const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: 'Untitled',
            required: [true, 'Please provide your name!'],
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            default: 0
        },
        creator: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
        objects: {
            type: [Object],
            default: [],
        },
        numberLike: {
            type: Number,
            default: 0,
        },
        userLike: {
            type: Array,
            default: [],
        },
        thumbnail: String,
        role: {
            type: String,
            default: 'Public',
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// cardSchema.index({ name: 'text' });

// middleware on CREATING new design
// cardSchema.pre('save', async function (next) {
//     if (!this.isNew) {
//         return next();
//     }
//     next();
// });


const Card = mongoose.model('Card', cardSchema);
module.exports = Card;
