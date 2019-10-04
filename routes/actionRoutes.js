const router = require('express').Router();
const db = require('../data/helpers/actionModel');
const projectDB = require('../data/helpers/projectModel');

//
//Get All actions
router.get('/', async (req, res) => {
    let actions = await db.get();
    if (!actions) {
        res.status(404).json({
            message: 'There are no actions available at this time',
        });
    }
    res.status(200).json(actions);
});

//
//Get action by ID
router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

//
//Insert new action
router.post('/', validateActionBody, validateProjectId, async (req, res) => {
    let action = req.body;
    let createdAction = await db.insert(action);
    if (!createdAction || createdAction == null) {
        res.status(500).json({
            message: 'There was an error saving the action',
        });
    }
    res.status(200).json(createdAction);
});

//
//update an action
router.put(
    '/:id',
    validateActionBody,
    validateActionId,
    validateProjectId,
    async (req, res) => {
        let action = req.body;
        let { id } = req.params;

        let updatedAction = await db.update(id, action);
        if (!updatedAction || updatedAction == null) {
            res.status(500).json({
                message: 'There was an error updating the action',
            });
        }
        res.status(200).json(updatedAction);
    }
);

//
//Delete action
router.delete('/:id', validateActionId, async (req, res) => {
    let { id } = req.params;
    let status = await db.remove(id);
    if (!status) {
        res.status(500).json({
            message: 'There was an error removing that action',
        });
    }
    res.status(200).json({
        message: `Successfully removed action ${id}`,
    });
});

//
//middleware
async function validateActionId(req, res, next) {
    let { id } = req.params;
    let action = await db.get(id);
    if (!action || action == null) {
        next('Action does not exist');
    }
    req.action = action;
    next();
}
async function validateProjectId(req, res, next) {
    let action = req.body;
    let id = action.project_id;

    let project = await projectDB.get(id);
    if (!project || project == null) {
        next('No project exists with that ID');
    }
    next();
}
function validateActionBody(req, res, next) {
    let action = req.body;

    if (!action.project_id || !action.description || !action.notes) {
        next('Missing project id or description or notes. Please add');
    }

    next();
}

module.exports = router;
