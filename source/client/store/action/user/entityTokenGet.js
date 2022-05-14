'use strict';

export default () => {
  return (_dispatch, Authorization) => {
    return window
      .fetch('/user/token', {
        method: 'GET',
        headers: { Authorization }
      })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result._error) {
          throw result;
        }

        _dispatch({
          type: 'USER_TOKEN_GET',
          result
        });

        return result;
      });
  };
};
