import Config from '../config';
import UIModel from '../models/ui';

const TaskChangeStatus = {

    getStatusImage(status, group = 'default') {
        return {
            default: {
                'initial': 'app-assets/icn-arrow-outline-2x.png',
                'in-progress': 'app-assets/icn-arrow-fill-2x.png',
                'done': 'app-assets/icn-v-2x.png'
            },
            detail: {
                'initial': 'app-assets/icn-detail-arrow-outline-2x.png',
                'in-progress': 'app-assets/icn-detail-arrow-fill-2x.png',
                'done': 'app-assets/icn-detail-v-2x.png'
            }
        }[group][status];
    },

    onCheckboxClick() {
        const clickCount = UIModel.get('clickCount') + 1;
        UIModel.set({clickCount});

        if (clickCount == 1) {
            UIModel.set('timer', setTimeout(() => {
                UIModel.set({clickCount: 0});
                this.handleCheckboxClick();
            }, Config.doubleClickDelay));
        } else {
            clearTimeout(UIModel.get('timer'));
            UIModel.set({clickCount: 0});
            this.handleCheckboxDoubleClick();
        }
    },

    handleCheckboxClick() {
        const status = {
            'initial': 'in-progress',
            'in-progress': 'initial',
            'done': 'initial'
        }[this.props.model.get('status')];

        this.props.model.save({status});
        if (status == 'in-progress') UIModel.set('selectedTask', this.props.model.get('id'));
    },

    handleCheckboxDoubleClick() {
        const status = {
            'initial': 'done',
            'in-progress': 'done',
            'done': 'initial'
        }[this.props.model.get('status')];

        this.props.model.save({status});
    }

};

export default TaskChangeStatus;