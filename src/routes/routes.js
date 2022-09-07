const express = require('express');
const router = express.Router();
const { writeError } = require('../../utils/handle/logger.handle');
const { downloadInfo } = require('../controller/scrap.controller');

//
router.use(express.json());

router.get('/', (req, res) => { res.json( "DigabiRestaurantRobot API" ) });

router.get('/download-info', (req, res) => {
    downloadInfo()
    .then(result => res.json({ status: 200, message: result }))
    .catch(error => {
        //Control-error
        writeError(error);

        //Response
        res.json({ status: 500, message: error })
    })    
});

module.exports = router;