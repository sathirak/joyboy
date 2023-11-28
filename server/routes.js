const express = require('express');
const router = express.Router();


//hyperion routing
const hyperion_route = require('./hyperion/hyperion');
router.use('/hyperion', hyperion_route);

//headliners routing
const headliners_route = require('./headliners/headliners');
router.use('/headliners', headliners_route);

const keiko_route = require('./keiko/keiko_data');
router.use('/keiko', keiko_route);

module.exports = router;
