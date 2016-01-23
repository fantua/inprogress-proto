import React from 'react';

const DeleteTaskList = React.createClass({

    handleSubmit() {
        this.props.onSubmit();
    },

    handleCancel() {
        this.props.onCancel();
    },

    render() {

        const name = this.props.name;

        return (
            <div className="dialog-screen-holder">
                <div className="dialog-screen">
                    <h1>Delete Task List</h1>
                    <p>Delete “{name}”?</p>
                    <div className="dialog-screen-button-holder">
                        <button className="dialog-screen-button tint-three" onClick={this.handleCancel}>Cancel</button>
                        <button className="dialog-screen-button tint-one" onClick={this.handleSubmit}>Delete</button>
                    </div>
                </div>
            </div>
        );

    }

});

export default DeleteTaskList;