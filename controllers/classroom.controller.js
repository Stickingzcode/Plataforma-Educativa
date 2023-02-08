const Classroom = require('../models/Classroom.model');

exports.createClassroom = async (req, res) => {
  try {
    const { school } = req.user;
    const data = { ...req.body, school };
    const classroom = await Classroom.create(data);
    res.status(201).json(classroom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getClassrooms = async (req, res) => {
  const query = {};
  if (req.user.role !== 'superadmin') query.school = req.user.school;
  const classrooms = await Classroom.find(query);
  res.json(classrooms);
};

exports.getClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'superadmin' && classroom.school.toString() !== req.user.school.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(classroom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'superadmin' && classroom.school.toString() !== req.user.school.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    Object.assign(classroom, req.body);
    await classroom.save();
    res.json(classroom);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteClassroom = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) return res.status(404).json({ message: 'Not found' });
    if (req.user.role !== 'superadmin' && classroom.school.toString() !== req.user.school.toString()) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await classroom.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
