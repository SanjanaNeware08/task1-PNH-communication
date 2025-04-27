const express = require('express');
const{createProject} = require('../controllers/projectControllers');
const {protect} = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create',createProject);

module.exports = router;