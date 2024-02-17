const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var fs = require('fs');
const CryptoJS = require('crypto-js');

const randomString = (n, c) => { var c = c || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', r = '', l = c.length; for (let i = 0; i < n; i++) { r += c.charAt(Math.floor(Math.random() * l)); } return r; };

app.use(bodyParser());

app.use(cors({
    origin: '*'
}))

app.use(express.static(__dirname + "/public"), (_, res, next) => {
    res.status(404).redirect(`/`);
})

app.listen(3000, function () {
    console.log("Running")
})