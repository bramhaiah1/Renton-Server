
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let emailsignup = new Schema(
    {
        username: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        }

    },
    { collection: "EmailDetails1" }
);


module.exports = mongoose.model("EmailDetails1", emailsignup);
