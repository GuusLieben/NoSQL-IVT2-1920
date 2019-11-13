const express = require('express');
const router = express.Router();

// #MongoDB

router.post('/', (req, res, next) => {
    // Username, title, content (no markup)
});

router.update('/:id', (req, res, next) => {
    // New content
    // Error title update : 406 (Not Acceptable)
});

router.delete('/:id', (req, res, next) => {
    // Also delete comments/up-/downvotes
});

router.get('/', (req, res, next) => {
    // Return Id, Title, Username, Content, Total up-/downvotes
    // No comments
    // TODO : Kick a teacher, sep. API?
});

router.get('/:id', (req, res, next) => {
    // Return Id, Title, Username, Content, Total up-/downvotes
    // Full comments (comment controller)
});
