const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleModel = new Schema(
    {
        name: {
            type: String,
            require: true
        }
    },
    { versionKey: false, timestamps: true }
);

const role = mongoose.model("roles", roleModel);

module.exports = role;
