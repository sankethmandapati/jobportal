'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: String,
  description: String,
  icon : [{}],
  parent : { type: mongoose.Schema.Types.ObjectId},
  layout : String,
 active: { type : Boolean, default : true } // for delete product
 
});

module.exports = mongoose.model('Category', CategorySchema);