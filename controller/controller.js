var conrollerCtrl = function () { }
var mongoose = require("mongoose")
  , Admin = mongoose.mongo.Admin;
var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var config = require('../config/config');
var jwt = require('jsonwebtoken');

mongoose.connect("mongodb://127.0.0.1/myChat");

conrollerCtrl.prototype.get = function (req, res, next) {
  try {
    Schema = mongoose.Schema;
    var CollectionSchema = new Schema(Schema.Types.Mixed, { strict: false });
    var Collection = mongoose.model(req.params.collection, CollectionSchema);
  }
  catch (e) {
    var Collection = mongoose.model(req.params.collection);
  }
  Collection.find(function (err, doc) {
    if (err) console.log(err);
    res.send(doc).end();
  })
}


conrollerCtrl.prototype.getById = function (req, res, next) {
  try {
    Schema = mongoose.Schema;
    var CollectionSchema = new Schema(Schema.Types.Mixed, { strict: false });
    var Collection = mongoose.model(req.params.collection, CollectionSchema);
  }
  catch (e) {
    var Collection = mongoose.model(req.params.collection);
  }
  Collection.findById(req.params.id, function (err, doc) {
    if (err) console.log(err);
    res.send(doc).end();
  })
}

conrollerCtrl.prototype.post = function (req, res, next) {
  try {
    Schema = mongoose.Schema;
    var CollectionSchema = new Schema(Schema.Types.Mixed, { strict: false });
    var Collection = mongoose.model(req.params.collection, CollectionSchema);
  }
  catch (e) {
    var Collection = mongoose.model(req.params.collection);
  }
  var col = new Collection(req.body);
  col.save(function (err, doc) {
    if (err) console.log(err);
    res.send(doc).end();
  })
}


conrollerCtrl.prototype.put = function (req, res, next) {
  try {
    Schema = mongoose.Schema;
    var CollectionSchema = new Schema(Schema.Types.Mixed, { strict: false });
    var Collection = mongoose.model(req.params.collection, CollectionSchema);
  }
  catch (e) {
    var Collection = mongoose.model(req.params.collection);
  }
  Collection.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (er, dt) {
    if (er) {
      console.log('error occured..' + er);
    }
    res.send(dt).end();
  });
}


conrollerCtrl.prototype.delete = function (req, res, next) {
  try {
    Schema = mongoose.Schema;
    var CollectionSchema = new Schema(Schema.Types.Mixed, { strict: false });
    var Collection = mongoose.model(req.params.collection, CollectionSchema);
  } catch (e) {
    var Collection = mongoose.model(req.params.collection);
  }
  Collection.findByIdAndRemove({ _id: req.params.id }, function (er, dt) {
    if (er) {
      console.log('error occured..' + er);
    }
    else {
      return res.send(dt).end();
    }
  });
}

conrollerCtrl.prototype.signup = function (req, res) {
  var u = {
    fname: req.body.fname,
    lname: req.body.lname,
    username: req.body.username
  }
  User.register(new User(u), req.body.password, function (err, user) {
    if (err) {
      return res.send(err);
    }
    var token = jwt.sign({ _id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });
    return res.status(200).send({ auth: true, token: token , user:user});
  });
}

conrollerCtrl.prototype.signin = function (req, res) {
  passport.authenticate('local')(req, res, function () {
    if (req.user) {
      var token = jwt.sign({ _id: req.user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token , user:req.user});

    } else {
      res.send("O_o! Wrong")
    }
  });
}

module.exports = new conrollerCtrl();
