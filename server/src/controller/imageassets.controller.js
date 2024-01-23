const User = require('../models/user.model');
const ImageAsset = require('../models/imageassets.model');

const creatImageAsset = async (req, res) => {
    const email = req.body.email
    const imageUrl = req.body.imageUrl
    const filename = req.body.filename

    const checkEmail = await User.find({ email });
    if (checkEmail.length > 0) {

        const createImageAsset = await ImageAsset.create({
            user: checkEmail[0].id,
            name: filename,
            image: imageUrl
        });
        // console.log("createImageAsset: ", createImageAsset)
        res.status(200).json({
            status: 'success',
            data: createImageAsset
        })
    } else {
        res.status(300).json({
            status: 'fail',
            reason: "nguoi dung khong ton tai"
        })
    }
}

const getAllImageAsset = async (req, res) => {
    const email = req.query.email
    console.log("email: ", email)
    try {
        const checkEmail = await User.find({ email });
        const getAllImagesAssets = await ImageAsset.find({ user: checkEmail[0].id });

        // console.log("getAllImagesAssets: ", getAllImagesAssets)
        res.status(200).json({
            status: 'success',
            data: getAllImagesAssets
        })
    } catch (error) {

    }

}

module.exports = {
    creatImageAsset,
    getAllImageAsset
};