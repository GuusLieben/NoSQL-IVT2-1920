import * as express from 'express';
import {logger} from "../app";
export const router = express.Router();
const controller = require('../controllers/controllers.bin').commentController;

// #MongoDB

router.delete('/:id/', (req, res, next) => {

});

router.get('/:id/', (req, res, next) => {
    // Get by comment Id
    // Username, content, up-/downvotes
});

router.get('/:id/comments/', (req, res, next) => {
    // Get by comment Id
    // Username, content, up-/downvotes
});

