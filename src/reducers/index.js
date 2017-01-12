import { combineReducers } from 'redux'
import items from './items'
import sideMenu from './sidemenu'

const appReducer = combineReducers({
  items,
  sideMenu
})

// Setup root reducer
const rootReducer = (state, action) => {
  if (action.type === 'RESET') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer
