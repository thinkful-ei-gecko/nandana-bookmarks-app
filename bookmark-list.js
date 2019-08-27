'use strict';
/* global store, api, $ */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function(){

  function generateError(message) {
    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }

  function generateItemElement(item) {
    if(item.expanded === true) {
      return `
      <li class="js-item-title" id="${item.id}">
        ${item.title}</li>
        <li class="js-item-desc" data-item-id="${item.id}">
        ${item.description}</li>
        <li class="js-item-rating" data-item-id="${item.id}">
        ${item.rating}</li>
        <li class="js-item-visitlink" data-item-id="${item.id}">
        <span> <a href="${item.url}" />Visit Link</span>
        </li>
        <button class="js-delete" id=${item.id}>Delete</button>
      `;
    }
    else {
      return `
        <li class="js-item-title" id="${item.id}">
        ${item.title}</li>
        <li class="js-item-rating" data-item-id="${item.id}">
        ${item.rating}</li>
        `;
    }
  }
  
  
  function generateShoppingItemsString(shoppingList) {
    const items = shoppingList.map((item) => generateItemElement(item));
    return items.join('');
  }
  
  function renderError() {
    if (store.error) {
      const el = generateError(store.error);
      $('.error-container').html(el);
    } else {
      $('.error-container').empty();
    }
  }
  
  function render() {
    renderError();

    // Filter item list if store prop is true by item.checked === false
    let items = store.bookmarkList;

  
    // render the shopping list in the DOM
    console.log('render ran');
    const shoppingListItemsString = generateShoppingItemsString(items);
  
    // insert that HTML into the DOM
    $('.bookmarks-list').html(shoppingListItemsString);
    handleExpandBookmark();
    handleDeleteItemClicked();
  }
  
  function handleAddBookmark(){
    $('.addBookmark-button').on('click',function(event){
      event.preventDefault();
      console.log('handleAddBookmark called');
      $('.addBookmark-button').hide();
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
      <button class="save" type="submit">SAVE</button>
      </form>`);
      handleSaveBookmark();
      
    });
  }
  
  function handleSaveBookmark() {
    $('#addBookmark-form').submit(function(event){
      event.preventDefault();
      console.log('saving bookmark called');
      let newObj = {
        title: $(event.currentTarget).find('.js-add-bookmark-title').val(),
        url:   $(event.currentTarget).find('.js-url').val(),
        description:  $(event.currentTarget).find('.js-description').val(),
        rating: $(event.currentTarget).find('.js-rating').val()
      };  
     
      api.createBookmark(newObj)
        .then((obj) => {
          store.addBookmark(obj);
          render();
        })
        .catch((err) => {
          store.setError(err.message);
          renderError();
        });
      
      $('.addBookmark-button').show();
      $('.addBookmark').html('');
    });
  }
  
  function getItemIdFromElement(item) {
    return $(item)
      //.closest('.js-item-element')
      .data('id');
  }
  
  function handleExpandBookmark() {
    $('.js-item-title').on('click', event => {
      const id = event.currentTarget.id;
      const item = store.findById(id);
      item.expanded = !item.expanded;
      render();
    });
  }
  
  function handleDeleteItemClicked() {
    $('.js-delete').on('click', event => {
      console.log("inside handle delete");
      const id = event.currentTarget.id;

      api.deleteItem(id)
        .then(() => {
          store.findAndDelete(id);
          render();
        })
        .catch((err) => {
          console.log(err);
          store.setError(err.message);
          renderError();
        }
        );
    });
  }
  
  function handleEditShoppingItemSubmit() {
    $('.js-shopping-list').on('submit', '.js-edit-item', event => {
      event.preventDefault();
      const id = getItemIdFromElement(event.currentTarget);
      const itemName = $(event.currentTarget).find('.shopping-item').val();
      api.updateItem(id, { name: itemName })
        .then(() => {
          store.findAndUpdate(id, { name: itemName });
          store.setItemIsEditing(id, false);
          render();
        })
        .catch((err) => {
          console.log(err);
          store.setError(err.message);
          renderError();
        });
    });
  }
  
  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      store.toggleCheckedFilter();
      render();
    });
  }
  
  function handleShoppingListSearch() {
    $('.js-shopping-list-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      store.setSearchTerm(val);
      render();
    });
  }

  function handleItemStartEditing() {
    $('.js-shopping-list').on('click', '.js-item-edit', event => {
      const id = getItemIdFromElement(event.target);
      store.setItemIsEditing(id, true);
      render();
    });
  }

  function handleCloseError() {
    $('.error-container').on('click', '#cancel-error', () => {
      store.setError(null);
      renderError();
    });
  }
  
  function bindEventListeners() {
    handleAddBookmark();
    //handleSaveBookmark();
    //handleExpandBookmark();
    //handleDeleteItemClicked();
    handleEditShoppingItemSubmit();
    handleToggleFilterClick();
    handleShoppingListSearch();
    handleItemStartEditing();
    handleCloseError();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());