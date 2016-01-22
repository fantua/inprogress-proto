import React from 'react';
import { render } from 'react-dom';
import TaskListsCollection from './collections/task-lists';
import App from './components/app';
import Fixture from './fixtures/data';


render(<App data={new TaskListsCollection()} />, document.getElementById('app'));


