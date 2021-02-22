import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers);
const MainApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(<MainApp />, document.querySelector('#root'));