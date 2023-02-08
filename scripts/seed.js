// scripts/seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const { connectMongoDB } = require('../config/db');
const { User } = require('../models/User.model');
const School = require('../models/School.model');
const Classroom = require('../models/Classroom.model');
const Student = require('../models/Student.model');
const { generateToken } = require('../services/auth.service');

async function main() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/axion';
  await connectMongoDB(uri);

  // Clean existing demo data (CAREFUL)
  await Promise.all([
    User.deleteMany({}),
    School.deleteMany({}),
    Classroom.deleteMany({}),
    Student.deleteMany({})
  ]);

  // Create superadmin
  const superadmin = await User.create({
    name: 'Super Admin',
    email: 'superadmin@example.com',
    password: 'SuperSecret123!',
    role: 'superadmin'
  });

  // Create a school
  const school = await School.create({
    name: 'Demo High School',
    address: '123 Demo Lane',
    phone: '+1-555-0000'
  });

  // Create a school admin tied to school
  const schoolAdmin = await User.create({
    name: 'School Admin',
    email: 'admin@demo.school',
    password: 'AdminPass123!',
    role: 'school_admin',
    school: school._id
  });

  // Attach admin to school
  school.admins = [schoolAdmin._id];
  await school.save();

  // Create a classroom
  const classroom = await Classroom.create({
    name: '10-A',
    school: school._id,
    capacity: 30,
    resources: ['projector', 'whiteboard']
  });

  // Create students
  const students = await Student.insertMany([
    { firstName: 'Alice', lastName: 'Smith', dob: '2010-02-10', school: school._id, classroom: classroom._id },
    { firstName: 'Bob', lastName: 'Jones', dob: '2010-06-22', school: school._id, classroom: classroom._id }
  ]);

  // Tokens for quick testing
  const superToken = generateToken(superadmin);
  const adminToken = generateToken(schoolAdmin);

  console.log('Seeding complete.');
  console.log('Superadmin credentials: email=superadmin@example.com password=SuperSecret123!');
  console.log('School admin credentials: email=admin@demo.school password=AdminPass123!');
  console.log('Superadmin token:\n', superToken);
  console.log('School admin token:\n', adminToken);

  await mongoose.connection.close();
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});