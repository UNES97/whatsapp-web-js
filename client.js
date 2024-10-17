const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const client = new Client({
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    }
});

let qrImageData = '';

client.on('qr', async (qr) => {
    qrImageData = await qrcode.toDataURL(qr);
    console.log('New QR code generated');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

module.exports = { client, getQRImageData: () => qrImageData };