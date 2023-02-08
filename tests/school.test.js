const { createSchool, getSchools, getSchool, updateSchool, deleteSchool } = require('../controllers/school.controller');
const School = require('../models/School.model');

jest.mock('../models/School.model');

describe('School Controller', () => {
  beforeEach(() => jest.clearAllMocks());

  test('createSchool creates and returns school', async () => {
    const mockSchool = { _id: '1', name: 'Test School' };
    School.create.mockResolvedValue(mockSchool);

    const req = { body: { name: 'Test School' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await createSchool(req, res);

    expect(School.create).toHaveBeenCalledWith({ name: 'Test School' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockSchool);
  });

  test('getSchools returns all schools', async () => {
    const mockSchools = [{ _id: '1', name: 'School 1' }, { _id: '2', name: 'School 2' }];
    School.find.mockResolvedValue(mockSchools);

    const req = {};
    const res = { json: jest.fn() };

    await getSchools(req, res);

    expect(School.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockSchools);
  });

  test('getSchool returns school by id', async () => {
    const mockSchool = { _id: '1', name: 'Test School' };
    School.findById.mockResolvedValue(mockSchool);

    const req = { params: { id: '1' } };
    const res = { json: jest.fn() };

    await getSchool(req, res);

    expect(School.findById).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith(mockSchool);
  });

  test('getSchool returns 404 for missing school', async () => {
    School.findById.mockResolvedValue(null);

    const req = { params: { id: '999' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await getSchool(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Not found' });
  });

  test('updateSchool updates and returns school', async () => {
    const mockSchool = { _id: '1', name: 'Updated School' };
    School.findByIdAndUpdate.mockResolvedValue(mockSchool);

    const req = { params: { id: '1' }, body: { name: 'Updated School' } };
    const res = { json: jest.fn() };

    await updateSchool(req, res);

    expect(School.findByIdAndUpdate).toHaveBeenCalledWith('1', req.body, { new: true });
    expect(res.json).toHaveBeenCalledWith(mockSchool);
  });

  test('deleteSchool deletes and returns success', async () => {
    const mockSchool = { _id: '1' };
    School.findByIdAndDelete.mockResolvedValue(mockSchool);

    const req = { params: { id: '1' } };
    const res = { json: jest.fn() };

    await deleteSchool(req, res);

    expect(School.findByIdAndDelete).toHaveBeenCalledWith('1');
    expect(res.json).toHaveBeenCalledWith({ message: 'Deleted' });
  });
});