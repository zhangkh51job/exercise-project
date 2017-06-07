var util = require('util');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    userName:String,
    password:String,
    email:String,
    create_date: { type: Date, default: Date.now }
});
//访问todo对象模型


/*exports.findObj = */userSchema.methods.findObj = function(obj, callback) {
    return this.model('user').find(obj, callback);
};
mongoose.model('user', userSchema);

exports.findObj = userSchema.methods.findObj;
/*module.exports*/exports.Schema =function (modelName){
    return {model: mongoose.model(modelName)};
};
