var bodyParser = require('body-parser');
var Boat       = require('./../models/Boat');
var SignInEntry = require('./../models/SignInEntry');
module.exports = function(app,express) {

	// server routes ===========================================================

	//all api calls will begin with <server>/api/
	var apiRouter = express.Router();
	apiRouter.use(function(req,res,next){
		console.log('someone has entered the API');
		next();
	});
	apiRouter.get('/',function(req,res){

		res.json({message: 'Welcome to the API!'});
	});
	
// API BOAT ROUTES
// ======================================
	//routes that end with boats
	apiRouter.route('/boats')
	// create a boat with POST
		.post(function(req, res) {

			var boat = new Boat(); //boat model
			boat.type = req.body.type; //boat category
			boat.name = req.body.name;  
			boat.weight = req.body.weight;  
			boat.priority = req.body.priority; 
			boat.status = req.body.status;  
			boat.reason = req.body.reason;  

			boat.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000)
						return res.json({ success: false, message: 'A boat with that name already exists. '});
					else
						return res.send(err);
				}

				// return a message
				res.json({ message: 'Boat added!' });
			});

		})
		.get(function(req,res){
			Boat.find({},function(err,boats){
				if(err){
					res.send(err);
				}
				res.json(boats);
			});
		});

	//single boats by user id
	apiRouter.route('/boats/:boat_id')

	// get the boat with that id
		.get(function(req, res) {
			Boat.findById(req.params.boat_id, function(err, boat) {
				if (err) res.send(err);

				// return that boat
				res.json(boat);
			});
		})

		// delete the boat with this id
		.delete(function(req, res) {
			Boat.remove({
				_id: req.params.boat_id
			}, function(err, boat) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});

// API Entry ROUTES
// ======================================
	//routes that end with signin

	apiRouter.route('/sign-in')

	.post(function(req, res) {

			var signInEntry = new SignInEntry(); //entrymodel
			signInEntry.date = req.body.date; 
			signInEntry.boat_type = req.body.boat_type; 
			signInEntry.boat_name = req.body.boat_name 
			signInEntry.bow= req.body.bow 
			signInEntry.rowers = req.body.rowers 
			signInEntry.miles= req.body.miles; 
			signInEntry.depart_time = req.body.depart_time;
			signInEntry.arrive_time= req.body.arrive_time; 
			signInEntry.comments = req.body.comments; 
			
			signInEntry.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000)
						return res.json({ success: false, message: 'A boat with that name already exists. '});
					else
						return res.send(err);
				}

				// success
				res.json({ message: 'Entry Submitted' });
			});

		})
		//get all boats
		.get(function(req,res){
			SignInEntry.find({},function(err,boats){
				if(err){
					res.send(err);
				}
				res.json(boats);
			});
		});

	//get a single entry by id
	apiRouter.route('/sign-in/:entry_id')

	// get the entry with that id
		.get(function(req, res) {
			SignInEntry.findById(req.params.entry_id, function(err, entry) {
				if (err) res.send(err);

				// return that entry
				res.json(entry);
			});
		})

		// delete the entry with this id
		.delete(function(req, res) {
			SignInEntry.remove({
				_id: req.params.entry_id
			}, function(err, entry) {
				if (err) res.send(err);

				res.json({ message: 'Successfully deleted' });
			});
		});




	return apiRouter;
};