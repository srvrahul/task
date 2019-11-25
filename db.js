var mongoose = require('mongoose');

exports.mongoose=mongoose;
var mongodbURL = "mongodb://localhost:27017/usersDb"
var mongodbOptions = {useUnifiedTopology: true,useNewUrlParser: true };
var Schema = mongoose.Schema;

mongoose.connect(mongodbURL, mongodbOptions, function (err, res) {
    if (err) {
        console.log('Connection refused to ' + mongodbURL);
        console.log(err);
    }
    else {
        console.log('Connection successful to: ' + mongodbURL);
    }
});

// User Schema
var UserSchema = new Schema({

    userName: {
        type:String
    },
    mobileNumber:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false,
        required:true
    },

    createdDate:{
        type:Date,
        default:Date.now,
        required:true
    }

})

exports.User = mongoose.model('User', UserSchema, 'users');


var UserRoleSchema = new Schema({
    refeUserId:{
        type: Schema.Types.ObjectId,
         ref: 'User'
    },
    role:{
        type:String
    }

})

exports.UserRoleSchema = mongoose.model('UserRoleSchema', UserRoleSchema, 'userroles');

