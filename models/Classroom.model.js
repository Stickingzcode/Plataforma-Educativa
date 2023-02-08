const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true },
  capacity: { type: Number, default: 30 },
  resources: [{ type: String }],
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }
}, { timestamps: true });

module.exports = mongoose.model('Classroom', ClassroomSchema);
