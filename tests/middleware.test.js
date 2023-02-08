const { permit } = require('../middlewares/role.middleware');

describe('Role Middleware', () => {
  test('permit allows matching role', () => {
    const middleware = permit('superadmin', 'admin');
    const req = { user: { role: 'superadmin' } };
    const res = {};
    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test('permit denies non-matching role', () => {
    const middleware = permit('superadmin');
    const req = { user: { role: 'student' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: 'Forbidden' });
    expect(next).not.toHaveBeenCalled();
  });

  test('permit requires authenticated user', () => {
    const middleware = permit('superadmin');
    const req = {};
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized' });
  });
});