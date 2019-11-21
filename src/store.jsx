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
  if (action.type === "artupload-success") {
    return { ...state, artupload: true };
  }
  if (action.type === "submitSellerDetails-success") {
    return { ...state, submitSellerDetails: true };
  }
  if (action.type === "change-NavBar-Value") {
    return { ...state, searchValue: action.value };
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
    artupload: false,
    submitSellerDetails: false,
    searchValue: "payment"
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
