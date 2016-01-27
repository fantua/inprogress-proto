import UIModel from '../models/ui';

const TaskSelect = {

    getInitialState() {
        return {
            selected: false
        };
    },

    handleSelectClick() {
        UIModel.set('selectedTask', (this.state.selected) ? null : this.props.model.get('id'));
        this.setState({selected: !this.state.selected});
    },

    handleChangeSelectedTask(model, value) {
        if (this.state.selected) {
            this.setState({selected: false});
        } else if (value == this.props.model.get('id')) {
            this.setState({selected: true});
        }
    }


};

export default TaskSelect;
