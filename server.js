
const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API Gestion de Projets et Taches');
});

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Serveur demarre sur le port ${PORT}`);
    });
};

startServer();
