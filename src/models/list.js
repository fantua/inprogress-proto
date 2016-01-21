import 'backbone-relational';
import { RelationalModel as Model, HasMany } from 'backbone';
import TaskModel from './task';

const List = Model.extend({

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
            reverseRelation: {
                key: 'list'
            }
        }
    ]
});

export default List;