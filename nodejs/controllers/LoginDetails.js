
var async = require('async');
var _ = require('lodash');
const fast2sms = require('fast-two-sms');

const insertcustomer = require("../database/CustomerModel");
const emailsignup = require("../database/emailsignup");

//Generating OTP and storing the OTP along with Phone number in Customerdetails table
//Sending response with phonenumber and [ OTP (OTP has sent to phone with Third part API ) for demo we are sending to UI ] 

exports.postcustomerdetails = (req, res, next) => {
    console.log(req.body)
    data = [];
    var dataconvert = '';
    var dataconvert1 = '';

    let responsedata = [{
        _id: '',
        phonenumbenor: '',
        otp: '',
        __v: ''
    }]
    let r = {};
    data1 = {
        number: ''
    }
    var query12 = '';
    async.series(
        [
            function (callback) {

                req.on('data', (chunk) => {

                    data.push(chunk)

                    data1 = JSON.parse(data)
                    var val = Math.floor(1000 + Math.random() * 9000);



                    let data12 = new insertcustomer({
                        phonenumber: data1.number,
                        OTP: val
                    })
                    query12 = { "phonenumber": data12.phonenumber }
                    //1.checking the phone number present in customer details table

                    var query = insertcustomer.find(query12).select('phonenumber' - 'OTP');

                    query.exec(function async(err, someValue) {
                        if (err) return next(err);
                        console.log(someValue)
                        if (someValue !== '') {
                            //2.IF phonenumber does not exist in DB it will save
                            data12.save(function (err, room) {

                                var query = insertcustomer.find(query12).select('phonenumber' - 'OTP');
                                query.exec(function (err, someValue) {
                                    if (err) return next(err);
                                    dataconvert1 = JSON.stringify(someValue);
                                    responsedata = JSON.parse(dataconvert1);
                                    console.log(responsedata[0].OTP)
                                    console.log(responsedata[0].phonenumber)




                                    callback();
                                });
                            }
                            )
                        }
                        else
                        //3.IF phonenumber aleredy present in DB
                        {
                            //4.Updating the OTP value in DB for Existing USer 
                            var query1 = insertcustomer.update(
                                { "phonenumber": data12.phonenumber },
                                { "$set": { "OTP": val } }
                            );
                            query1.exec(function (err, someValue2) {
                                if (err) return next(err);
                                var query = insertcustomer.find(query12).select('phonenumber' - 'OTP');
                                query.exec(function (err, someValue) {
                                    if (err) return next(err);
                                    dataconvert1 = JSON.stringify(someValue);
                                    console.log(someValue + "2");
                                    responsedata = JSON.parse(dataconvert1);

                                    var query2 = emailsignup.find(query12).select('email');
                                    query2.exec(function (err, someValue1) {
                                        console.log(someValue1)
                                        if (someValue != '') {
                                            res.send("passwordpage")
                                        } else {
                                            callback();
                                        }
                                    })


                                })
                            })

                        }

                    });

                })
                // callback(); // this will trigger next step (call this after you finished iterating array)
            },

            async function (callback) {
                // after above code has been executed
                // send response here
                //console.log(responsedata[0].phonenumber + "phone")
                try {
                    // await fast2sms.sendMessage({ authorization: 'sVTDy4zchvwl8CtJrEjHi5o3R0PKSNUkgmMdBQxOG1qeIXFf7nrdW0JV4tY6IE81hi2xwsqT3BoGnQ5f', sender_id: 'FSTSMS', message: responsedata[0].OTP, numbers: [responsedata[0].phonenumber] });
                    res.send(responsedata);

                }
                catch (ex) { console.log(ex.message); }

                // callback() // call this to proceed
            },

        ],

        function (err) {
            console.log(err);
            // handle any error in here
        }
    )

}

//Login validation
exports.login = (req, res, next) => {
    let userdata = {
        email: '',
        password: ''
    }
    var data = []
    req.on("data", (chunk) => {
        data.push(chunk)
        userdata = JSON.parse(data)
        let query = { "email": userdata.email, "password": userdata.password }
        console.log(query)
        query1 = emailsignup.find(query).select('username')
        query1.exec(function (err, result) {
            if (result != '') {
                let resp = { _id: '' }
                var d = JSON.stringify(result)
                resp = JSON.parse(d)
                console.log(resp[0].username)
                if (resp[0].username === 'Caliber') {
                    res.send("Admin Login")
                }
                else {
                    res.send("login succesfully")
                }
            }
            else {
                res.send("Invalid password")
            }
        })
    })
}

