var ObjectID = require('mongodb').ObjectID;
var mongodb = require('mongodb')
module.exports = function  (app) {
	app.post('/api/login', function  (req, res, next) {
		console.log("POST ", req.body);
		req.db.collection('user').findOne({"emailid" : req.body.emailid},{} ,function(err, result){
			console.log(err, result)
			if(err){
				console.log("some error occured : ", err);
				res.json(err);
			}
			else{
				res.json(result);
			}
		})
	})

	app.post('/api/update', function(req, res, next){
		if (req.body._id) {
		var id = new ObjectID(req.body._id);
		delete req.body._id;
		req.db.collection('user').findAndModify({"_id" : id}, {}, {"$set" : req.body}, {}, function(err, result){
			if(err){
				console.log("error occured : ", err);
			}
			else{
				console.log("successfully updated...");
			}
			res.json(result);
		})
	}
	})

	app.post('/api/delete', function(req, res, next){
		if (req.body._id) {
		var id = new ObjectID(req.body._id);
		delete req.body._id;
		console.log('request is : ', req.body);
		req.db.collection('user').removeOne({"_id" : id}, {}, function(err, result){
			if(err){
				console.log("error occured : ", err);
			}
			else{
				console.log("successfully deleted...");
			}
			res.json(result)
		})
	}
	})
	app.get('/api/myprofile', function(req, res, next){
		req.db.collection('user').findById(req.params.id, function(err, result){
			if(err){
				console.log("error occured ", err);
				res.json(err);
			}
			else{
				res.json(result);
			}
		})
	})

	app.post('/api/register', function (req, res, next){
		req.db.collection('user').insertOne(req.body, function(err, result){
			if(err){
				console.log("error occured", err);
				res.json(err);
			}
			else{
				console.log(result)
				res.json(result);
			}
		})
	})
}
