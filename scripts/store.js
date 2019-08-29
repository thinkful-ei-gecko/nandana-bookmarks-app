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

