
const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API Gestion de Projets et Taches');
});

app.listen(PORT, () => {
    console.log(`Serveur demarre sur le port ${PORT}`);
});
