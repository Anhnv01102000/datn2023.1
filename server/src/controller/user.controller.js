const User = require('../models/user.model');
const { CreatJWT, veryfiToken } = require('../middleware/JWTAction');
const bcrypt = require('bcrypt');

var checkEmail = (email) => {
    const emailRegexp =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegexp.test(email);
};

var checkUserPassword = (password) => {
    var regex = /^[A-Za-z\d]{6,10}$/;
    return regex.test(password);
};

const validateSignUp = (data) => {
    console.log(data);
    if (data.password == '' || data.username == '' || data.email == '') {
        return 'không được bỏ trống thông tin';
    } else if (!checkEmail(data.email)) {
        return 'Email không đúng định dạng';
    } else if (!checkUserPassword(data.password)) {
        return 'mật khẩu phải có trên 6 ký tự';
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
        const token = CreatJWT({
            username: username,
            password: password,
            email: email,
        });
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
            token: token,
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
        const token = CreatJWT({
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
    deleteUser
};