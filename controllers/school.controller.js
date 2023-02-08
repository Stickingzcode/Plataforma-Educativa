const School = require('../models/School.model');

exports.createSchool = async (req, res) => {
  try {
    const school = await School.create(req.body);
    res.status(201).json(school);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getSchools = async (req, res) => {
  const schools = await School.find();
  res.json(schools);
};

exports.getSchool = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: 'Not found' });
    res.json(school);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!school) return res.status(404).json({ message: 'Not found' });
    res.json(school);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteSchool = async (req, res) => {
  try {
    const school = await School.findByIdAndDelete(req.params.id);
    if (!school) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
