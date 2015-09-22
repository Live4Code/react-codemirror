//import './main.css';
//global css
import './assets/global/plugins/font-awesome/css/font-awesome.css';
import './assets/global/plugins/bootstrap/css/bootstrap.css';
//metronic global css
import './assets/global/css/components-md.css';
import './assets/global/css/plugins-md.css';
import React from 'react';
import {Provider} from 'react-redux';
import App from './containers/App.jsx';
import configureStore from './store/configureStore';
import storage from './libs/storage';

const APP_STORAGE = 'app';

const store = configureStore(storage.get(APP_STORAGE) || {});

main();

function main() {
  store.subscribe(() => {
    if(!storage.get('debug')) {
      storage.set(APP_STORAGE, store.getState());
    }
  });

  if(process.env.NODE_ENV === 'production') {
    React.render(
      <Provider store={store}>
        {() => <App />}
      </Provider>,
      document.getElementById('app'));
  }
  if(process.env.NODE_ENV !== 'production') {
    const app = document.createElement('div');

    document.body.appendChild(app);

    React.render(
      <Provider store={store}>
        {() => <App />}
      </Provider>,
      app);
  }
}
