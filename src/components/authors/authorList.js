"use strict";

var React = require('react');
var Link = require('react-router').Link;
var AuthorActions = require('../../actions/authorActions');
var toastr = require('toastr');

var AuthorList = React.createClass({
    propTypes: {
        authors: React.PropTypes.array.isRequired
    },
    //Could always pass this down from the parent but this makes it reusable
    deleteAuthor:function(id, event){
        event.preventDefault();
        //debugger; //this works in chrome, not in Edge OF COURSE
        AuthorActions.deleteAuthor(id);
        toastr.success('Author Deleted');
    },
    render: function(){
        var createAuthorRow = function(author){
            //use curly braces in the td href so that we can pass the variable
            return (
                <tr key={author.id}>
                    <td><a href="#" onClick={this.deleteAuthor.bind(this,author.id)}>Delete</a></td>
                    <td><Link to="manageAuthor" params={{id: author.id}}>{author.id}</Link></td>
                    <td>{author.firstName} {author.lastName}</td>
                </tr>
            );
        };
        //This is getting the props from the parent component
        return (
            <div>
                <table className="table">
                    <thead>
                        <th></th>
                        <th>ID</th>
                        <th>Name</th>
                    </thead>
                    <tbody>
                        
                        {this.props.authors.map(createAuthorRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = AuthorList;