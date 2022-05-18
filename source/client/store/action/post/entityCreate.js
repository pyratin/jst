'use strict';

export default (body) => {
  return (_dispatch, Authorization) => {
    return window
      .fetch('/post', {
        method: 'POST',
        headers: {
          Authorization,
          'Content-Type': 'application/json'
        },
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
          type: 'POST_CREATE',
          result
        });

        return result;
      });
  };
};
