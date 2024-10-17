const express = require('express');
const router = express.Router();
const { generateQrCode, getQRCodePage, sendMessageTo } = require('../controllers/qr.controller');

router.get('/qr', generateQrCode);
router.get('/my-qrcode', getQRCodePage);
router.post('/send-message', sendMessageTo);

module.exports = router;