const mongoose = require('mongoose');

var CompanySchema = new mongoose.Schema({
    name: String,
    year: { type: Number, min:1900 },
    description: String
});

module.exports = mongoose.model('Company', CompanySchema);