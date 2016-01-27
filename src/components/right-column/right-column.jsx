import React from 'react';
import UIModel from '../../models/ui';
import Form from './form';

const RightColumn = React.createClass({

    getInitialState() {
        return {
            showForm: false
        };
    },

    componentDidMount() {
        UIModel.on('change:selectedTask', this.handleChangeSelectedTask, this);
    },

    componentWillUnmount() {
        UIModel.off(null, null, this);
    },


    handleChangeSelectedTask() {
        this.setState({showForm: !!UIModel.get('selectedTask')});
    },

    render() {

        if (process.env.NODE_ENV === "development") {
            console.log('RightColumn - render');
        }

        const getForm = () => {
            if (this.state.showForm) {
                const model = this.props.collection.getTaskById(UIModel.get('selectedTask'));
                return <Form key={model.get('id')} model={model} />;
            }
        };

        return (
            <div className="right-column">
                {getForm()}
            </div>
        );

    }


});

export default RightColumn;