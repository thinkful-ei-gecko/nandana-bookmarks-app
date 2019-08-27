/*'use strict';

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/Nandana/bookmarks'

const STORE ={ 
  bookmarkList:null
};

console.log(STORE);
function handleAddBookmark(){
  console.log('handleAddBookmark');
  $('.addBookmark-button').on('click',function(event){
    event.preventDefault();
    $('.addBookmark-button').remove();
    $('.addBookmark').html(`<form id="addBookmark-form">
    <h2>Add Bookmark</h2>
    <label for="add-bookmark-title">Title</label>
    <input type="text" name="add-bookmark-title" class="js-add-bookmark-title" placeholder="Title (required)" required>
    <label for="add-url">Url</label>
    <input type="text" name="add-url" class="js-url" placeholder="Url (required)" required>
    <label for="add-description">Description</label>
    <textarea type="text" name="add-description" class="js-description" placeholder="description (optional) rows="4" cols="50">textarea</textarea>
    <input class="js-rating" type="radio" name="rating" value="5 star"> 5 Stars<br>
    <input class="js-rating" type="radio" name="rating" value="4 Star"> 4 Stars<br>
    <input class="js-rating" type="radio" name="rating" value="3 Star"> 3 Stars<br>
    <input class="js-rating" type="radio" name="rating" value="2 Star"> 2 Stars<br>
    <input class="js-rating" type="radio" name="rating" value="1 Star"> 1 Star
    <button class="add" type="submit">Add</button>
    </form>`);
  });
}

/*function addNewBookmark(){
  console.log('add new bookmark');
  $('.add').on('click',function(event){
    event.preventDefault();
    const newTitle = $(event.currentTarget).find('.js-add-bookmark-title').val();
    const newUrl = $(event.currentTarget).find('.js-url').val();
    const newDescription = $(event.currentTarget).find('.js-description').val();
    const newRating = $(event.currentTarget).find('.js-rating').val();
    
    console.log(STORE);
  });
}*/

/*function renderBookmarkList(){
  console.log(STORE.bookmarkList);
  $('.bookmarks-list').html(`<li>${STORE.bookmarkList}</li>`);
}


$(initPage);
console.log('done calling initpage');
$(handleAddBookmark);
$(renderBookmarkList);*/


'use strict';
/* global shoppingList, store, api */

$(document).ready(function() {
  bookmarkList.bindEventListeners();
  
  // On initial load, fetch Shopping Items and render
  api.getBookmarks()
   //.then(res => console.log(res));
    .then((items) => {
      items.forEach((item) => store.addBookmark(item));
      console.log(store, "logged store");
      bookmarkList.render();
    })
    .catch(err => console.log(err.message));
});


