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
//Get project by ID
router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

//
//Insert new project
router.post('/', async (req, res) => {
    let project = req.body;
    let createdProject = await db.insert(project);
    if (!createdProject || createdProject == null) {
        res.status(500).json({
            message: 'There was an error saving the project',
        });
    }
    res.status(200).json({
        message: 'Project saved successfully',
        project: createdProject,
    });
});

//
//middleware
async function validateProjectId(req, res, next) {
    let { id } = req.params;

    let project = await db.get(id);
    if (!project || project == null) {
        next('No project exists with that ID');
    }
    req.project = project;
    next();
}

module.exports = router;
