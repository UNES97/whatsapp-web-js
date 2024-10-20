const { Client , MessageMedia , Location, Poll, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');

const client = new Client({
    /* puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    }, */
    authStrategy: new LocalAuth()
});

let qrImageData;
let clientReady = false;

client.on('qr', async (qr) => {
    qrImageData = await qrcode.toDataURL(qr);
    console.log('New QR code generated');
});

client.on('ready', () => {
    clientReady = true;
    console.log('Client is ready!');
});

client.on('message', async(msg) => {
    
});

client.initialize();

module.exports = { client, getQRImageData: () => qrImageData, getClientReady: () => clientReady};