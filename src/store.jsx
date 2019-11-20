import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "signup-success") {
    return { ...state, signedUp: true };
  }
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
  }
  if (action.type === "personDetails-success") {
    return { ...state, personDetails: true };
  }
  if (action.type === "paymentDetails-success") {
    return { ...state, paymentDetails: true };
  }
  if (action.type === "submitSellerDetails-success") {
    return { ...state, submitSellerDetails: true };
  }

  return state;
};
const store = createStore(
  reducer,
  {
    signedUp: false,
    loggedIn: false,
    personDetails: false,
    paymentDetails: false,
    submitSellerDetails: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
