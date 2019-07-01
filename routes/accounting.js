const express = require('express');
const router = express.Router();
const accountingController = require('../controllers/accountingController')

router.post('/getAccountingDetail', function (req, res, next) {
    console.clear('reqbody ' +req.body);
    accountingController.find(req.body, function (err, results) {
    if (err) {
      console.log(err);
      res.json({
        success: 0,
        error: err
      });
      return;
    }
    res.json({
      success: 1,
      data: results
    });
  });
});

router.post('/newAccounting', function(req, res, next) {

    //console.log('reqbody ' +req.body);

    accountingController.newAccountingItem(req.body, function(err, result){
      if(err){  
          console.log(err);
          res.json({
              success: 0,
              error: err
          })
          return;
      }

      accountingController.find(req.body.user_id, function (err, results) {
        if (err) {
          console.log(err);
          res.json({
            success: 0,
            error: err
          });
          return;
        }
        res.json({
          success: 1,
          data: results
        });
      });    

  });
});

router.post('/deleting', function(req, res, next) {

    //console.log('reqbody ' +req.body);

    accountingController.deleteItem(req.body, function(err, result){
      if(err){  
          console.log(err);
          res.json({
              success: 0,
              error: err
          })
          return;
      }

      accountingController.find(req.body.user_id, function (err, results) {
        if (err) {
          console.log(err);
          res.json({
            success: 0,
            error: err
          });
          return;
        }
        res.json({
          success: 1,
          data: results
        });
      });    

  });
});


router.post('/updating', function(req, res, next) {

    //console.log('reqbody ' +req.body);

    accountingController.updateItem(req.body, function(err, result){
      if(err){  
          console.log(err);
          res.json({
              success: 0,
              error: err
          })
          return;
      }

      accountingController.find(req.body.user_id, function (err, results) {
        if (err) {
          console.log(err);
          res.json({
            success: 0,
            error: err
          });
          return;
        }
        res.json({
          success: 1,
          data: results
        });
      });    

  });
});
  
module.exports = router;
