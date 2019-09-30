const express = require('express');
const router = express.Router();
const accountingController = require('../controllers/accountingController')

router.post('/ntdtransfer_1_init', function (req, res, next) {
    console.clear('reqbody ' +req.body);

    let results = {};

    results.userAccount = '5050-50-66684-8-00';
    results.balance = '5,32,577,972';
    results.free = '4';

    results.branch = [
        {
            label: '700 郵局',
            value: '700'
        },
        {
            label: '787 北祥',
            value: '787'
        }];

    results.accountList = [

        {
            label: "5050-50-2441-1-00 北祥銀行",
            value: "50505066684800$$$TWD$$$8787",
            groupKey: "787"
        },
        {
            label: "6446-63-124554-8-78 內湖郵局",
            value: "50505066684800$$$TWD$$$8787",
            groupKey: "700"
        },]


    res.json({
        success: 1,
        data: results
      });
  
});

router.post('/ntdtransfer_1_doAction', function (req, res, next) {
    console.clear('reqbody ' +req.body);

    let results = {};

    results.securityParam = { phone: "0944567244" };



    res.json({
        success: 1,
        data: results
      });
  
});

router.post('/ntdtransfer_2_doAction', function (req, res, next) {
    console.clear('reqbody ' +req.body);

    let results = {};
    results.userAccount = '5050-50-66684-8-00',

        results.branchName = '郵局 700',
        results.trnAcct = '6446-63-124554-8-78',

        results.amount = '5000',
        results.trnType = '即時轉帳',
        results.txdate = '2019/05/30',
        results.remark = '',



    res.json({
        success: 1,
        data: results
      });
  
});

router.post('/ntdtransfer_3_doAction', function (req, res, next) {
    console.clear('reqbody ' +req.body);

    let results = {};
    results.userAccount = '5050-50-66684-8-00',
    results.trnAcct = '6446-63-124554-8-78',
    results.amount = '5000',
    results.trnType = '即時轉帳',
    results.txdate = '2019/05/30',
    results.branchName = '郵局 700',
    results.remark = '',




    res.json({
        success: 1,
        data: results
      });
  
});

module.exports = router;
