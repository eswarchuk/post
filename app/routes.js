var path = require('path');

// const transform = require('camaro')
// const rp = require('request-promise')
// const _ = require('lodash')

// rp('http://vhost11.lnu.se:20090/final/getFilterData.php?parameter=User_IDpatient&value=3')
//     .then(xml => {
//         return transform(xml, {
//             data: ['//test_datetime', {
//                 value: './text()'
//             }]
//         })
//     })
//     .then(json => _.groupBy(json.data, 'value'))
//     .then(grps => _.mapValues(grps, 'length'))

module.exports = function(app, passport) {

// d3.csv("http://vhost11.lnu.se:20090/assig2/data1.csv", function (data) {
//     var data1 = data;
//     datap2 = JSON.stringify(data1);
//     var datap3 = JSON.parse(datap2);
//     console.log(data[0]);
//     console.log(datap2[0]);
//     console.log(datap3[0]);
//     app.get('/doctor', isLoggedIn, function (req, res) {
//         res.render('doctor.ejs', {
//             user: req.user,
//             datap1: JSON.stringify(data1),
//             datap3
//         });
//     });
// });

// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	// ROLE VERIFICATION SECTION =========================
	/*app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});*/

	// PROFILE SECTION =========================
	// app.get('/role', isLoggedIn, function(req, res) {
	// 	var userid = req.param('userid');
	// 	if(userid == 1){
	// 		res.render('patient.ejs', {
	// 			user : req.user
	// 		});
	// 	}
	// 	else if(userid == 2){
	// 		res.render('doctor.ejs', {
	// 			user : req.user
	// 		});
	// 	}
	// 	else if(userid == 3){
	// 		res.render('researcher.ejs', {
	// 			user : req.user
	// 		});
	// 	}
	// 	else{
	// 		res.send ('Invalid user id');
	// 	}
		
	// 	});
	
	
	// app.get('/patient', isLoggedIn, function(req, res) {
	// 	res.render('patient.ejs', {
	// 		user : req.user
	// 	});
	// });
	
	app.get('/tweet', isLoggedIn, function(req, res) { 
        res.sendfile(path.resolve('views/twitter.html'), {
            user : req.user    
		});
	});

	// app.get('/doctor', isLoggedIn, function(req, res) {
	// 	res.render('patient.ejs', {
	// 		user : req.user,
	// 		data : data
	// 	});
	// });

	app.get('/researcher', isLoggedIn, function(req, res) { 
        res.sendfile(path.resolve('views/researcher.html'), {
            user : req.user     
		});
	});

	app.get('/doctor', isLoggedIn, function(req, res) { 
        res.sendfile(path.resolve('views/fbupload.html'), {
            user : req.user        
		});
	});

	// app.get('/data.csv', function(req, res) {
 //    fs.readFile(path.resolve('views/data.csv'), 'utf8', function (err, data) {
 //        res.send(data);
 //    	});
	// });

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login', function(req, res) {
			res.render('login.ejs', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup.ejs', { message: req.flash('loginMessage') });
		});

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/doctor',
				failureRedirect : '/'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

		// handle the callback after twitter has authenticated the user
		app.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : '/tweet',
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/researcher',
				failureRedirect : '/'
			}));


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
