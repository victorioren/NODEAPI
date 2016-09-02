// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var signInEntrySchema = new Schema({
    date: Date,
    boat_type: String,
    boat_name: String,
    bow: String,
    rowers: Array,
    miles: Number,
    depart_time: Date,
    arrive_time: Date,
    comments: String
});

var SignInEntry = mongoose.model('SignInEntry',signInEntrySchema);

module.exports = SignInEntry;

