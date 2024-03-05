const userController = require("../controllers/user.controller")

module.exports = function Route(app) {
    app.post("/api/users/signUp", userController.registerUser)
    app.post("/api/users/signIn", userController.signIn)   
}