import * as express from 'express';
import {logger} from "../app";
export const router = express.Router();
const controller = require('../controllers/controllers.bin').commentController;

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

