const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  dob: { type: Date },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  classroom: { type: mongoose.Schema.Types.ObjectId, ref: 'Classroom', default: null },
  enrolledAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
