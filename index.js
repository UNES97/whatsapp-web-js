const { Client , Buttons , MessageMedia , List } = require('whatsapp-web.js');
/* const qrcode = require('qrcode-terminal'); */
const qrcode = require('qrcode');
const client = new Client();

const express = require('express');
const app = express();
const port = 3000;

let qrImageData = '';

/* client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
}); */
client.on('qr', async (qr) => {
    qrImageData = await qrcode.toDataURL(qr);
    console.log('New QR code generated');
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async(msg) => {
    if (msg.body == '!start') {
        msg.reply('Hello My Freind it\'s Me UNES the GOAT.');
    }
    else if (msg.body === '!naruto') {
        const media = MessageMedia.fromFilePath('./img/images.jpeg');
        await client.sendMessage(msg.from, media);
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
    else if (msg.body === '!buttons') {
        let button = new Buttons('Button body', [{ body: 'bt1' }, { body: 'bt2' }, { body: 'bt3' }], 'title', 'footer');
        await client.sendMessage(msg.from, button);
    }
    else if (msg.body === '!list') {
        let sections = [
            { title: 'sectionTitle', rows: [{ title: 'ListItem1', description: 'desc' }, { title: 'ListItem2' }] }
        ];
        let list = new List('List body', 'btnText', sections, 'Title', 'footer');
        await client.sendMessage(msg.from, list);
    }
});

client.initialize();

app.get('/myqrcode', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>WhatsApp QR Code</title>
                <script>
                    function refreshImage() {
                        const img = document.getElementById('qr-code');
                        img.src = '/qr?' + new Date().getTime();
                    }
                    setInterval(refreshImage, 5000); // Refresh every 5 seconds
                </script>
            </head>
            <body>
                <h1>Scan this QR code with WhatsApp</h1>
                <img id="qr-code" src="/qr" alt="QR Code">
            </body>
        </html>
    `);
});

app.get('/qr', (req, res) => {
    if (qrImageData) {
        const img = Buffer.from(qrImageData.split(',')[1], 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
    } else {
        res.status(404).send('QR Code not yet generated');
    }
});

function formatMoroccanNumber(number) {
    number = number.replace(/\D/g, '');
    
    if (number.startsWith('0')) {
        number = number.substring(1);
    }
    
    if (!number.startsWith('212')) {
        number = '212' + number;
    }
    
    return number + '@c.us';
}

app.get('/send-message', async (req, res) => {
    try {
        const number = req.query.number;
        console.log(number);
        
        const message = "Hello NINJA";

        if (!number) {
            return res.status(400).send('Please provide number');
        }

        const chatId = formatMoroccanNumber(number);
        console.log(chatId);

        const sentMessage = await client.sendMessage(chatId, message);
        res.status(200).send(`Message sent successfully to ${number}`);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Error sending message');
    }
});

app.get("/api", (req , res) => {
    res.status(200);
    res.send("Whats API on Render");
});

app.listen(port, () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});

module.exports = app;