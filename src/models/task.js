import 'backbone-relational';
import { RelationalModel as Model, LocalStorage } from 'backbone';
import UIModel from './ui';

const Task = Model.extend({

    defaults: {
        id: null,
        position: null,
        statusListPosition: null,
        name: '',
        description: '',
        /* Enum: initial, in-progress, done */
        status: 'initial'
    },

    initialize() {
        // Temporary solution:
        if (this.get('id') == null) {
            this.set('id', this.generateId(), {silent: true});
        }

        this.on('change:status', this.handleChangeStatus);
    },

    handleChangeStatus(model, value, options) {
        if (!options.silentRelational) {
            let statusListPosition = null;
            if (value == 'in-progress') {
                const statusList = UIModel.get('statusList');
                statusListPosition = 0;
                if (statusList.size) {
                    statusList.forEach(model => statusListPosition = model.get('statusListPosition') + 1);
                }
            }

            this.set({statusListPosition}, {silent: true});
            this.collection.parent.collection.trigger('relational:change:status');
        }
    },

    generateId() {
        // Generate four random hex digits.
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };

        // Generate a pseudo-ID by concatenating random hexadecimal.
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    },

    // Temporary solution:
    save(attributes, options = {}) {
        this.set(attributes, options);
        this.collection.parent.save(null, {silent: true});
    }

});

export default Task;