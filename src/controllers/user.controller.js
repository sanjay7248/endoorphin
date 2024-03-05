const User = require('../models/user.model');
// const bcrypt = require("bcryptjs");
const Role = require('../models/role.model');
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const key='07289d0fec91e1e82e3755816e2feafc2ecc6e9806e6f0854e7312dff38a240234c91a874a4cbc1719896200b2f91b71d6be09a752e3534ee6f5cdf53e025a41'
const sendOtp = async (req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;
        const otp = Math.floor(100000 + Math.random() * 900000);
        res.status(200).json({ otp:otp });
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
}
const registerUser = async (req, res) => {
    try {
        const { userName,phoneNumber, email, password, role } = req.body;
        if (!(userName && email && phoneNumber && password && role)) {
            return res.status(400).json({ message: `All fields are required`, status: 400 });
        } else {
            const userExist = await User.findOne({ email: req.body.email }).select('_id');
            const roleExist = await Role.findOne({ name: role }).select('_id');
            if (userExist) {
                return res.status(400).json({ message: "Email already exists", status: 400 })
            }
            else if (!roleExist) {
                return res.status(400).json({ message: "Role does not exists", status: 400 })
            } else {
                if (!validateEmail(email)) {
                    return res.status(400).json({ message: "Email is invalid.", status: 400 })
                }
                if (!validatePassword(password)) {
                    return res.status(400).json({ message: "Password is invalid. It should contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number, and be at least 8 characters long.", status: 400 })
                }
                new User({
                    userName, email, phoneNumber, password: bcrypt.hashSync(password, 8), role: roleExist._id,
                }).save();
                return res.status(200).json({ message: "User registered successfully!", status: 200 });
            }
        }
    } catch (error) {
        return res.status(500).json({ message: error.message, status: 500 });
    }
};


const signIn = async (req, res) => {
    try {
        const user = await User.findOne({
            userName: req.body.userName
        }).populate({ path: "role", select: "name -_id" });
        if (!user) {
            return res.status(404).json({ message: "User Not found.", status: 404 });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(400).send({
                accessToken: null,
                message: "Invalid Password!",
                status: 400
            });
        }
        var token = jwt.sign({ id: user._id }, process.env.SECRET || key, {
            expiresIn: 86400 // 24 hours
        });
        await User.findByIdAndUpdate({ _id: user._id }, { token: token })
        return res.status(200).json({
            result: {
                _id: user._id,
                userName: user.userName,
                email: user.email,
                accessToken: token,
                role: user.role
            },
            message: "User logged in successfully.",
            status: 200
        });
    } catch (error) {
        return res.status(500).json({ message: error.message, status: 500 });
    }
};
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/.test(password);
    return passwordRegex
}
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

module.exports = { sendOtp,registerUser,signIn }