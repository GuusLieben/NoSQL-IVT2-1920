import * as express from 'express';
import {logger} from "../app";
export const router = express.Router();
const threadController = require('../controllers/controllers.bin').threadController;
const commentController = require('../controllers/controllers.bin').commentController;

// #MongoDB

router.post('/', (req, res) => {
    // Username, title, content (no markup)
    threadController.createThread(req, res);
});

router.put('/:id/', (req, res) => {
    // New content
    // Error title update : 406 (Not Acceptable)
    threadController.updateThread(req, res);
});

router.post('/:id/comments/', (req, res) => {
    commentController.postComment(req, res);
});

router.get('/:id/comments/', (req, res) => {
    threadController.getCommentsForThread(req, res);
    // Get by thread Id
    // Username, content, up-/downvotes
});

router.delete('/:id/', (req, res) => {
    // Also delete comments/up-/downvotes
    threadController.deleteThread(req, res);
});

router.get('/', (req, res) => {
    // Return Id, Title, Username, Content, Total up-/downvotes
    // No comments
    threadController.getThreads(req, res);
});

router.get('/:id/', (req, res) => {
    // Return Id, Title, Username, Content, Total up-/downvotes
    // Full comments (comment controller)
    threadController.getThread(req, res);
});

