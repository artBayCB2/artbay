import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "signup-success") {
    return { ...state, signedUp: true };
  }
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }

  return state;
};
const store = createStore(
  reducer,
  { signedUp: false, loggedIn: false },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
