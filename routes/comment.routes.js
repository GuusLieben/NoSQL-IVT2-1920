const express = require('express');
const router = express.Router();

// #MongoDB

router.post('/:threadId', (req, res, next) => {
    // If thread not exist : error
    // Content, username, threadId
    //
});

router.delete('/:id', (req, res, next) => {

});

router.get('/thread/:threadId', (req, res, next) => {
    // Get by thread Id
    // Username, content, up-/downvotes
});

router.get('/comment/:commentId', (req, res, next) => {
    // Get by comment Id
    // Username, content, up-/downvotes
});

