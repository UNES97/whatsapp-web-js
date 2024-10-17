const express = require('express');
const app = express();
const port = 3000;

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

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
});

module.exports = app;