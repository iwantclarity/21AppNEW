var express = require('express');
var router = express.Router();
var burger = require('../models/burger.js');
var nodemailer = require('nodemailer');
var path = require('path');
//get route -> index
router.get('/', function(req,res) {

	// Logging each request
	console.log("URL requested: "+req.url);

	//express callback response by calling burger.selectAllBurger
	burger.selectAllBurger(function(burger_data){
		//wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
		res.render('index', {burger_data});
	});
});

//post route -> back to index
router.post('/auth', function(req, res) {

	// Logging each request
	console.log("URL requested: "+req.url);

	//takes the request object using it as input for buger.addBurger
	burger.addBurger(req.body.burger, function(result){
		//wrapper for orm.js that using MySQL insert callback will return a log to console, render back to index with handle
		console.log(result);
		res.redirect('/');
	});
});

//put route -> back to index
router.put('/update', function(req,res){
	burger.eatBurger(req.body.burger_id, function(result){

		// Logging each request
		console.log("URL requested: "+req.url);

		//wrapper for orm.js that using MySQL update callback will return a log to console, render back to index with handle
		console.log(result);
		res.redirect('/');
	});
});

//get route -> about
router.get('/info', function(req,res) {

	// Logging each request
	console.log("URL requested: "+req.url);

	res.sendFile(path.join(__dirname + '/../public/info.html'));
});

router.get('/home', function(req,res) {

	// Logging each request
	console.log("URL requested: "+req.url);

	res.sendFile(path.join(__dirname + '/../public/home.html'));
})

router.get('/index', function(req,res) {

	// Logging each request
	console.log("URL requested: "+req.url);

	res.sendFile(path.join(__dirname + '/../public/index.html'));
});

router.get('/world', function(req,res) {

	// Logging each request
	console.log("URL requested: "+req.url);

	res.sendFile(path.join(__dirname + '/../public/world.html'));
});

router.get('/support', function(req,res) {

	// Logging each request
	console.log("URL requested: "+req.url);

	res.sendFile(path.join(__dirname + '/../public/support.html'));
});


//get route -> recent
router.get('/recent', function(req,res) {

	burger.selectAllBurger(function(recents_data){
		//wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
		res.render('recent', {recents_data});
	});

	// Logging each request
	console.log("URL requested: "+req.url);

	//			res.render('recent');
});

//get route -> contact-us
router.get('/contact-us', function(req,res) {

	// Logging each request
	console.log("URL requested: "+req.url);

	res.render('contact-us');
});


//get route -> contact-us-process
router.get('/contact-us-process', function(req,res) {

	// Logging each request
	console.log("URL requested: "+req.url);

	// create reusable transporter object using the default SMTP transport
	var transporter = nodemailer.createTransport('smtps://rcbtestemailer%40gmail.com:thisisthepassword@smtp.gmail.com');
//	console.log(transporter);

	// setup e-mail data with unicode symbols
	var mailOptions = {
		to: '"Eat-Da-Burger" <rcbtestemailer@gmail.com>', // sender address
		from: req.query.name+', '+req.query.email, // list of receivers
		subject: 'Eat-Da-Burger Suggestion From '+req.query.name, // Subject line
		text: req.query.comments, // plaintext body
		html: '<b>'+req.query.comments+'</b>' // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			var error = "Oops! There was a an error. Please try again.";
			res.render('contact-us',{error});
		}else{
			var success = "Success! Thanks for your suggestion.";
			console.log('Message sent: ' + info.response);
			res.render('contact-us',{success});
		}

	});


	});


module.exports = router;
