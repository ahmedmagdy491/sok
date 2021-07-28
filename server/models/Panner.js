const mongoose = require('mongoose');

const pannerSchema = mongoose.Schema([{ image: String }]);

const Panner = mongoose.model('Panner', pannerSchema);
module.exports = Panner;
