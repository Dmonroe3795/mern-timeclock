const express = require('express');
const qrcode = require('qrcode');
const router = express.Router();

var opts = {
  errorCorrectionLevel: 'L',
  type: 'image/jpeg',
  rendererOpts: {
    quality: .99
  }
}

router.get('/', (req, res, next) => {
    qrcode.toDataURL('I am a pony!', opts, function (err, url) {
        res.status(200).json({img : url});
      }) 
})

module.exports = router;