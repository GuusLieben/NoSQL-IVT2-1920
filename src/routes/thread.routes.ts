import * as express from 'express';
import {logger} from "../app";
export const router = express.Router();
const threadController = require('../controllers/controllers.bin').threadController;
const commentController = require('../controllers/controllers.bin').commentController;

// #MongoDB

router.post('/', (req, res, next) => {
    // Username, title, content (no markup)
});

router.put('/:id/', (req, res, next) => {
    // New content
    // Error title update : 406 (Not Acceptable)
});

router.post('/:id/comments/', (req, res, next) => {
    commentController.postComment(req, res);
});

router.get('/:id/comments/', (req, res, next) => {
    // Get by thread Id
    // Username, content, up-/downvotes
});

router.delete('/:id/', (req, res, next) => {
    // Also delete comments/up-/downvotes
});

router.get('/', (req, res, next) => {
    // Return Id, Title, Username, Content, Total up-/downvotes
    // No comments
    // TODO : Kick a teacher, sep. API?
});

router.get('/:id/', (req, res, next) => {
    // Return Id, Title, Username, Content, Total up-/downvotes
    // Full comments (comment controller)
});

