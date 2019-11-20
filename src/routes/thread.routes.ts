import * as express from 'express';
export const router = express.Router();
const threadController = require('../controllers/controllers.bin').threadController;
const commentController = require('../controllers/controllers.bin').commentController;


router.post('/', (req, res) => {
    threadController.createThread(req, res);
});

router.put('/:id/', (req, res) => {
    threadController.updateThread(req, res);
});

router.post('/:id/comments/', (req, res) => {
    commentController.postComment(req, res);
});

router.get('/:id/comments/', (req, res) => {
    threadController.getCommentsForThread(req, res);
});

router.delete('/:id/', (req, res) => {
    threadController.deleteThread(req, res);
});

router.get('/', (req, res) => {
    threadController.getThreads(req, res);
});

router.get('/:id/', (req, res) => {
    threadController.getThread(req, res);
});

router.put('/:id/upvote', (req, res) => {
    threadController.upvoteThread(req, res);
})

router.put('/:id/downvote', (req, res) => {
    threadController.downvoteThread(req, res);
})
