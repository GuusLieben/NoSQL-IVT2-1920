import * as express from 'express';
import {logger} from "../app";
export const router = express.Router();
const controller = require('../controllers/controllers.bin').userController;

// #MongoDB

router.get('/:username/', (req, res, next) => {
    // Return
});

// Ex.: localhost:3000/user/guuslieben/friends
router.get('/:username/friends/',  (req, res) => {
    controller.getFriends(req, res);
});

router.post('/', (req, res, next) => {
   // Unique username, require password
});

router.put('/:username/', (req, res, next) => {
   // Look for username, oldPass, newPass
   // Require oldPass to be equal to user pass, if not return error status 401
});

router.delete('/:username/', (req, res, next) => {
    // Look for username, password
    // Require password to be equal to user pass, if not return error status 401
});
