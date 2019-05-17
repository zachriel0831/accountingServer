var express = require('express')
var router = express.Router()
var authController = require('../controllers/authController')

router.post('/login', function(req, res, next) {
    authController.login(req.body.user_id, req.body.password, function(err, result,userData){
        if(err){  
            console.log(err);
            res.status(500).json({
                success: 0,
                error: err
            })
            return;
        }

        if(result){
            res.status(200).json({
                success: 1,
                data: {tokenID: result, userData: userData}
            });
        }else{
            res.status(401).json({
                success: 0,
                data: result
            });
        }
    });
});

router.post('/registering', function(req, res, next) {
    console.log('registering... ' + req);
    authController.register(req.body, function(err, result){
        if(err){  
            console.log(err);
            res.status(500).json({
                success: 0,
                error: err
            })
            return;
        }
        console.log('result ' + result) ;
        if(result){
            res.status(200).json({
                success: 1,
                data: {tokenID: result, userData: req.body}
            });
        }else{
            res.status(401).json({
                success: 0,
                data: result
            });
        }
    });

});

module.exports = router
