import React from 'react';
import ReactDom from 'react-dom';
import TodoList from './TodoList';
import '/src/mock';

ReactDom.render(<TodoList />, document.getElementById('root'))