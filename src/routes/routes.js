const express = require('express');
const router = express.Router();

const { scrapeData } = require('../datasource/scrappinData');

//
router.use(express.json());

router.get('/', (req, res) => { res.json( "DigabiRestaurantRobot API" ) });

router.get('/popular-dishes', (req, res) => {
    scrapeData()
    .then(result => res.json({ status: 200, message: result }))
    .catch(error => res.json({ status: 500, message: error }))    
});

module.exports = router;