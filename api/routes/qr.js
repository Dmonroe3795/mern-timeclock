const express = require('express');
const qrcode = require('qrcode');
const router = express.Router();

router.get('/', (req, res, next) => {
    qrcode.toDataURL('I am a pony!', function (err, url) {
        res.send().json(url)
      }) 
})

module.exports = router;