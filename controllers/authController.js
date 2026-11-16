
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// نتثبتو من بيانات المستخدم قبل ما نعملولو حساب
const register = async (req, res) => {
    try {
        const { nom, login, password } = req.body;

        if (!nom || !login || !password) {
            return res.status(400).json({
                message: 'Veuillez remplir tous les champs obligatoires'
            });
        }

        const existingUser = await User.findOne({ login });

        if (existingUser) {
            return res.status(400).json({
                message: "Ce nom d'utilisateur existe déjà"
            });
        }

        const user = new User({
            nom,
            login,
            password
        });

        await user.save();

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        res.status(201).json({
            message: 'Compte créé avec succès',
            user: {
                id: user._id,
                nom: user.nom,
                login: user.login,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error('Erreur register:', error.message);

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Ce nom d'utilisateur existe déjà"
            });
        }

        res.status(500).json({
            message: "Erreur lors de la création du compte"
        });
    }
};

// نتثبتو من معلومات المستخدم وقت تسجيل الدخول
const login = async (req, res) => {
    try {
        const { login: userLogin, password } = req.body;

        if (!userLogin || !password) {
            return res.status(400).json({
                message: 'Veuillez saisir votre nom d’utilisateur et votre mot de passe'
            });
        }

        const user = await User.findOne({ login: userLogin });

        if (!user) {
            return res.status(401).json({
                message: "Nom d'utilisateur ou mot de passe incorrect"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Nom d'utilisateur ou mot de passe incorrect"
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
        );

        res.status(200).json({
            message: 'Connexion réussie',
            user: {
                id: user._id,
                nom: user.nom,
                login: user.login,
                role: user.role
            },
            token
        });

    } catch (error) {
        console.error('Erreur login:', error.message);

        res.status(500).json({
            message: 'Erreur lors de la connexion'
        });
    }
};

module.exports = {
    register,
    login
};
