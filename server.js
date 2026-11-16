
const express = require('express');
require('dotenv').config();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();
const protect = require('./middleware/authMiddleware');
const projectRoutes = require('./routes/projectRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(express.json());

// routes  mta3 el login w Sign up 
app.use('/api/auth', authRoutes);
//route mta3 projectcontroll
app.use('/api/projects', projectRoutes);
// task route
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('API Gestion de Projets et Taches');
});
// Route njarb beha el middleware psotman
app.get('/api/test-protected', protect, (req, res) => {
    res.status(200).json({
        message: 'Accès autorisé',
        user: req.user
    });
});
const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Serveur demarre sur le port ${PORT}`);
    });
};

startServer();
