const User = require('../models/User')

module.exports = {
    find: function(params, callback){
        User.find({ name: params.username}, function(err, results){
            if(err){
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    },

    findById: function(user_id, callback){
        User.findById(user_id, function(err, results){
            if(err){
                callback(err, null);
                return;
            }
            callback(null, results);
        })
    },

    subscribeUser: function(params, callback){
        console.log(params.user_id);
        console.log(params.email);
        console.log(params.name);
        console.log(params.password);
        
        
        User.create(params, function(err, result){
            console.log('result ' + result );
            
            if(err){
                console.log('err ' + err);
                callback(err, null);
                return
            }
            callback(null, result);
        });
    },

}
