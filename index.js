const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()

const port = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const qrRoutes = require('./routes/qr.routes');
app.use('/api', qrRoutes);

app.get("/health", (req , res) => {
    res.status(200);
    res.send({
        message: `WhatsApp API - MAXMIND - @${new Date().toISOString().slice(0, 4)}`,
        statusCode: 200
    });
});

app.use(express.static(path.join(__dirname, 'html')));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/html/index.html'));
});
app.get('/sandbox-send', function(req, res) {
    res.sendFile(path.join(__dirname, '/html/sandbox.send.html'));
});
app.get('/docs', function(req, res) {
    res.sendFile(path.join(__dirname, '/html/docs.html'));
});

const myDb = require("./models");
myDb.Connection.sync({alter: false}).then(() => {
    console.log('Synced DB');
});

const host = process.env.APP_HOST;
app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
});

module.exports = app;