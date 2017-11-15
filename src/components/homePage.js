"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Home = React.createClass({
    render: function(){
        return (
            <div className="jumbotron">
                <h1>Expedite Client Site Application</h1>
                <p>Soon I can start putting the forms, and other cool things here. Then it will be a real app!</p>
                <p>This is just a change so I can commit to a branch</p>
                <Link to="about" className="btn btn-primary btn-lg">Learn more</Link>
            </div>
        );
    }
});
// this needs to be the name of var of the component
module.exports = Home;