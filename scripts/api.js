
'use strict';
// eslint-disable-next-line no-unused-vars
const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Nandana';

  /**
   * listApiFetch - Wrapper function for native `fetch` to standardize error handling. 
   * @param {string} url 
   * @param {object} options 
   * @returns {Promise} - resolve on all 2xx responses with JSON body
   *                    - reject on non-2xx and non-JSON response with 
   *                      Object { code: Number, message: String }
   */
  const listApiFetch = function(...args) {
    console.log(args);
    // setup var in scope outside of promise chain
    let error;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          // if response is not 2xx, start building error object
          error = { code: res.status };
          console.log(res, error);
          // if response is not JSON type, place Status Text in error object and
          // immediately reject promise
          if (!res.headers.get('content-type').includes('json')) {
            error.message = res.statusText;
            return Promise.reject(error);
          }
        }
        // otherwise, return parsed JSON
        return res.json();
      })
      .then(data => {
        // if error exists, place the JSON message into the error object and 
        // reject the Promise with your error object so it lands in the next 
        // catch.  IMPORTANT: Check how the API sends errors -- not all APIs
        // will respond with a JSON object containing message key
        if (error) {
          error.message = data.message;
          return Promise.reject(error);
        }

        // otherwise, return the json as normal resolved Promise
        return data;
      });
  };

  const getBookmarks= function() {
    return listApiFetch(BASE_URL + '/bookmarks');
  };

  const createBookmark = function(obj) {
    const newItem = JSON.stringify(obj);
    return listApiFetch(BASE_URL + '/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: newItem
    });
  };

  const updateItem = function(id, updateData) {
    const newData = JSON.stringify(updateData);
    return listApiFetch(BASE_URL + '/items/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: newData
    });
  };

  const deleteItem = function(id) {
    console.log(id);
    return listApiFetch(BASE_URL + '/bookmarks/' + id, {
      method: 'DELETE'
    });
  };

  return {
    getBookmarks,
    createBookmark,
    updateItem,
    deleteItem,
  };
}());

