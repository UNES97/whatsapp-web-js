const { Client , Buttons , MessageMedia , Location, Poll } = require('whatsapp-web.js');
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

client.on('message', async(msg) => {
    if (msg.body === '!start') {
        client.sendMessage(msg.from, `*MAXMIND WHATSAPP COMPONENTS*
        TEXT: !text
        IMAGE: !image
        INFO: !info
        LOCATION: !location
        POOL: !sendpoll
        PREVIEW: !preview
        HOW TO FORMAT TEXT : https://faq.whatsapp.com/539178204879377/?helpref=uf_share`);
    }
    else if (msg.body === '!text') {
        const contact = await msg.getContact();
        const senderName = contact.pushname || contact.name || contact.number;

        client.sendMessage(msg.from, `👋 Hello ${senderName}!
        We hope you're doing great! 🎉 We have exciting news just for you!

        🛍️ Exclusive Offer:
        Enjoy a flat 20% discount on all products in our store this week. Hurry! This offer is available until 20 Oct 2024.
        Don't miss out on this limited-time deal! For any assistance, feel free to reach out to us via WhatsApp or email.
        Thank you for being a valued customer. 💖

        Warm regards,
        MAXMIND`);
    }

    else if (msg.body === '!info') {
        let info = client.info;
        client.sendMessage(msg.from, `
            *Connection info*
            User name: ${info.pushname}
            My number: ${info.wid.user}
            Platform: ${info.platform}
        `);
    }

    else if (msg.body === '!image') {
        const media = MessageMedia.fromFilePath('./images/demo.jpeg');
        await client.sendMessage(msg.from, media);
    }

    else if (msg.body === '!location') {
        const location = new Location(37.422, -122.084);
        await client.sendMessage(msg.from, location);
    }

    else if (msg.body === '!sendpoll') {
        const pool = new Poll('Winter or Summer?', ['Winter', 'Summer']);
        await client.sendMessage(msg.from, pool);
    }

    else if (msg.body.startsWith('!preview ')) {
        const text = msg.body.slice(9);
        msg.reply(text, null, { linkPreview: true });
    }
});

client.initialize();

module.exports = { client, getQRImageData: () => qrImageData };