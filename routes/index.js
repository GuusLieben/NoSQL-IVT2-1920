const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.json({title: 'NoSQL IVT2 1920'});
});

module.exports = router;
