const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ROLES = ['superadmin','school_admin','teacher','student'];

const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ROLES, default: 'student' },
  school: { type: mongoose.Schema.Types.ObjectId, ref: 'School', default: null }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = function(plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = { User: mongoose.model('User', UserSchema), ROLES };
