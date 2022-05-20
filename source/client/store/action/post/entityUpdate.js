'use strict';

export default (id, body) => {
  return (_dispatch, Authorization) => {
    return window
      .fetch(`/post/${id}`, {
        method: 'PUT',
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
          type: 'POST_UPDATE',
          result
        });

        return result;
      });
  };
};
