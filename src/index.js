import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

let store = createStore(reducers);
render(
<Provider store={store}>
<App />
</Provider>, 
document.getElementById('root'));
registerServiceWorker();
