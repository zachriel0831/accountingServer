const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const accountingController = require('../controllers/accountingController')

router.post('/home_initView', function (req, res, next) {
  console.log('reqbody ' + req.body);
  let data = {};

  userController.find(req.body, function (err, results) {
    if (err) {
      console.log(err);
      res.json({
        success: 0,
        error: err
      });
      return;
    }

    data.userDetail = results;
    console.log('data.userDetail.user_id ' + data.userDetail[0].user_id);

    accountingController.find(data.userDetail[0].user_id, function (err, results) {
      if (err) {
        console.log(err);
        res.json({
          success: 0,
          error: err
        });
        return;
      }

      data.accountDetail = results;
      console.log('data.accountDetail ' + data.accountDetail);

      res.json({
        success: 1,
        data: data
      });
    })
  });




});

// router.get('/:id', function (req, res, next) {
//   const id = req.params.id;

//   userController.findById(id, function (err, result) {

//     if (err) {
//       console.log(err);
//       res.status(500).json({
//         success: 0,
//         data: result
//       });
//       return;
//     }

//     res.status(200).json({
//       success: 1,
//       data: result
//     });
//   });
// });

router.post('/newUsers', function (req, res, next) {
  userController.subscribeUser(req.body, function (err, result) {
    if (err) {
      console.log(err);
      res.json({
        success: 0,
        error: err
      })
      return;
    }

    res.json({
      success: 1,
      data: result
    });
  });
});

module.exports = router;
