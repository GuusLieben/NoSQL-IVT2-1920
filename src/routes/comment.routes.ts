import * as express from 'express';
import {logger} from "../app";
export const router = express.Router();
const commentController = require('../controllers/controllers.bin').commentController;
const threadController = require('../controllers/controllers.bin').threadController;

// #MongoDB

router.delete('/:id/', (req, res) => {
    commentController.deleteComment(req, res);
});

router.get('/:id/', (req, res) => {
    // Get by comment Id
    // Username, content, up-/downvotes
    commentController.getComment(req, res);
});

router.get('/:id/comments/', (req, res) => {
    // Get by comment Id
    // Username, content, up-/downvotes
    threadController.getCommentsForThread(req, res);
});
