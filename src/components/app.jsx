import React from 'react';
import LeftColumn from './left-column/left-column';
import CenterColumn from './center-column/center-column';
import RightColumn from './right-column/right-column';

const App = React.createClass({

    componentDidMount() {
        this.props.data.fetch({silentRelational: true});
    },

    render() {

        return (
            <div className="main-holder">
                <LeftColumn collection={this.props.data} />
                <CenterColumn collection={this.props.data} />
                <RightColumn collection={this.props.data} />
            </div>
        );

    }

});

export default App;