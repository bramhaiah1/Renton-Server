
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let imageupload = new Schema(
    {
        category_id: {
            type: String
        },
        name: {
            type: String
        },
        price: {
            type: String
        },
        img: {
            type: String
        },
        rent: {
            type: String
        },
        loc: {
            type: String
        },
        qty: {
            type: String
        }
    },
    { collection: "Productdetails" }
);

module.exports = mongoose.model("imageupload", imageupload);
