import * as express from 'express';
const router = express.Router();
const controller = require('../controllers/controllers.bin').friendController;

// #Neo4J

router.post('/', (req, res) => {
    controller.createFriendship(req, res)
});

router.delete('/', (req, res, next) => {
   // Get user1, user2
   // If not exist, return 200

});
