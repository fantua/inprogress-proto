import 'backbone-relational';
import { RelationalModel as Model, HasMany } from 'backbone';
import TaskModel from './task';
import TasksCollection from '../collections/tasks';

const TaskList = Model.extend({

    defaults: {
        id: null,
        position: null,
        name: ''
    },

    relations: [
        {
            type: HasMany,
            key: 'tasks',
            relatedModel: TaskModel,
            collectionType: TasksCollection,
            reverseRelation: {
                key: 'parent',
                includeInJSON: false
            }
        }
    ],

    initialize() {
        this.on({
            'add:tasks': this.handleRelational,
            'reset:tasks': this.handleRelational,
            'remove:tasks': this.handleRelational
        });
    },

    handleRelational(...args) {
        const options = args[args.length - 1];

        if (!options.silentRelational) {
            this.save({silent: true});
        }
    }

});

export default TaskList;