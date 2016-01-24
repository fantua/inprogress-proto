import { Model } from 'backbone';

const UI = Model.extend({

    defaults: {
        focusNewTaskFiled: null,
        timer: null,
        clickCount: 0
    },

    initialize() {
        this.on('focusNewTaskFiled', () => this.set('focusNewTaskFiled', null, {silent: true}));
    }

});

const instance = new UI();

export default instance;