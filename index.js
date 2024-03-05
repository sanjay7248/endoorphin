const express = require("express");
const app = express();
require("dotenv").config();
require("./src/config/db.config");
const cors = require("cors");
var bodyParser = require('body-parser');
const crypto = require('crypto');

var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: "50mb" }));
require("./src/routes/route")(app)
app.use("/images", express.static("images"));
// const generateSecretKey = () => {
//     console.log('===========');
//     return crypto.randomBytes(64).toString('hex');
// };

const port = process.env.PORT || 5002;
app.listen(port, () => {
    // let secretKey = generateSecretKey();
    // console.log('Generated Secret Key:', secretKey);
    console.log(`app is runnig on http://localhost:${port}`)
})
