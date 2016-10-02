'use strict';

var _ = require('lodash');
var Category = require('./category.model');
var moment = require('moment');

// Get list of categorys
exports.index = function(req, res) {

  
  var condition = { active : true };
   Category.find(condition)
                      .populate([{ path: 'parent',  model: 'Category'}])
                      .exec(function (err, categorys) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(categorys);
  });
  // Category.find(function (err, categorys) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(200).json(categorys);
  // });
};

// Get a single category
exports.show = function(req, res) {
  Category.findById(req.params.id)
                    .populate([{ path: 'parent',  model: 'Category'}])
                    .exec(function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    return res.json(category);
  });
};

exports.showSubCategory = function(req, res){
  Category.find({active : true,
                  parent : req.params.id})
                  .populate([{path : 'parent', model : 'Category'}])
                  .exec(function (err, subcategory){
  if(err){return handleError(res, err);}
  if(!subcategory){return res.status(404).send('Not Found'); }
  return res.json(subcategory);
});
}

// Creates a new category in the DB.
exports.create = function(req, res) {
  console.log("request body is : ", req.body);
  Category.create(req.body, function(err, category) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(category);
  });
};

// Updates an existing category in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Category.findById(req.params.id, function (err, category) {
    if (err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }

    var updated = _.merge(category, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(category);
    });
  });
};

// Deletes a category from the DB.
exports.destroy = function(req, res) {

  Category.findById(req.params.id, function (err, category) {
    if(err) { return handleError(res, err); }
    if(!category) { return res.status(404).send('Not Found'); }
    category.active = false;
    category.save(function (err,category) {
      if (err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });

};

exports.profileupload = function(req, res ) {

  var multiparty = require('multiparty');
  var gm = require('gm');
  var fs = require('fs');
  var form = new multiparty.Form();

  form.uploadDir = process.cwd();


  var size = '';
  var filename = '';
  form.on('part', function(part){
      if(!part.filename) return;
      size = part.byteCount;
      fileName = part.filename;
      console.log(fileName);
  });
  
  form.on('file', function(name,file){
//................Replacing original name with the time stamp....................
  var currentTime = moment();//.format('YYYYMMddmmhhssSSS');
  var namesplit = file.originalFilename.split(".");
  var filetype = namesplit[namesplit.length-1];
  console.log("file type is : ", filetype);
  console.log(" current time "+currentTime);
  var nametimestamp = currentTime+'.'+filetype;
  console.log("finally the name with timestamp is : ", nametimestamp);
  file.originalFilename = nametimestamp;
  console.log("after changing time stamp name is : ", file.originalFilename);
  //..............................................................................
      console.log('filename: ' + file.originalFilename);
      console.log('fileSize: '+ (file.size / 1024));
      var tmp_path = file.path;
      var target_path = process.cwd()+ '/uploads/ups/icons/' + nametimestamp;
      //var thumbPath = '/uploads/thumbs/';

	console.log("tmp_path : " + tmp_path);
	console.log("target_path: "+ target_path);      

	fs.rename(tmp_path, target_path, function(err) {
          if(err){ 
            console.error(err);
          }
          else{
            console.log("fs.rename  completed...");
            fs.chmod(target_path, '777', function(err){
                if(err){
                  console.log("error while issuing permission : ", err);
                }
                else{
                  console.log("successful in issuing the permission");
		  //res.send("done");
                }
            });
          }
      });
  });

form.parse(req , function(err, fields, files) {
  Object.keys(fields).forEach(function(name) {
    console.log('got field named ' + name);
  });
 var categorynumberarray = [];
  Object.keys(files).forEach(function(name) {
   
       var filename = []
        filename =  files[name];

        filename.filter(function(item){
         var itemlist = item.originalFilename;
         categorynumberarray.push(itemlist);
        });
  });
 
  console.log('Upload completed!');
  // res.end('Received ' + categorynumberarray + ' files');
  res.json({msg:"files Received", data: categorynumberarray, flag:1});
});
  
};


function handleError(res, err) {
  return res.status(500).send(err);
}
