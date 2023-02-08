const { registerSuperadmin, login } = require('../controllers/auth.controller');
const { User } = require('../models/User.model');
const { generateToken } = require('../services/auth.service');

jest.mock('../models/User.model');
jest.mock('../services/auth.service');

describe('Auth Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('registerSuperadmin creates user and returns token', async () => {
    const mockUser = { _id: '123', email: 'admin@test.com', role: 'superadmin' };
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue(mockUser);
    generateToken.mockReturnValue('mock-token');

    const req = { body: { email: 'admin@test.com', password: 'pass123', name: 'Admin' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await registerSuperadmin(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'admin@test.com' });
    expect(User.create).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: 'mock-token' }));
  });

  test('registerSuperadmin rejects duplicate email', async () => {
    User.findOne.mockResolvedValue({ email: 'admin@test.com' });

    const req = { body: { email: 'admin@test.com', password: 'pass123' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await registerSuperadmin(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email already in use' });
  });

  test('login returns token for valid credentials', async () => {
    const mockUser = { _id: '123', email: 'admin@test.com', role: 'superadmin', matchPassword: jest.fn().mockResolvedValue(true) };
    User.findOne.mockResolvedValue(mockUser);
    generateToken.mockReturnValue('mock-token');

    const req = { body: { email: 'admin@test.com', password: 'pass123' } };
    const res = { json: jest.fn() };

    await login(req, res);

    expect(User.findOne).toHaveBeenCalledWith({ email: 'admin@test.com' });
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ token: 'mock-token' }));
  });

  test('login rejects invalid credentials', async () => {
    User.findOne.mockResolvedValue(null);

    const req = { body: { email: 'admin@test.com', password: 'wrong' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });
});