
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let CategoryTable = new Schema(
    {
        category: {
            type: String
        }

    },
    { collection: "CategoryTable" }
);

module.exports = mongoose.model("CategoryTable", CategoryTable);
