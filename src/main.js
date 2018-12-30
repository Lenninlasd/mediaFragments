import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers/root.js';
import App from './containers/app.js';

import initialState from './initialState.js';

if(window.self !== window.top) {
    initialState.endableEditing = false;
}

const store = createStore(
    rootReducer, initialState
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);