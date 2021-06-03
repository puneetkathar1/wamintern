const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jsondata = new Schema({
    json: { type: Object }

});

module.exports = mongoose.model('chartData', jsondata);