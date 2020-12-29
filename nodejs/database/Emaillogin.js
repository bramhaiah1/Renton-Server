
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Emaillogin = new Schema(
    {
        email: {
            type: String
        },
        otp: {
            type: String
        }
    },
    { collection: "Emaillogindetails" }
);

module.exports = mongoose.model("Emaillogindetails", Emaillogin);
