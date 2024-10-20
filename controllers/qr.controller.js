const { Client , MessageMedia , Location, Poll } = require('whatsapp-web.js');
const { client, getQRImageData, getClientReady } = require('../client');
const { statusCodes, formatMoroccanNumber } = require("../utils");

const generateQrCode = async(req, reply) => {
    try {
        const qrImageData = getQRImageData();        
        if (qrImageData != undefined) {
            reply.status(statusCodes.SUCCESS).send({
                statusCode: statusCodes.SUCCESS,
                message: 'QR Code generated successfully'
            });
        }
        else {
            reply.status(statusCodes.NOT_FOUND).send({
                message: 'QR Code not yet generated',
                statusCode: statusCodes.NOT_FOUND
            });
        }
    } catch (err) {
        reply.status(statusCodes.CUSTOM_ERROR).send({ 
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
}

const getQrCode = async(req, reply) => {
    try {
        const qrImageData = getQRImageData();
        const img = Buffer.from(qrImageData.split(',')[1], 'base64');
        reply.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        reply.end(img);
    } catch (err) {
        reply.status(statusCodes.CUSTOM_ERROR).send({ 
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
}

const sendMessageTo = async (req, reply) => {
    try {
        const { number, message, imageUrl, caption } = req.body;

        if (!number) return reply.status(statusCodes.NOT_FOUND).send({
            statusCode: statusCodes.NOT_FOUND,
            message: 'Please provide a phone number!'
        });

        if (!message && !imageUrl) {
            return reply.status(statusCodes.BAD_REQUEST).send({
                statusCode: statusCodes.BAD_REQUEST,
                message: 'Please provide either a message or an image URL!'
            });
        }

        if(!getClientReady()) return reply.status(statusCodes.BAD_REQUEST).send({
            statusCode: statusCodes.BAD_REQUEST,
            message: 'Client is not ready yet, please try again!'
        });

        const chatId = formatMoroccanNumber(number);
        let sentMessage;

        if (imageUrl) {
            const media = await MessageMedia.fromUrl(imageUrl);
            sentMessage = await client.sendMessage(chatId, media, { caption });
        } else if (message) {
            sentMessage = await client.sendMessage(chatId, message);
        }

        if (sentMessage.id) {
            console.log(`Message sent successfully to ${number}: ${sentMessage.id._serialized}`);
            reply.status(statusCodes.SUCCESS).send({
                statusCode: statusCodes.SUCCESS,
                message: `Message sent successfully to ${number}`
            });
        } else {
            console.error(`Failed to send message to ${number}`);
            reply.status(statusCodes.CUSTOM_ERROR).send({
                statusCode: statusCodes.CUSTOM_ERROR,
                message: `Failed to send message to ${number}`
            });
        }
    } catch (err) {
        console.error('Error sending message:', err);
        reply.status(statusCodes.CUSTOM_ERROR).send({
            message: err.message,
            statusCode: statusCodes.CUSTOM_ERROR,
        });
    }
};

module.exports = {
    generateQrCode,
    sendMessageTo,
    getQrCode
}