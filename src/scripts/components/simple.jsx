var React = require('react'),
    Reflux = require('reflux');

var App = React.createClass({
    render: function() {
        return <h1>Hello World</h1>
    }
});

React.render(
    <App />,
    document.getElementById('ui-App')
);
