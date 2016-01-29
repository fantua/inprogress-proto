import React from 'react';

const CreateTaskList = React.createClass({

    handleSubmit(e) {
        e.preventDefault();
        let name = this.refs.name.value.trim();

        if (!name) {
            return;
        }

        this.props.onSubmit(name);
    },

    handleCancel() {
        this.props.onCancel();
    },

    render() {

        return (
            <div className="dialog-screen-holder">
                <div className="dialog-screen">
                    <h1>Create Task List</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input ref="name" type="text" placeholder="Task List Name" className="tint-two" autoFocus /><br />
                        <div className="dialog-screen-button-holder">
                            <button type="button" className="dialog-screen-button tint-three" onClick={this.handleCancel}>Cancel</button>
                            <button type="submit" className="dialog-screen-button tint-three">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        );

    }

});

export default CreateTaskList;