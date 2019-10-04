const router = require('express').Router();
const db = require('../data/helpers/projectModel');

//
//Get all projects
router.get('/', (req, res) => {
    res.send('Inside the project router');
});

module.exports = router;
