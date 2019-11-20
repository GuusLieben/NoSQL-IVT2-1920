import * as express from 'express';
import {logger} from "../app";
export const router = express.Router();
const controller = require('../controllers/controllers.bin').threadController;

// #MongoDB

router.post('/', (req, res, next) => {
    // Username, title, content (no markup)
});

router.put('/:id', (req, res, next) => {
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
