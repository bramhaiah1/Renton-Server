
var async = require('async');
var _ = require('lodash');
const express = require('express');
var nodemailer = require('nodemailer');


var db1 = require('../database/database1')
const insertproduct = require("../database/ProductModel");
const categorytable = require('../database/CategoryTable');


const router = express.Router();
const product = [];

exports.deleteproduct = (req, res, next) => {
    var data2 = []
    let data1 = {
        name: '',
        loc: ''
    }
    req.on("data", function (data) {
        data2.push(data)
        data1 = JSON.parse(data)
        console.log(data1)

        query = { "name": data1.name, "loc": data1.loc }
        console.log(query)
        query1 = insertproduct.deleteOne(query);
        query1.exec(function (err, result) {
            if (result.n > 0) {

                res.send("Product removed")

            }
            else {

                res.send("Product doesn't Exists")

            }
        })
    })
}
exports.getaddproducts = (req, res, next) => {


    async.series(
        [
            function (callback) {



                const imageupload1 = new insertproduct({
                    category_id: req.body.category,
                    name: req.body.name,
                    price: req.body.price,
                    img: `http://localhost:3000/profile/${req.file.filename}`,
                    rent: req.body.rent,
                    loc: req.body.loc,
                    qty: req.body.qty
                });

                const a1 = imageupload1.save();

                callback();
            },
            function (callback) {
                // console.log(query8 )

                res.status(200).send("sucessfully added")
            }

        ],

        function (err) {
            console.log(err);
            // handle any error in here
        }
    )


}