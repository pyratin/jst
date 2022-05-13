'use strict';

export default (body) => {
  return (_dispatch) => {
    return window
      .fetch('/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      .then((result) => {
        return result.json();
      })
      .then((result) => {
        if (result._error) {
          throw result;
        }

        _dispatch({
          type: 'USER_CREATE',
          result
        });

        return result;
      });
  };
};
