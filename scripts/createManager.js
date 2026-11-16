
require('dotenv').config();

const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (question) => {
    return new Promise((resolve) => {
        rl.question(question, resolve);
    });
};

// na3mlou compte manager
const createManager = async () => {
    try {
        await connectDB();

        const nom = await ask('Nom du manager: ');
        const login = await ask('Login du manager: ');
        const password = await ask('Password du manager: ');

        const existingUser = await User.findOne({ login });

        if (existingUser) {
            console.log('Ce login existe déjà');
            return;
        }

        const manager = new User({
            nom,
            login,
            password,
            role: 'manager'
        });

        await manager.save();

        console.log('Compte manager créé avec succès');

    } catch (error) {
        console.error('Erreur:', error.message);
    } finally {
        rl.close();
        await mongoose.disconnect();
    }
};

createManager();
