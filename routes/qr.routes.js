const express = require('express');
const router = express.Router();
const { generateQrCode, sendMessageTo, getQrCode } = require('../controllers/qr.controller');
const { validateToken } = require('../middlewares/auth')

router.get('/qr', validateToken, generateQrCode);
router.get('/qr-image', validateToken, getQrCode);
router.post('/send-message', validateToken, sendMessageTo);

module.exports = router;