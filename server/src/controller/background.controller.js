const Background = require('../models/background.model');

const createBackground = async (req, res) => {
    const newBackground = await Background.create(req.body);
    res.status(200).json({
        status: 'success',
        data: newBackground,
    });
};

const getBackground = async (req, res) => {
    const background = await Background.find();
    res.status(200).json({
        status: 'success',
        data: background,
    });
};

const updateBackground = async (req, res) => {
    const backgroundId = req.params.id
    console.log(backgroundId);
    const name = req.body.name
    console.log(name);

    const updatedBackground = await Background.findByIdAndUpdate(
        backgroundId,
        { name: name },
        { new: true }
    );

    if (!updatedBackground) {
        res.status(404).json({ error: 'Background not found.' });
    }

    res.status(200).json({
        status: 'success',
        data: updatedBackground,
    });
};

const deleteBackground = async (req, res) => {
    const backgroundId = req.params.id;

    const deletedBackground = await Background.findByIdAndDelete(backgroundId);

    if (!deletedBackground) {
        res.status(404).json({ error: 'Background not found.' });
    }

    res.status(200).json({
        status: 'success',
        data: deletedBackground,
    });
};

module.exports = {
    createBackground,
    getBackground,
    updateBackground,
    deleteBackground
};