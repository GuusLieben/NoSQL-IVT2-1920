import * as express from 'express';
const router = express.Router();
import {mongoRepository} from '../services/service'

router.get('/', function (req, res, next) {
    // res.json(repository.getComments());
    res.json({title: 'NoSQL IVT2 1920'});
});

export default router;
