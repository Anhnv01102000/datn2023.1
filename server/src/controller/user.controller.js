const User = require('../models/user.model');
const { CreateJWT, veryfiToken } = require('../middleware/JWTAction');
const bcrypt = require('bcrypt');

const authGoogle = async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    // const password = req.body.password;
    const findUser = await User.find({ email: email });
    console.log(findUser);
    if (findUser.length === 0) {
        const createUser = await User.create({
            username,
            email,
            // password: hashPassword,
        });
        console.log(createUser);
        const token = CreateJWT({
            id: createUser.id.toString(),
            username: createUser.username,
            // password: password,
            email: createUser.email,
            image: createUser.image,
            description: createUser.description,
            role: createUser.role
        });
        return res.status(200).json({
            status: 'success',
            token: token,
            data: createUser,
        });
    }
    else {
        const token = CreateJWT({
            id: findUser[0].id.toString(),
            username: findUser[0].username,
            email: findUser[0].email,
            image: findUser[0].image,
            description: findUser[0].description,
            role: findUser[0].role
        });

        return res.status(200).json({
            status: 'success',
            token: token,
            data: findUser[0],
        });
    }
}

const checkEmail = (email) => {
    const emailRegexp =
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailRegexp.test(email);
};

const checkUserPassword = (password) => {
    const regex = /^[A-Za-z\d]{6,}$/;
    return regex.test(password);
};

const validateSignUp = (data) => {
    console.log(data);
    if (data.password == '' || data.username == '' || data.email == '') {
        return 'không được bỏ trống thông tin';
    } else if (!checkEmail(data.email)) {
        return 'Email không đúng định dạng';
    } else if (!checkUserPassword(data.password)) {
        return 'Mật khẩu có chứa kí tự không hợp lệ hoặc chưa đủ 6 kí tự';
    } else if (data.password != data.confirmPassword) {
        return 'comfirmPassword voi password không trùng khớp';
    }
};

const handleSignup = async (req, res) => {
    if (validateSignUp(req.body)) {
        return res.status(200).json({
            status: 'fail',
            reason: validateSignUp(req.body),
        });
    }

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const findUser = await User.find({ email: email });

    if (findUser.length === 0) {
        //mã howas password
        const hashPassword = await bcrypt.hash(password, 12);
        // console.log('mã hóa', hashPassword);
        const createUser = await User.create({
            username,
            email,
            password: hashPassword,
        });
        return res.status(200).json({
            status: 'success',
            data: createUser,
        });
    } else {
        return res.status(200).json({
            status: 'fail',
            reason: 'email đã tồn tại',
        });
    }
};

const handleLogin = async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;

    const checkLogin = await User.find({ email });

    if (checkLogin.length === 0) {
        return res.status(200).json({
            status: 'fail',
            reason: 'Tài khoản không tồn tại',
        });
    }
    const hashPassword = checkLogin[0].password;
    const comparePass = await bcrypt.compare(password, hashPassword);
    if (comparePass) {
        const token = CreateJWT({
            id: checkLogin[0]._id.toString(),
            username: checkLogin[0].username,
            password: password,
            email: email,
            image: checkLogin[0].image,
            description: checkLogin[0].description,
            role: checkLogin[0].role
        });

        return res.status(200).json({
            status: 'success',
            token: token,
            data: checkLogin,
        });
    } else {
        return res.status(200).json({
            status: 'fail',
            reason: 'email/phone or password không đúng',
        });
    }
};

const handleLogout = (req, res) => {
    return res.status(200).json({
        status: 'success',
    });
};

const handleValidateToken = async (req, res) => {
    const token = await req.body.token;
    try {
        const validateToken = veryfiToken(token);
        return res.status(200).json({
            status: 'success',
            data: validateToken,
        });
    } catch (error) {
        console.log({ error });
    }
};

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        status: 'success',
        data: users,
    });
};

const updateUserRole = async (req, res) => {
    const userId = req.params.id;
    const newRole = req.body.role;

    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { role: newRole },
        { new: true }
    );

    if (!updatedUser) {
        res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({
        status: 'success',
        data: updatedUser,
    });
};

const updateUserProfile = async (req, res) => {
    const userId = req.params.id
    const username = req.body.username
    const password = req.body.password
    const image = req.body.image
    const description = req.body.description

    const hashPassword = await bcrypt.hash(password, 12);

    const updatedUser = await User.findByIdAndUpdate(userId, {
        username: username,
        password: hashPassword,
        image: image,
        description: description,
    }, { new: true });

    // Kiểm tra nếu người dùng không tồn tại
    if (!updatedUser) {
        return res.status(404).json({
            status: 'fail',
            message: 'User not found',
        });
    }

    const token = CreateJWT({
        id: updatedUser._id.toString(),
        username: updatedUser.username,
        password: password,
        email: updatedUser.email,
        image: updatedUser.image,
        description: updatedUser.description,
        role: updatedUser.role
    });


    // Trả về thông tin người dùng đã chỉnh sửa
    res.status(200).json({
        status: 'success',
        token: token,
        data: updatedUser,
    });
}

const deleteUser = async (req, res) => {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
        res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({
        status: 'success',
        data: deletedUser,
    });
};

module.exports = {
    handleSignup,
    handleLogin,
    handleLogout,
    handleValidateToken,
    getAllUsers,
    updateUserRole,
    updateUserProfile,
    deleteUser,
    authGoogle
};