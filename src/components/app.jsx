import React from 'react';
import LeftColumn from './left-column/left-column';

const App = React.createClass({

    componentWillMount() {
        this.props.data.fetch();
    },

    render() {

        return (
            <LeftColumn collection={this.props.data} />
        );

    }

});

export default App;