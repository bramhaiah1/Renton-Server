
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let Customernumber = new Schema(
    {
        phonenumber: {
            type: String
        },
        OTP: {
            type: String
        }
    },
    { collection: "Customerdetails" }
);

module.exports = mongoose.model("Customernumber", Customernumber);
