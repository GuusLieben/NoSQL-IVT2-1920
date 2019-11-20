import * as express from 'express';
export const router = express.Router();
const commentController = require('../controllers/controllers.bin').commentController;
const threadController = require('../controllers/controllers.bin').threadController;

// #MongoDB

router.delete('/:id/', (req, res) => {
    commentController.deleteComment(req, res);
});

router.get('/:id/', (req, res) => {
    commentController.getComment(req, res);
});

router.get('/:id/comments/', (req, res) => {
    threadController.getCommentsForThread(req, res);
});

router.post('/:id/comments/', (req, res) => {
    commentController.postCommentOnComment(req, res);
})
