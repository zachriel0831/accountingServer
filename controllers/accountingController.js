const Accounting = require('../models/Accounting')

module.exports = {
    find: function (user_id, callback) {
        Accounting.find({ user_id: user_id }, function (err, results) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    },

    findByItemName: function (itemName, callback) {
        Accounting.find({ itemName: itemName }, function (err, results) {
            if (err) {
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    },

    newAccountingItem: function (params, callback) {

        Accounting.create(params, function (err, result) {
            //console.log('result ' + result);

            if (err) {
                console.log('err ' + err);
                callback(err, null);
                return
            }
            callback(null, result);
        });
    },
    deleteItem: function (data, callback) {
        //console.log('data._id ' + data._id);
        Accounting.findByIdAndDelete({ _id: data._id }, function (err, result) {
            //console.log('deleted result ' + result);

            if (err) {
                console.log('err ' + err);
                callback(err, null);
                return
            }
            callback(null, result);
        });
    },
    updateItem: function (data, callback) {
        Accounting.findByIdAndUpdate({ _id: data._id },data, function (err, result) {
            console.log('data._id ' + data._id);


            if (err) {
                console.log('err ' + err);
                callback(err, null);
                return
            }

            callback(null, result);
        })


    }
}
