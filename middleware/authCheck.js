const jwt = require('jsonwebtoken');
const User = require('../models/User');


module.exports = (req, res, next) => {
	//console.log('req ' + req);
	//console.log('res ' + res);
	//console.log('authorization ' + req.headers.authorization);

	if (!req.headers.authorization) {
		return res.status(401).end();
	}

	const token = req.headers.authorization.split(' ')[1];
	//console.log('token ' + token);

	return jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
		console.log('err ' + err);
		if (err) { 
			return res.status(401).end(); 
		}

		req.userData = {};
		req.userData.tokenID  = token;
		req.userData.userid = decoded._id;
		req.userData.username = decoded.name;

		//console.log('decode _id ' + decoded);
		//console.log('decode _id ' + decoded._id);
		//console.log('decode username ' + decoded.name);

	  	return next();
	});
};
