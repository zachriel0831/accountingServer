const express = require('express');
const router = express.Router();
const currencyService = require('../services/currencyService');


router.get('/get_currency', function (req, res, next) {
    // console.log('reqbody ' + req.body);
    currencyService.crawlCurrency(req.body, function (err, results) {
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
            data: results
        });
    });
});

router.get('/heroku_wakeup_signal', function (req, res, next) {
    // console.log('reqbody ' + req.body);
    currencyService.wakeup(req.body, function (err, results) {
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
            data: results
        });
    });
});

module.exports = router;
