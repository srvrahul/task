const express = require('express');
const router = express.Router();

const models = require('../model')

router.post('/userCreation',models.userCreation);
router.get('/listUsers',models.listUsers);
router.get('/listUserRoles',models.listUserRoles);
router.post('/getUserRoleByEmail',models.getUserRoleByEmail);
module.exports = router;