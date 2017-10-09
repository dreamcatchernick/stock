import React from 'react';
import ReactDOM from 'react-dom';
import Main from './main';
import {Provider} from 'react-redux';
import 'antd/dist/antd.min.css';
import store from './store';

const root = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <Main/>
    </Provider>, root);