const managerOnly = (req, res, next) => {
    // netthabtou ken el user Manager
    if (req.user.role !== 'manager') {
        return res.status(403).json({
            message: 'Accès réservé au manager'
        });
    }

    next();
};

module.exports = managerOnly;