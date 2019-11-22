import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "signup-success") {
    return { ...state, signedUp: true, loggedIn: true };
  }
  if (action.type === "login-success") {
    return { ...state, loggedIn: true };
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
    artupload: false,
    submitSellerDetails: false,
    dashboardOverview: [],
    searchValue: "All"
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
