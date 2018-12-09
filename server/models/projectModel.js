/*schemas*/
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

/* 
ProjectSchema
*/
var ProjectSchema = new Schema({
  name: { type: String, unique: true,required:true},
  client_name: String,
  teamid:String,
  teamname:String,
  creatorID:String,
  description: String,
},{collection: 'projects'});


var Project = mongoose.model('Project', ProjectSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Project;
