
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let emailmodel = new Schema(
    {
        username: {
            type: String
        },
        password: {
            type: String
        }
    },
    { collection: "EmailDetails" }
);

module.exports = mongoose.model("EmailDetails", emailmodel);
