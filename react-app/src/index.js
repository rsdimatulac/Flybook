import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ModalProvider } from "./context/Modal";
import { ModalContext } from "./context/ModalContext";
import configureStore from './store';
import App from './App';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
        <ModalProvider>
          <ModalContext>
            <App />
          </ModalContext>
        </ModalProvider>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
