const router = require('express').Router();
const db = require('../data/helpers/actionModel');

router.get('/', (req, res) => {
    res.send('Inside the action router');
});

module.exports = router;
