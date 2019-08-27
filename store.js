'use strict';
// eslint-disable-next-line no-unused-vars
const store = (function(){
  const setError = function(error) {
    this.error = error;
  };

  const addBookmark = function(item) {
    item.expanded = false;
    this.bookmarkList.push(item);
  };

  const findById = function(id) {
    return this.bookmarkList.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarkList = this.bookmarkList.filter(item => item.id !== id);
  };

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
  };

  const setItemIsEditing = function(id, isEditing) {
    const item = this.findById(id);
    item.isEditing = isEditing;
  };

  const setMinRating = function(rating) {
    this.minRating = rating;
  };

  return {
    bookmarkList: [],
    error: null,
    minRating:0,
  

    addBookmark,
    setError,
    findById,
    findAndDelete,
    findAndUpdate,
    setMinRating,
    setItemIsEditing,
  };
  
}());

/*'use strict';
const store = (function(){
  bookmarkList:[{
    title,
    url,
    description,
    rating
  }]

  const addBookmark = function(){
    this
  }

  function handleAddBookmark(){
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
  
  addNewBookmark(){
    $('.add').on('click',function(event){
      event.preventDefault();
      const newTitle = $(event.currentTarget).find('.js-add-bookmark-title').val();
      const newUrl = $(event.currentTarget).find('.js-url').val();
      const newDescription = $(event.currentTarget).find('.js-description').val();
      const newRating = $(event.currentTarget).find('.js-rating').val();
      store.addBookmark(newTitle,newUrl,newDescription,newRating);
    });
  }
  
  
  
  $(handleAddBookmark);*/
