const qrcode = require('qrcode');
const { client, getQRImageData } = require('../client');
const { statusCodes, formatMoroccanNumber } = require("../utils");

const generateQrCode = async(req, reply) => {
    try {
        const qrImageData = getQRImageData();
        if (qrImageData) {
            const img = Buffer.from(qrImageData.split(',')[1], 'base64');
            reply.writeHead(statusCodes.SUCCESS, {
                'Content-Type': 'image/png',
                'Content-Length': img.length
            });
            reply.end(img);
        }
        else {
            reply.status(statusCodes.NOT_FOUND).send({
                message: 'QR Code not yet Generated'
            });
        }
    } catch (err) {
        reply.status(statusCodes.CUSTOM_ERROR).send({ 
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
}

const getQRCodePage = async(req, reply) => {
    try {
        reply.send(`
            <html>
                <head>
                    <title>WhatsApp QR Code</title>
                    <script>
                        function refreshImage() {
                            const img = document.getElementById('qr-code');
                            img.src = '/api/qr?' + new Date().getTime();
                        }
                        setInterval(refreshImage, 10000);
                    </script>
                </head>
                <body>
                    <h1>Scan this QR code with WhatsApp</h1>
                    <img id="qr-code" src="/api/qr" alt="QR Code">
                </body>
            </html>
        `);
    } catch (err) {
        reply.status(statusCodes.CUSTOM_ERROR).send({ 
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
}

const sendMessageTo = async(req, reply) => {
    try {
        const number = req.body.number;
        const message = req.body.message ?? 'Hello';

        if (!number) return reply.status(statusCodes.NOT_FOUND).send('Please provide a Phonenumber');

        const chatId = formatMoroccanNumber(number);
        const sentMessage = await client.sendMessage(chatId, message);
        reply.status(statusCodes.SUCCESS).send(`Message sent successfully to ${number}`);
    } catch (err) {
        reply.status(statusCodes.CUSTOM_ERROR).send({ 
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
}

module.exports = {
    generateQrCode,
    getQRCodePage,
    sendMessageTo
}