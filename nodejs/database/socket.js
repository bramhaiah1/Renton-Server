
const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let socketid = new Schema(
    {
        socketid: {
            type: String
        },
        data: {
            type: String
        },

    },
    { collection: "socketid" }
);

module.exports = mongoose.model("socketid", socketid);
