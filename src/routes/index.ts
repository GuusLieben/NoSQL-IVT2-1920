import * as express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
    // res.json(repository.getComments());
    res.json(
        {
            title: 'NoSQL IVT2 1920',
            authors: [
                {
                    name: 'Guus Lieben',
                    id: 2139026
                },
                {
                    name: 'Tim van Wouwe',
                    id: 2123985
                }
            ],
            teachers: [{
                naam: 'Jan Montizaan'
            }]
        });
});

export default router;
