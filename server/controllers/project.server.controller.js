//© 2018 kaboom18 
//All rights reserved.

/* Dependencies */
var mongoose = require('mongoose'), 
    Project = require('../models/projectModel.js'),
    Team = require('../models/teamModel.js'),
    ReadProjectModel = require('../models/projectModel.js');

exports.read = function(req, res) {
    var projectId = req.params.projectId;

    ReadProjectModel.findById(projectId).exec(function(err, project) {
        if (err) {
            console.log(err);
            res.status(404).send(err);
        } else {
            res.json(project);
        }
    });
}

exports.list_members = function(req, res) {

	
	var projectId = req.params.projectId;
	console.log(projectId);
	Project.findById(projectId).exec(function(err, project) {
        if (err) {
            console.log(err);
            res.status(404).send(err);
        } 
	else {
	console.log(project);
          Team.findById(project["teamid"]).exec(function (err, team) {
	if (err) {
            console.log(err);
            res.status(404).send(err);
        	}
	else{
			try{
			var list=team["members"]
			list.push(project["creatorID"]);
			}
			catch
			{
			var list=[]
	    		list.push(project["creatorID"]);
			}
			res.status(200).send({list:list})
		}
	
	   })
        }
    })


};

/* create project */
exports.create = function(req, res) {

    var project= new Project({ name:req.params.title,creatorID: req.params.creator, description:req.params.descr})
    console.log(project);
    project.save(function (err, response) {
        if (err) {console.error(err); res.status(404).send(err);}
        else {
        console.log(req.params.title);
        console.log(response);
        res.status(200).send({res:'project created',id:response})
        }
      });
    
    
    };
    
