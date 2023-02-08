const Student = require('../models/Student.model');

exports.createStudent = async (req, res) => {
  try {
    const { school } = req.user;
    const data = { ...req.body, school };
    const student = await Student.create(data);
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getStudents = async (req, res) => {
  const query = {};
  if (req.user.role !== 'superadmin') query.school = req.user.school;
  const students = await Student.find(query);
  res.json(students);
};

exports.getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'superadmin' && student.school.toString() !== req.user.school.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'superadmin' && student.school.toString() !== req.user.school.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    Object.assign(student, req.body);
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'superadmin' && student.school.toString() !== req.user.school.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await student.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
