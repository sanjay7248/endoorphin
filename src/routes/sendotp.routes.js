const userController = require("../controllers/user.controller")

module.exports = function Route(app) {
    app.post("/api/sendOTP", userController.sendOtp)   
}