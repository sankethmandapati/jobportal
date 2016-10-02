var MongoClient = require('mongodb').MongoClient;
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })
// Connection URL
var url = 'mongodb://localhost:27017/jobportal';
/* GET home page. */


module.exports = function  (app) {
	app.get('/', function(req, res, next) {
	  res.send('public/index.html');
	});
	//List category
	app.get('/api/categories', function  (req, res, next) {
	    req.db.collection('categories').find().toArray(function(err, docs)  {			
			res.json(docs);
		});	
	});
	//IT Jobs
	app.get('/api/itjobs', function(req, res, next){
		req.db.collection('it').find().toArray(function(err, docs){
			res.json(docs);
		});
	});
	app.get('/api/govtjobs', function(req, res, next){
		req.db.collection('govt').find().toArray(function(err, docs){
			res.json(docs);
		})
	})
	app.get('/api/enggjobs', function(req, res, next){
		req.db.collection('engg').find().toArray(function(err, docs){
			res.json(docs);
		})
	})
	app.post('/api/upload', upload.single("file"), function (req, res, next) {

	  res.json(req.body);
	});
};
