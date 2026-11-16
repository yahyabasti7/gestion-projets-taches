
const Project = require('../models/Project');

// n3mlou projet jdid lel user eli 3amel Login
const createProject = async (req, res) => {
    try {
        const { nom, description } = req.body;

        if (!nom) {
            return res.status(400).json({
                message: 'Le nom du projet est obligatoire'
            });
        }

        const project = new Project({
            nom,
            description,
            owner: req.user.id
        });

        await project.save();

        res.status(201).json({
            message: 'Projet créé avec succès',
            project
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la création du projet',
            error: error.message
        });
    }
};

// njibou les projets 7asb role mta3 el user
const getProjects = async (req, res) => {
    try {
        const { search, sortBy, order } = req.query;

        let filter = {};

        // el manager ynajem ychouf les projets lkol
        if (req.user.role !== 'manager') {
            filter.owner = req.user.id;
        }

        // recherche 3la esm el projet
        if (search) {
            filter.nom = { $regex: search, $options: 'i' };
        }

        // n7addu les champs eli najmou nsortiw bihom
        const allowedSortFields = ['nom', 'status', 'dateCreation'];

        const field = allowedSortFields.includes(sortBy)
            ? sortBy
            : 'dateCreation';

        const direction = order === 'asc' ? 1 : -1;

        const projects = await Project.find(filter)
            .sort({ [field]: direction });

        res.status(200).json({
            message: 'Liste des projets récupérée avec succès',
            projects
        });

    } catch (error) {
        res.status(500).json({
            message: 'Erreur lors de la récupération des projets',
            error: error.message
        });
    }
};

module.exports = {
    createProject,
    getProjects
};
