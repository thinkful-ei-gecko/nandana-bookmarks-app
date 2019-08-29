'use strict';
/* global store, api, $ */

// eslint-disable-next-line no-unused-vars
const bookmarkList = (function() {

    function generateError(message) {
        return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
    }

    function generateItemElement(item) {
        if (item.expanded === true) {

            return `
      <li class="bookmark-list-li">
      <div class="expanded">
       <div class="expanded-div">
        <p class="js-item-title" id="${item.id}">
        ${item.title}</p>
        <p class="js-item-rating" data-item-id="${item.id}">
        ${item.rating} Stars</p>
        </div>
        <p class="js-item-desc" data-item-id="${item.id}">
        ${item.desc}</p>
        <div class="expanded-div">
        <div class="js-item-visitlink visitLink" data-item-id="${item.id}">
        <a href="${item.url}" target="_blank".>Visit Link</a>
        </div>
        <button class="js-delete" type="submit" id=${item.id}>Delete</button></div>
        </div>
        </li>
      `;

        } else {
            return `<li class="bookmark-list-li">
       <div class="notexpanded">
        <p class="js-item-title" id="${item.id}">
        ${item.title}</p>
        <p class="js-item-rating" data-item-id="${item.id}">
        ${item.rating} stars</p></div></li>
        `;
        }
    }


    function generateBookmarkItemsString(bookmarkList) {
        const items = bookmarkList.map((item) => generateItemElement(item));
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
        let items = [...store.bookmarkList];
        let ratingOption = Number($('.filter-by-rating-option:selected').val());
        if (ratingOption >= 1) {
            let fliteredRatingList = items.filter(item => item.rating >= ratingOption);
            const bookmarkListItemsString = generateBookmarkItemsString(fliteredRatingList);
            $('.bookmarks-list').html(bookmarkListItemsString);
        } else {
            const bookmarkListItemsString = generateBookmarkItemsString(store.bookmarkList);
            $('.bookmarks-list').html(bookmarkListItemsString);
        }
    }

    function handleRating() {
        $('.filter-by-rating').click(function() {
            render();
        });
    }

    function handleAddBookmark() {
        $('.addBookmark-button').on('click', function(event) {
            event.preventDefault();
            $('.addBookmark-button').hide();
            $('.addBookmark').html(`<form id="addBookmark-form">
      <h2>Add Bookmark</h2>
      <label class="titleLabel" for="add-bookmark-title">Title</label>
      <input type="text" name="add-bookmark-title" class="js-add-bookmark-title" placeholder="Title (required)" required>
      <label class="urlLabel" for="add-url">Url</label>
      <input type="text" name="add-url" class="js-url" placeholder="Url (required)" required>
      <label for="add-description" class="descLable">Description</label>
      <textarea type="text" name="add-description" class="js-description" placeholder="description (optional)" ></textarea>
      <label for="rating" class="ratingLable">Rating</label>
      <div class="ratingdiv">
      <input class="js-rating" type="radio" name="rating" value="5" >5<br>
      <input class="js-rating" type="radio" name="rating" value="4"> 4<br>
      <input class="js-rating" type="radio" name="rating" value="3" > 3<br>
      <input class="js-rating" type="radio" name="rating" value="2"> 2<br>
      <input class="js-rating" type="radio" name="rating" value="1"> 1<br>
      </div>
      <div class="form-button">
      <button class="save" type="submit">SAVE</button> 
      <button class="cancel" type="submit">cancel</button>
      </div>
      </form>`);
        });
    }

    function handleSaveBookmark() {
        $('.addBookmark').on('submit', '#addBookmark-form', function(event) {
            event.preventDefault();
            let newObj = {
                title: $(event.currentTarget).find('.js-add-bookmark-title').val(),
                url: $(event.currentTarget).find('.js-url').val(),
                desc: $(event.currentTarget).find('.js-description').val(),
                rating: $(event.currentTarget).find('.js-rating:checked').val()
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

    function handleCancel() {
        $('.addBookmark').on('click', '.cancel', function(event) {
            event.preventDefault();
            $('.addBookmark-button').show();
            $('.addBookmark').html('');
        });
    }

    function handleExpandBookmark() {
        $('.bookmarks-list').on('click', '.js-item-title', event => {
            const id = event.currentTarget.id;
            const item = store.findById(id);
            item.expanded = !item.expanded;
            render();
        });
    }

    function handleDeleteItemClicked() {
        $('.bookmarks-list').on('click', '.js-delete', event => {
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
                });
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
        handleRating();
        handleCancel();
        handleSaveBookmark();
        handleExpandBookmark();
        handleDeleteItemClicked();
        handleCloseError();
    }

    // This object contains the only exposed methods from this module:
    return {
        render: render,
        bindEventListeners: bindEventListeners,
    };
}());