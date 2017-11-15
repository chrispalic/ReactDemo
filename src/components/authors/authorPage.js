"use strict";

var React = require('react');
var Link = require('react-router').Link;
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var AuthorList = require ('../authors/authorList');

var AuthorPage = React.createClass({
    getInitialState: function(){
        return{
            authors:AuthorStore.getAllAuthors()
        };
    },
    //Need to add and remove the listener when we create and destroy
    componentWillMount:function(){
        AuthorStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function(){
        AuthorStore.removeChangeListener(this._onChange);
    },
    //this will get the data from the store when it changes
    _onChange: function (){
        this.setState({authors:AuthorStore.getAllAuthors()});
    },
    render: function(){
                //This is passing to the function from the state inside the tbody
        return (
            <div>
                <h1>Authors</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors = {this.state.authors}/>
            </div>
        );
    }
});

module.exports = AuthorPage;