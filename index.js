const { Client , Buttons , MessageMedia , List } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();

const express = require('express');
const app = express();
const port = 3000;

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
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

app.get('/send-message', (req, res) => {
    try {
        let info = client.info;
        client.sendMessage(msg.from, `
            *Connection info*
            User name: ${info.pushname}
            My number: ${info.wid.user}
            Platform: ${info.platform}
        `);
    } catch (err) {
        console.error('Failed to send message:', err);
        res.status(500).send('Error sending the message: ' + err.message);
    }
});

app.get('/', (req, res) => {
    res.send('Hello');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

client.initialize();