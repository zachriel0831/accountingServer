const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/getUserDetailByName', function (req, res, next) {
    console.clear('reqbody ' +req.body);
  userController.find(req.body, function (err, results) {
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

router.post('/newUsers', function(req, res, next) {
  userController.subscribeUser(req.body, function(err, result){
      if(err){  
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
