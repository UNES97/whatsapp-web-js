const express = require('express');
const app = express();
require('dotenv').config()

const port = process.env.APP_PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const qrRoutes = require('./routes/qr.routes');
app.use('/api', qrRoutes);

app.get("/", (req , res) => {
    res.status(200);
    res.send({
        message: `WhatsApp API for MAXMIND Agency - @${new Date().toISOString().slice(0, 4)}`
    });
});

const myDB = require("./models");
myDB.Connection.sync({alter: true}).then(() => {
    console.log('Synced DB');
});

const host = process.env.APP_HOST;
app.listen(port, host, () => {
    console.log(`Server is running on ${host}:${port}`);
});

module.exports = app;