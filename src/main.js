$ = jQuery = require('jquery'); //this is how you set both references to jquery

//have to bring these components in
var React = require('react');
var Home = require('./components/homePage');
var About = require('./components/about/aboutPage');
var Header = require('./components/common/header');
var Authors = require('./components/authors/authorPage');
// Poor mans routing, this will be handled by React Router soon
var App = React.createClass({
    render: function(){
        var Child;
        switch(this.props.route){
            case 'about': Child = About;
                break;
            case 'authors': Child = Authors;
                break;
            default: Child = Home;
        }
        return(
            <div>
                <Header/>
                <Child/>
            </div>
        );
    }
});
function render(){
    var route = window.location.hash.substr(1);
    //Idea here is we call app above, passing the route and then render it into the div
    React.render(<App route={route} />, document.getElementById('app'));
}
window.addEventListener('hashchange', render);
render();

//this is rendering the application and attaching it to that div - Demo: First React Component
//React.render(<Home/>, document.getElementById('app'));