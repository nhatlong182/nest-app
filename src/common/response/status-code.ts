const code = {
  BACKEND: { code: 500, type: 'ERROR_BACKEND', msg: 'Error Backend!' },
  NOT_FOUND: { code: 404, type: 'NOT_FOUND' },
  UNAUTHORIZED: { code: 401, type: 'UNAUTHORIZED', msg: 'Unauthorized !' },
  FORBIDDEN: { code: 403, type: 'FORBIDDEN', msg: 'Forbidden!' },
  BAD_REQUEST: { code: 400, type: 'BAD_REQUEST' },
  LOGIN_ERROR: { code: 402, type: 'LOGIN_ERROR' },
  VALIDATION_ERROR: { code: 422, type: 'VALIDATION_ERROR' },
  WRONG_DATA: { code: 409, type: 'WRONG_DATA', msg: 'Your data is wrong!' },
  NOT_ENOUGH_DATA: {
    code: 410,
    type: 'NOT_ENOUGH_DATA',
    msg: 'Your data is not enough!',
  },

  USER_EXISTED: {
    code: 1005,
    type: 'USER_EXISTED',
    msg: 'User email existed!',
  },
  PRODUCT_EXISTED: {
    code: 1005,
    type: 'PRODUCT_EXISTED',
    msg: 'Product existed!',
  },
};
export default code;
