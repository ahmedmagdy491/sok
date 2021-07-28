var adminFb = require('firebase-admin');

var serviceAccount = require('../config/fbServiceAccountKey.json');

adminFb.initializeApp({
	credential: adminFb.credential.cert(serviceAccount),
});

module.exports = adminFb;
