// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// define our nerd model
// module.exports allows us to pass this to other files when it is called
var boatSchema = new Schema({
	type: String,
	name: String,
	weight: String,
	priority: Number,
	status: Number,
	reason: String
});

var Boat = mongoose.model('Boat',boatSchema);

module.exports = Boat;
