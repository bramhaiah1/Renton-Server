
var async = require('async');
var _ = require('lodash');
const insertcustomer = require("../database/CustomerModel");
const emailsignup = require("../database/emailsignup");
const emaillogin = require("../database/Emaillogin");
const fast2sms = require('fast-two-sms');
var nodemailer = require('nodemailer');


//Registration details 
exports.signup1 = async (req, res, next) => {

    console.log("entered")
    const response = await fast2sms.sendMessage({ authorization: '9lqSOruPeBWCGU5tgz1bTo8KkxXdHvJcMDV2aAYF3IQnmf6wjymc9BnC17lOsJwhy60VLtTxR8Waqbfk', message: "hii", numbers: ['7330823180'] })
    res.send(response)
}
exports.signup = (req, res, next) => {
    data2 = [];
    var response = '';
    userdata = {
        username: '',
        email: '',
        password: ''
    }
    async.series(
        [
            function (callback) {


                //Receving data from UI
                req.on("data", function (data) {
                    data2.push(data)
                    userdata = JSON.parse(data)
                    user = new emailsignup({
                        username: userdata.username,
                        email: userdata.email,
                        password: userdata.password
                    })
                    let query = { "email": userdata.email }
                    // console.log(query)
                    query1 = emailsignup.find(query).select('email')
                    query1.exec(function (err, result) {
                        if (result.length > 0) {
                            response = "Email already registered"
                            callback();
                        } else {
                            user.save();
                            response = "Successfully registered"
                            callback();
                        }
                    })
                })
            },
            function (callback) {
                res.send(response)
            },
            function (err) {
                console.log(err);
            }
        ])
}
exports.otpvalidation = (req, res, next) => {
    // console.log(req)
    var data2 = [];

    let data1 = {
        phonenumber: '',
        email: '',
        otp: ''
    }

    req.on('data', function (data) {

        data2.push(data)

        data1 = JSON.parse(data2)
        console.log("data1")

        query12 = { "phonenumber": data1.phonenumber, "OTP": data1.otp }

        console.log(query12)
        var query = insertcustomer.find(query12).select('_id');

        query.exec(function (err, someValue) {
            console.log(someValue)
            if (someValue.length <= 0) {
                query13 = { "email": data1.email, "otp": data1.otp }
                console.log(query13)
                var query14 = emaillogin.find(query12).select('_id');

                query14.exec(function (err, someValue) {

                    if (someValue.length <= 0) {
                        res.status(200).send("fail")

                    } else {
                        res.status(200).send("Success")
                    }
                })

            } else {
                let data2 = {
                    result: "success",
                    phonenumber: data1.phonenumber
                }
                res.status(200).send(data2)
            }

        })

    })

    console.log("data")

}
exports.Registeremail = (req, res, next) => {
    console.log("Registeremail")
    var data2 = [];

    let data1 = {
        email: ''

    }

    req.on('data', function (data) {

        data2.push(data)

        data1 = JSON.parse(data2)
        var val = Math.floor(1000 + Math.random() * 9000);

        var otp = JSON.stringify(val);



        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'emdapplication.123@gmail.com',			//email ID
                pass: 'qcysstbgmjenemtm'				//Password 
            }
        });

        function sendMail(email, otp) {

            data123 = new emaillogin({
                email: email,
                otp: otp

            })
            query14 = { "email": email }
            var query15 = emailsignup.find(query14).select('password');
            query15.exec(function (err, someValue) {
                if (someValue.length > 0) { res.send("navigate to password page") }
            })


            query12 = { "email": email }

            var query = emaillogin.find(query12).select('OTP');

            query.exec(function (err, someValue) {
                if (someValue.length > 0) {
                    var query1 = emaillogin.update(
                        { "email": data123.email },
                        { "$set": { "otp": otp } }
                    );
                    query1.exec(function (err, someValue2) {

                    })
                }
                else {
                    data123.save();

                }
            })

            var details = {
                from: 'emdapplication.123@gmail.com', // sender address same as above
                to: email, 					// Receiver's email id
                subject: 'OTP', // Subject of the mail.
                html: otp					// Sending OTP 
            };


            transporter.sendMail(details, function (error, data) {
                if (error)
                    console.log(error)
                else
                    console.log(data);
                res.send("OTPsent")
            });
        }


        sendMail(data1.email, otp);
    })
}





exports.createaccount = (req, res, next) => {
    //  console.log("ok")

    data2 = []
    let data1 = {
        username: '',
        password: '',
        email: '',
    }

    req.on('data', function (data) {

        data2.push(data)


        data1 = JSON.parse(data2)


        //console.log(data1.username)
        //Need to create an account

        let user1 = new emailsignup({
            username: data1.username,
            email: data1.email,
            password: data1.password
        })
        //  console.log(user1)

        let query = { "email": data1.email }
        console.log(data1.email)
        query1 = emailsignup.find(query).select('username')
        //console.log(query1)
        query1.exec(function (err, result) {
            if (result <= 0) {
                console.log(result + "aaaa")
                user1.save(function (err, result1) {

                    query2 = emailsignup.find(query).select('username')
                    query2.exec(function (err, result) {
                        console.log(result[0].username + "aaaa1")
                        data21 = {
                            id: result[0]._id,
                            username: result[0].username
                        }
                        res.send(data21)
                    })


                });

            } else {
                console.log(result)
                var query2 = emailsignup.update(
                    { "username": result[0].username },
                    { "$set": { "password": data1.password } }
                );

                res.send("sucessfully Updated")

            }

        })


    })
}