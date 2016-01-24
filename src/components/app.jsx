import React from 'react';
import LeftColumn from './left-column/left-column';

const App = React.createClass({

    componentDidMount() {
        this.props.data.fetch();
    },

    render() {

        return (
            <LeftColumn collection={this.props.data} />
        );

    }

});

export default App;