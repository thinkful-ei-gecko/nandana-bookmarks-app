'use strict';
/* global bookmarkList, store, api */

$(document).ready(function() {
  bookmarkList.bindEventListeners();
  
  // On initial load, fetch Shopping Items and render
  api.getBookmarks()
    .then((items) => {
      items.forEach((item) => store.addBookmark(item));
      console.log(store, "logged store");
      bookmarkList.render();
    })
    .catch(err => console.log(err.message));
});


