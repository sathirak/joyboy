const express = require('express');
const router = express.Router();

//hyperion routing
const hyperion_route = require('./hyperion/hyperion');
router.use('/hyperion', hyperion_route);

//headliners routing
const headliners_route = require('./headliners/headliners');
router.use('/headliners', headliners_route);

//atlas routing
const atlas_route = require('./atlas/atlas_webdata');
router.use('/atlas', atlas_route);

module.exports = router;
