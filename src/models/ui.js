import { Model } from 'backbone';

const UI = Model.extend({

    defaults: {
        // Task List - @id
        focusNewTaskFiled: null,

        // Double-click handle helpers
        timer: null,
        clickCount: 0,

        // Set of status list models
        statusList: new Map(),

        // Task - @id
        selectedTask: null
    },

    initialize() {

    },

    focusNewTaskFiled(id) {
        if (this.get('focusNewTaskFiled') == id) {
            this.set('focusNewTaskFiled', null);

            return true;
        }

        return false;
    },

    setStatusList(tasks) {
        function compare(a, b) {
            a = a.get('statusListPosition');
            b = b.get('statusListPosition');

            return a < b ? -1 : a > b ? 1 : 0;
        }

        const statusList = this.get('statusList');

        statusList.clear();
        tasks = tasks.sort(compare);
        tasks.forEach(model => statusList.set(model.get('id'), model));

        this.set({statusList});
    }

});

const instance = new UI();

export default instance;