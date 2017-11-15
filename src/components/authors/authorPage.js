"use strict";

var React = require('react');
var AuthorApi = require ('../../api/authorApi');
var AuthorList = require ('../authors/authorList');

var AuthorPage = React.createClass({
    getInitialState: function(){
        return{
            authors:[]
        };
    },
    //Using this is better practice
    componentDidMount: function(){
        //This is synchronus, if real, we would need a callback/promise, etc.
        if(this.isMounted()){
            this.setState({authors: AuthorApi.getAllAuthors()});
        }
    },
    render: function(){
                //This is passing to the function from the state inside the tbody
        return (
            <div>
                <h1>Authors</h1>
                <AuthorList authors = {this.state.authors}/>
            </div>
        );
    }
});

module.exports = AuthorPage;