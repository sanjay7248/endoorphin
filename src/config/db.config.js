const mongoose = require('mongoose')
require('dotenv').config();
const Role = require("../models/role.model");
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
MONGO_URI='mongodb+srv://Endoorphin:rowth123@dashboard.gjvnt8k.mongodb.net/'
// process.env.MONGO_URI
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI, connectionParams)

    .then(() => {
        console.log('Connected to the database ');
        initial();
    })
    .catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

const initial = async () => {
    const counts = await Role.countDocuments();
    if (counts == 0) {
        await Role.insertMany([{ name: "user" }, { name: "admin" }])
    } else {
        console.log(`Roles ${counts}`);
    }

}