"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');
//This will handle all the form data stuff but NOT the markup
//This is the controller view for the lower modules
var ManageAuthorPage = React.createClass({
    //This mixin is needed so that we can programmatically redirect the user
    mixins:[
        Router.Navigation
    ],
    statics:{
        willTransitionFrom: function(transition, component){
            //we add this to state
            if(component.state.dirty && !confirm('Leave without saving?')){
                transition.abort();
            }
        }
    },

    //we will init the state, set here and pass down to form via props
    getInitialState: function(){
        return{
            author: {id: '', firstName: '', lastName:''},
            errors: {},
            dirty: false
        };
    },
    //This is a good place to hydrate the form. Why, we have to modify state
    //but do NOT want the coponent to re-render
    componentWillMount:function(){
        var authorId = this.props.params.id;//From the path and react router '/author:id'
        //this would be handled via promise/callback in real life
        if(authorId){
            this.setState({author: AuthorStore.getAuthorById(authorId)});
        }
    },

    //this binds our state at the top level from the lower level form
    //This will be called every keypress to keep the state up to date
    //so that React can redraw the box on the virtual and real DOM
    setAuthorState: function(event){
        this.setState({dirty:true});
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({author:this.state.author});
    },
    authorFormIsValid: function(){
        var formIsValid = true;
        this.state.errors = {}; //clear any previous errors
        if (this.state.author.firstName.length < 3){
            this.state.errors.firstName = 'First Name must be at least 3 chars.';
            formIsValid = false;
        }
        if (this.state.author.lastName.length < 3){
            this.state.errors.lastName = 'Last Name must be at least 3 chars.';
            formIsValid = false;
        }
        this.setState({errors: this.state.errors});
        return formIsValid;
    },

    //This is going to be our save to our mock service. we preventdefuatl so that it doesn't post the form back
    saveAuthor: function(event){
        event.preventDefault();
        if(!this.authorFormIsValid()){
            return;
        }
        if(this.state.author.id){
            AuthorActions.updateAuthor(this.state.author);
        }else{
            AuthorActions.createAuthor(this.state.author);
        }
        
        this.setState({dirty:false});
        toastr.success('Author saved.');
        this.transitionTo('authors');
    },
    render: function(){
        return(
            <AuthorForm 
                author={this.state.author}
                onChange={this.setAuthorState}
                onSave={this.saveAuthor}
                errors={this.state.errors}/>
        );
    }
});

module.exports = ManageAuthorPage;