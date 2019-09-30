var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const User = require('../models/User')

module.exports = {

    login: function(user_id, password, callback){
        console.log('login.... ' + password + '  '  + user_id);
        User.find({ user_id: user_id }, function(err, user) {

            console.log('########### ' + JSON.stringify(user));


            if(err){
                callback(err, null);
                return;
            }
            console.log('name  ' + user[0].name);
            console.log('password  ' + user[0].password);
            console.log('user_id  ' + user[0].user_id);
            console.log('email  ' + user[0].email);

            if(!user){
                //User not found
                callback(err, null);
            }else{
                console.log('user ' + user);
                user[0].comparePassword(password, function(err, isMatch) {

                    console.log('err ' + err);
                    console.log('isMatch ' + isMatch);
                    if(err){
                        callback(err, null);
                        return
                    }

                    if(isMatch){
                        var authToken = jwt.sign({ username: user[0].username, _id: user[0]._id}, process.env.JWTSECRET);
                        callback(null, authToken,user[0]);
                    }else{
                        callback(err, null,null);
                    }
                });
            };

        });
    },
    register: function(user, callback){
        console.log(user);
        var newUser = new User(user);

        console.log('newUser  ' + newUser);
        newUser.save(function(err, user) {
            console.debug('user created... ' + user);
            if(err){
                callback(err, null);
                return;
            }              

            var authToken = jwt.sign({'user_id':user.user_id,'name':user.name}, process.env.JWTSECRET);
            console.log('authToken ' + authToken);
            callback(null, authToken);
        });
    }
}
