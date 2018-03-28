
var express = require('express');
var passport = require('passport');
var router = express.Router();
var controller = require('../controller/controller');
var jwt = require('jsonwebtoken');
var config = require('../config/config');

router.get('/', function (req, res) {
    res.send("Hey Got Get Req //")
});

router.post('/signup', controller.signup);

router.post('/signin', controller.signin);
router.post('/api/verify', function(req, res) {
    var token = req.body.token;
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      res.status(200).send(decoded);
    });
  });
router.get('/logout', function (req, res) {
    req.logout();
    res.send("O_o! logOut")
});
// router.get('/api/:ip',controller.db);
// router.get('/api/:ip/:db',controller.collection);
router.get('/api/:collection', verify, controller.get);
router.get('/api/:collection/:id', verify, controller.getById);
// router.get('/api/:collection/:populate/:id',controller.populate);
router.post('/api/:collection', verify, controller.post);
router.put('/api/:collection/:id', verify, controller.put);
router.delete('/api/:collection/:id', verify, controller.delete);

function verify(req,res,next) {
    var token = req.headers['Authorization'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        next();
    });
};

module.exports = router;