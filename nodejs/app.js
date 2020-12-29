const http = require("http");
const express = require('express');
const bodyParser = require('body-parser');
//const app = express();
const multer = require("multer");
const path = require("path");
const Login = require('./routes/Login');
const Shop = require('./routes/Shop');
const RentonProducts = require('./routes/RentonProducts');
const Registration = require('./routes/Registration');
var db1 = require('./database/database1')
const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});
let sockets = [];

io.on("connection", socket => {

    console.log("a user connected :D");
    socket.on("chat message", data => {
        //console.log(data.user + "user1");
        socket.name = data.user;
        sockets[data.user] = socket.id;
        var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890',
            str = 'a';

        for (var i = 0; i < 10; i++) {
            str += _sym[parseInt(Math.random() * (_sym.length))];
        }
        let data2 = {
            id: str,
            msg: data.msg,
            user: data.user
        }
        console.log(data)
        socket.to(sockets[data.reply]).emit("chat message1", data2);


    });
    socket.on("chat message1", function (data) {
        console.log(data)
        //console.log(sockets)
        socket.name = data.user;
        sockets[data.user] = socket.id;
        //  console.log(sockets[data.user] + "data")
        var _sym = 'abcdefghijklmnopqrstuvwxyz1234567890',
            str = '';

        for (var i = 0; i < 10; i++) {
            str += _sym[parseInt(Math.random() * (_sym.length))];
        }
        let data2 = {
            id: str,
            msg: data.msg,
            user: data.user
        }
        console.log(data)
        socket.to(sockets[data.reply]).emit("chat message", data2);
    });
});


//const dotenv = require('dotenv's
const fast2sms = require('fast-two-sms');
const dotenv = require("dotenv"); dotenv.config(); app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }));
var mongodb = require('mongodb');
app.use('/profile', express.static('./upload/images'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.post('/a', async (req, res, next) => {
    // console.log(process.env.API_KEY)
    {
        try {
            const response = await fast2sms.sendMessage({ authorization: 'sVTDy4zchvwl8CtJrEjHi5o3R0PKSNUkgmMdBQxOG1qeIXFf7nrdW0JV4tY6IE81hi2xwsqT3BoGnQ5f', sender_id: 'FSTSMS', message: "hii", numbers: ['7330823180'] }); res.send(`Success`);
        }
        catch (ex) { console.log(ex.message); }
    }
})
app.use(RentonProducts);

app.use(Login);

app.use(Shop);
app.use(Registration);
app.use(express.json())

app.use((req, res, next) => {
    res.status(400).send('<h1>page not found</h1>');
});

server.listen(3000, () => {
    console.log("server up and running");
});
module.exports = app;
