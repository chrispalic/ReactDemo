"use strict";

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');
//Ponyfill back from ES6 to Es5
var assign = require('object-assign');
var CHANGE_EVENT = 'change';
//Private Var to store data
var _authors=[];

var AuthorStore = assign({}, EventEmitter.prototype, {
    //Must add the following 3 core functions
    addChangeListener: function (callback){
        this.on(CHANGE_EVENT,callback);
    },
    removeChangeListener: function (callback){
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function(){
        this.emit(CHANGE_EVENT);
    },
    //Now we can add custom stuff
    getAllAuthors: function(){
        return _authors;
    },
    getAuthorById: function(id){
        return _.find(_authors, {id:id});
    }

});

//This is defined here since it is concerned with this store only
Dispatcher.register(function(action){
    switch(action.actionType){
        case ActionTypes.CREATE_AUTHOR:
            _authors.push(action.author);
            AuthorStore.emitChange();
        break;
        case ActionTypes.INITIALIZE:
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
        break;
        case ActionTypes.UPDATE_AUTHOR:
            var existingAuthor = _.find(_authors, {id:action.author.id});
            var existingAuthorIndex = _.indexOf(_authors, existingAuthor);
            _authors.splice(existingAuthorIndex, 1, action.author);
            AuthorStore.emitChange();
        break;
        case ActionTypes.DELETE_AUTHOR:
            _.remove(_authors, function(author){
                return action.id === author.id;
            });
            AuthorStore.emitChange();
        break;
    }
});

module.exports = AuthorStore;