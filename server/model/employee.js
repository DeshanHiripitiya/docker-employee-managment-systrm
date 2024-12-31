const mongoose = require('mongoose');

// employee schema
const employeeSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String },
  Role: { type: String },
  Department: { type: String },
});

module.exports = mongoose.model('Employee', employeeSchema);
