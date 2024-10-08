const { Client , Buttons , MessageMedia , List } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();

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

client.initialize();