'use strict';

const messageGet = (_message) => {
  switch (_message) {
    case 'must match pattern "(?=.*[A-Z])(?=.*\\d).{8,}"':
      return 'must have length > 7 ( 1 upper-case + 1 digit )';

    default:
      return _message;
  }
};

export default (__error) => {
  const _error = __error.map((e) => {
    return {
      source: e.instancePath.replace(/^\//, '') || 'root',
      message: messageGet(e.message)
    };
  });

  return {
    _error,
    status: 400
  };
};
