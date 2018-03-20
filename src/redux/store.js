import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from 'redux/reducer';

export function configureStore() {
  return createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
  );
}
