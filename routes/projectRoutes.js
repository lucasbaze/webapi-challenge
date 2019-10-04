const router = require('express').Router();
const db = require('../data/helpers/projectModel');

//
//Get all projects
router.get('/', async (req, res) => {
    let projects = await db.get();
    if (!projects || projects.length == 0) {
        res.status(404).json({
            message: 'There are currently no projects saved',
        });
    }
    res.status(200).json(projects);
});

//
//middleware
async function validateProjectId(req, res, next) {
    let { id } = req.params;

    let project = await db.get(id);
    if (!project || project == null) {
        next('No project exists with that ID');
    }
    next();
}

module.exports = router;
