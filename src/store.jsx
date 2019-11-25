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

  if (action.type === "change-NavBar-SearchValue") {
    return { ...state, searchInput: action.value };
  }
  if (action.type === "change-ArtItems") {
    return { ...state, artItems: action.value };
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
    artItems: [],
    searchValue: "All",
    searchInput: "",
    loading: true
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
