const emailsignup = require("../database/emailsignup");
exports.changepassword = (req, res, next) => {
    userdata = {
        username: '',
        password: '',

    }
    let data2 = [];

    req.on("data", function (data) {

        data2.push(data)
        userdata = JSON.parse(data)

        let query = { "username": userdata.username }
        query1 = emailsignup.find(query).select('username')

        query1.exec(function (err, result) {

            if (result.length > 0) {
                var query2 = emailsignup.update(
                    { "username": userdata.username },
                    { "$set": { "password": userdata.password } }
                );
                query2.exec()
                res.send("password changed")

            } else {
                res.send("Invalid username")
            }
        })
    })




}