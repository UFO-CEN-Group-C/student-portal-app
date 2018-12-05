//© 2018 kaboom18 
//All rights reserved.

/* Dependencies */
var mongoose = require('mongoose'), 
    Project = require('../models/projectModel.js');
var ReadProjectModel = require('../models/project.server.model');

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

/* create project */
exports.create = function(req, res) {

    var project= new Project({ name:req.params.title,creatorID: req.params.creator, Description:req.params.descr})
    console.log(project);
    project.save(function (err, entry) {
        if (err) {console.error(err); res.status(404).send(err);}
        else {
        console.log(req.params.title);
        console.log(entry[0]);
        res.status(200).send({res:'project created',id:entry[0]})
        }
      });
    
    
    };
    
