import * as express from 'express';

export const router = express.Router();
const commentController = require('../controllers/controllers.bin').commentController;
const threadController = require('../controllers/controllers.bin').threadController;


router.delete('/:id/', (req, res) => {
    commentController.deleteComment(req, res);
});

router.get('/:id/', (req, res) => {
    commentController.getComment(req, res);
});

router.get('/:id/comments/', (req, res) => {
    threadController.getCommentsForThread(req, res);
});

router.put('/:id/upvote', (req, res) => {
    commentController.upvoteComment(req, res);
})

router.put('/:id/downvote', (req, res) => {
    commentController.downvoteComment(req, res);
})

