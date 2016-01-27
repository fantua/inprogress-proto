import React from 'react';

const DeleteTask = React.createClass({

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
                    <h1>Delete Task</h1>
                    <p>Delete “{name}”?</p>
                    <div className="dialog-screen-button-holder">
                        <button type="button" className="dialog-screen-button" onClick={this.handleCancel}>Cancel</button>
                        <button type="button" className="dialog-screen-button tint-one" onClick={this.handleSubmit}>Delete</button>
                    </div>
                </div>
            </div>
        );

    }

});

export default DeleteTask;