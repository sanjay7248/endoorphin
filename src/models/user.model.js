const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema(
    {
        userName: String,
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber: String,
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "roles"
        },
        token: {
            type: String,
            default: ''
        },      
    },
    { versionKey: false, timestamps: true }
);

const user = mongoose.model("users", userModel);

module.exports = user;
