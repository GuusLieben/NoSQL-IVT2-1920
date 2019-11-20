import * as express from 'express';
export const router = express.Router();
const controller = require('../controllers/controllers.bin').userController;


router.get('/:username/', (req, res) => {
    controller.getUser(req, res);
});

router.get('/:username/friends/',  (req, res) => {
    controller.getFriends(req, res);
});

router.post('/', (req, res) => {
    controller.createUser(req, res);
});

router.put('/:username/', (req, res) => {
    controller.updateUser(req, res);
});

router.delete('/:username/', (req, res, next) => {
    controller.deleteUser(req, res);
});
