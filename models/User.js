const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = bcrypt.genSaltSync(10);

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        index: { unique: true }
    },
    name: {
        type: String,
        index: { unique: true }
    },
    email: {
        type: String,
        index: { unique: true }
    },
    password: {
        type:String,
        index: { unique: false }
    },
    body: String,
    status: {
        type: Number,
        default: 1
    },
    created: {
        type: Date,
        required: true,
        default: new Date()
    }
});
UserSchema.methods.comparePassword = function comparePassword(password, callback) {
    //console.log('comparing password ' + password + ' and ' + this.password);
    let results = bcrypt.compareSync(password, this.password,callback);

    //console.log('results ' + results);

    if(results){
        callback(false,true);
    }else{
        callback(true,false)
    }


};

// On save, hash the password

UserSchema.pre('save', function saveHook(next) {

    //console.log('saving...' + next);
    var user = this;

    if(!user.isModified('password')){
        return next();
    }

    // return bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    //     if(err){ return next(err); }
    const hashed = bcrypt.hashSync(user.password,SALT_WORK_FACTOR);
          user.password = hashed;
          return next();
  // });
});



module.exports = mongoose.model('User', UserSchema);