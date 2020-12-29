
var async = require('async');
var _ = require('lodash');
const categorytable = require('../database/CategoryTable');
const insertcustomer = require("../database/CustomerModel");
const product = [];
const insertproduct = require("../database/ProductModel")
exports.category = (req, res, next) => {
    data = [];
    data3 = [];
    categorylist = {};
    let responsedata = {
        _id: '',
        category: ''

    }
    async.series(
        [
            function (callback) {

                // fetch your data here using mongo with your loop
                // req.on('data', (chunk) => {
                //     data.push(chunk)
                //     data1 = JSON.parse(data)
                var query = categorytable.find().select('category');

                query.exec(function (err, someValue) {
                    if (err) return next(err);
                    console.log(someValue)
                    dataconvert1 = JSON.stringify(someValue);
                    responsedata = JSON.parse(dataconvert1);
                    // console.log(responsedata.length)

                    // for (var i = 0; i < responsedata.length; i++) {

                    //     categorylist[i] = responsedata[i].category;
                    // }


                    callback();
                });
                // callback(); // this will trigger next step (call this after you finished iterating array)
            },
            function (callback) {
                // after above code has been executed
                // send response here
                //  console.log(categorylist[0]);
                res.send(responsedata);
                // callback() // call this to proceed
            }
        ],
        function (err) {
            console.log(err);
            // handle any error in here
        }
    )
}
exports.postaddproduct = (req, res, next) => {
    // console.log("pp")
    data = [];
    productlist = [];
    let data1 = {
        category: ''
    }
    let responsedata = {
        category_id: '',
        name: '',
        img: '',
        price: '',
        rent: '',
        loc: '',
        qty: ''
    }
    async.series(
        [
            function (callback) {

                // fetch your data here using mongo with your loop

                var query = insertproduct.find();

                query.exec(function (err, someValue) {
                    console.log(someValue)
                    if (err) return next(err);
                    dataconvert1 = JSON.stringify(someValue);
                    responsedata = JSON.parse(dataconvert1);
                    // for (var i = 0; i < responsedata.length; i++) {
                    //     productlist.push(responsedata[i].name);

                    // }
                    // console.log(productlist)

                    callback();
                })
                // callback(); // this will trigger next step (call this after you finished iterating array)
            },
            function (callback) {
                // after above code has been executed
                // send response here
                //console.log(responsedata.data);
                res.send(responsedata);
                // callback() // call this to proceed
            }
        ],
        function (err) {
            console.log(err);
            // handle any error in here
        }
    )
}



exports.product = product;