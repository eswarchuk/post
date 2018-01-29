// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '522849511393597', // your App ID
		'clientSecret' 	: '87f82d5300d0fffa11cec39cef055a61', // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'X2WsERUc1mDmeHigMLVI56cN5',
		'consumerSecret' 	: 'c1wy3PDckEoCUClsuNIT0tNZ4aP7ID3M1yeEtUSYZG19PXGeYf',
		'callbackURL' 		: 'https://tweetpic.herokuapp.com/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: '720891736612-1ohss9cpg61dbl8tfqkdv6ttd087up3j.apps.googleusercontent.com',
		'clientSecret' 	: 'L8cW1tLe_HbETtdLo3WDeffP',
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};
