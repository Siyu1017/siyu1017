const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var fs = require('fs');
const CryptoJS = require('crypto-js');

const FILE_SHARE_KEY = process.env['FILE_SHARE_KEY'];

const randomString = (n, c) => { var c = c || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', r = '', l = c.length; for (let i = 0; i < n; i++) { r += c.charAt(Math.floor(Math.random() * l)); } return r; };

function aesECBEncrypt(key, plaintext) {
    const encrypted = CryptoJS.AES.encrypt(plaintext, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
}

function aesECBDecrypt(key, ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, CryptoJS.enc.Utf8.parse(key), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
}

app.use(bodyParser());

app.use(cors({
    origin: '*'
}))

app.post("/api/file_share/send", function (req, res) {
    try {
        if (req.body['FILE_SHARE_KEY'] == FILE_SHARE_KEY) {
            res.status(200).json({
                status: "ok",
                message: "success",
                id: ''
            })
        } else {
            res.status(200).json({
                status: "error",
                message: "invalid_payload"
            })
        }
    } catch (err) {
        res.status(200).json({
            status: "error",
            message: err
        })
    }
})

app.use(express.static(__dirname + "/public"), (_, res, next) => {
    res.status(404).redirect(`/`);
})

app.listen(3000, function () {
    console.log("Running")
})