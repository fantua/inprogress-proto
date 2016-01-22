import React from 'react';

const EditTaskList = React.createClass({

    componentDidMount() {
        this.fixNameFocus();
    },

    fixNameFocus() {
        this.refs.name.value = this.refs.name.value;
    },

    handleSubmit(e) {
        e.preventDefault();
        let name = this.refs.name.value.trim();

        if (!name || name == this.props.name) {
            return this.props.onCancel();
        }

        this.props.onSubmit(name);
    },

    handleCancel() {
        this.props.onCancel();
    },

    handleDelete() {
        this.props.onDelete();
    },

    render() {

        const name = this.props.name;
        const deleteStyle = {float: 'left', paddingLeft: '24px'};

        return (
            <div className="dialog-screen-holder">
                <div className="dialog-screen">
                    <h1>Edit Task List</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input ref="name" type="text" className="tint-two" placeholder="Task List Name" defaultValue={name} autoFocus /><br />
                        <div className="dialog-screen-button-holder">
                            <button type="button" className="dialog-screen-button tint-three" onClick={this.handleDelete} style={deleteStyle}>Delete List</button>
                            <button type="button" className="dialog-screen-button" onClick={this.handleCancel}>Cancel</button>
                            <button type="submit" className="dialog-screen-button">Save</button>
                        </div>
                    </form>

                </div>
            </div>
        );

    }

});

export default EditTaskList;