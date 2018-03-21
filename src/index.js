import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

const loggerMiddleware = createLogger();
// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
// Build the middleware for intercepting and dispatching navigation actions
const boundRouterMiddleware = routerMiddleware(history);

let store = createStore(
    reducers,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        boundRouterMiddleware
    )

);
render(
<Provider store={store}>
{ /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
<App />
</ConnectedRouter>
</Provider>, 
document.getElementById('root'));
registerServiceWorker();
