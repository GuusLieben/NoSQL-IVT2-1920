const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.json({title: 'NoSQL IVT2 1920'});
});

module.exports = router;
