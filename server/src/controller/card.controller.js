const Card = require('../models/card.model');
const User = require('../models/user.model');

const createCard = async (req, res) => {
    // const { name, description, price, user, objects, thumbnail, isPublic } = req.body;
    console.log(req.body);
    const newCard = await Card.create(req.body)
    if (!newCard) {
        return res.status(404).json({
            status: 'error',
            reason: 'Lưu thiệp không thành công',
        });
    }
    res.status(200).json({
        status: 'success',
        data: newCard,
    });
}

const updateCard = async (req, res) => {
    const CardId = req.params.id
    const updateCard = await Card.findByIdAndUpdate(
        CardId, req.body, { new: true })
        .populate('owner', 'username email image');
    console.log(CardId);
    if (!updateCard) {
        return res.status(404).json({
            status: 'error',
            reason: 'Không tìm thấy thiệp',
        });
    }

    res.status(200).json({
        status: 'success',
        data: updateCard,
    });
}

const getCardById = async (req, res) => {
    const CardId = req.params.id;
    const card = await Card.findById(CardId);
    if (!card) {
        return res.status(404).json({
            status: 'error',
            message: 'Card not found',
        });
    }
    res.status(200).json({
        status: 'success',
        data: card,
    });
};

const getCardByUser = async (req, res) => {
    const userId = req.params.userId
    console.log(userId);
    const Cards = await Card.find({ owner: userId }).populate('owner', 'username email image');
    res.status(200).json({
        status: 'success',
        data: Cards,
    });
}

const getAllCard = async (req, res) => {
    const cards = await Card.find({ role: 'Public' }).populate('owner', 'username email image');
    // console.log(cards);
    res.status(200).json({
        status: 'success',
        data: cards,
    });
};

const toggleLike = async (req, res) => {
    const CardId = req.params.id;
    const userId = req.body.userId;
    // Kiểm tra xem người dùng đã like Card chưa
    const card = await Card.findById(CardId);

    if (!card) {
        return res.status(404).json({ success: false, message: 'Card not found' });
    }

    const isLiked = card.userLike.includes(userId);
    // Nếu người dùng đã like, thì chuyển thành dislike
    if (isLiked) {
        const updatedCard = await Card.findByIdAndUpdate(
            CardId,
            {
                $inc: { numberLike: -1 }, // Giảm số lượt thích đi 1
                $pull: { userLike: userId }, // Loại bỏ userId khỏi mảng userLike
            },
            { new: true } // Return the updated document
        );
        res.status(200).json({ stats: "success", data: updatedCard, action: 'dislike' });
    } else {
        // Nếu người dùng chưa like, thì thực hiện like
        const updatedCard = await Card.findByIdAndUpdate(
            CardId,
            {
                $inc: { numberLike: 1 }, // Tăng lượt thích lên 1
                $push: { userLike: userId }, // Thêm userId vào mảng userLike
            },
            { new: true } // Return the updated document
        );
        res.status(200).json({ stats: "success", data: updatedCard, action: 'like' });
    }
}

const deleteCard = async (req, res) => {
    const CardId = req.params.id;

    // Kiểm tra xem Card có tồn tại không
    const card = await Card.findById(CardId);

    if (!card) {
        return res.status(404).json({ success: false, message: 'Card not found' });
    }

    // Thực hiện xóa Card
    const deleted = await Card.findByIdAndDelete(CardId);

    res.status(200).json({ status: "success", data: deleted });
}

const getLikedCards = async (req, res) => {
    const userId = req.params.userId;

    // Tìm kiếm các Card mà user đã like
    const likedCards = await Card.find({ userLike: userId }).populate('owner', 'username email image');

    res.status(200).json({ status: "success", data: likedCards });
}

const changeOwner = async (req, res) => {
    const cardId = req.params.id;
    const newOwnerId = req.body.newOwnerId;

    const card = await Card.findById(cardId);

    if (!card) {
        return res.status(404).json({ message: 'Không tìm thấy thiệp' });
    }

    const newOwner = await User.findById(newOwnerId);

    if (!newOwner) {
        return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    // Update the card's owner using findByIdAndUpdate
    const updatedCard = await Card.findByIdAndUpdate(
        cardId,
        { owner: newOwner.id },
        { new: true, runValidators: true }
    );

    if (!updatedCard) {
        return res.status(404).json({ message: 'Không tìm thấy thiệp' });
    }
    res.status(200).json({ status: "success", data: updatedCard });
}

module.exports = {
    createCard,
    updateCard,
    getCardById,
    getCardByUser,
    getAllCard,
    toggleLike,
    deleteCard,
    getLikedCards,
    changeOwner
}
