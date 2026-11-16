
const Task = require('../models/Task');
const Project = require('../models/Project');
const User = require('../models/User');

// n3mlou tâche jdida fi projet
const createTask = async (req, res) => {
    try {
        const { title, description, deadline, project } = req.body;

        if (!title || !deadline || !project) {
            return res.status(400).json({
                message: 'Veuillez remplir les champs obligatoires'
            });
        }

        const existingProject = await Project.findById(project);

        if (!existingProject) {
            return res.status(404).json({
                message: 'Projet introuvable'
            });
        }

        const newTask = new Task({
            title,
            description,
            deadline,
            project
        });

        await newTask.save();

        res.status(201).json({
            message: 'Tâche créée avec succès',
            task: newTask
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la création de la tâche',
            error: error.message
        });
    }
};

// njibou les tâches mta3 projet mo3ayen
const getTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { search, status, sortBy, order } = req.query;

        const existingProject = await Project.findById(projectId);

        if (!existingProject) {
            return res.status(404).json({
                message: 'Projet introuvable'
            });
        }

        let filter = { project: projectId };

        // recherche 3la 3onwen el tâche
        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }

        // nfilteriw les tâches 7asb el status
        if (status) {
            if (!['todo', 'doing', 'done'].includes(status)) {
                return res.status(400).json({
                    message: 'Statut invalide'
                });
            }

            filter.status = status;
        }

        // n7addu les champs eli najmou nsortiw bihom
        const allowedSortFields = [
            'title',
            'status',
            'deadline',
            'dateCreation'
        ];

        const field = allowedSortFields.includes(sortBy)
            ? sortBy
            : 'dateCreation';

        const direction = order === 'asc' ? 1 : -1;

        const tasks = await Task.find(filter)
            .sort({ [field]: direction });

        res.status(200).json({
            message: 'Liste des tâches récupérée avec succès',
            tasks
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des tâches',
            error: error.message
        });
    }
};

// nbadlou statut mta3 el tâche
const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['todo', 'doing', 'done'].includes(status)) {
            return res.status(400).json({
                message: 'Statut invalide'
            });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Tâche introuvable'
            });
        }

        task.status = status;
        await task.save();

        res.status(200).json({
            message: 'Statut de la tâche modifié avec succès',
            task
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la modification du statut',
            error: error.message
        });
    }
};

// n3aynou el tâche lel user eli n5tarouh
const assignTask = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                message: 'Veuillez sélectionner un utilisateur'
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: 'Utilisateur introuvable'
            });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                message: 'Tâche introuvable'
            });
        }

        task.assignedTo = userId;
        await task.save();

        res.status(200).json({
            message: 'Tâche assignée avec succès',
            task
        });

    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de l'assignation de la tâche",
            error: error.message
        });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTaskStatus,
    assignTask
};
