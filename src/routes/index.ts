import * as express from 'express';
const router = express.Router();

router.get('/', function (req, res, next) {
    // res.json(repository.getComments());
    res.json({title: 'NoSQL IVT2 1920'});
});

export default router;
