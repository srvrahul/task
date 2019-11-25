const express = require('express');
const router = express.Router();

const models = require('../model')

router.post('/userCreation',models.userCreation);
module.exports = router;