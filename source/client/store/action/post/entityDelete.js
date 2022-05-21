'use strict';

export default (id) => {
  return (_dispatch, Authorization) => {
    return window
      .fetch(`/post/${id}`, {
        method: 'DELETE',
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
          type: 'POST_DELETE',
          result
        });

        return result;
      });
  };
};
