import * as express from 'express';
export const router = express.Router();
const controller = require('../controllers/controllers.bin').friendController;


router.post('/', (req, res) => {
    controller.createFriendship(req, res)
});

router.delete('/', (req, res) => {
    controller.deleteFriendship(req, res)
});
