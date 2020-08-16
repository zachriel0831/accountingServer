const express = require('express');
const router = express.Router();
const stocksService = require('../services/stocksService');


router.post('/get_stocks', function (req, res, next) {
    console.log('reqbody ' + req.body);
    stocksService.crawlStocks(req.body, function (err, results) {
        console.log(err);
        if (err) {
            console.log(err);
            res.json({
                success: 0,
                error: err
            });
            return;
        }
        console.log(results);
        res.json({
            success: 1,
            data:results,
        });
    });
});


module.exports = router;
