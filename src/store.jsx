import { createStore } from "redux";
let reducer = (state, action) => {
  if (action.type === "logout") {
    return { ...state, loggedIn: false, userIsSeller: false };
  }
  if (action.type === "login-success") {
    return { ...state, loggedIn: true, userIsSeller: action.value };
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
  if (action.type === "update-profile-img") {
    return { ...state, profileImageURL: action.value };
  }
  if (action.type === "update-cart") {
    return { ...state, cartItems: action.value };
  }
  if (action.type === "set-nav-DashB") {
    return { ...state, navDashBoardButton: action.value };
  }
  if (action.type === "set-nav-SellB") {
    return { ...state, NavSellButton: action.value };
  }
  if (action.type === "set-nav-shopB") {
    return { ...state, navShopButton: action.value };
  }
  if (action.type === "set-nav-uploadB") {
    return { ...state, navUploadButton: action.value };
  }
  if (action.type === "set-nav-searchB") {
    return { ...state, navSearchBar: action.value };
  }

  if (action.type === "set-nav-cartB") {
    return { ...state, NavCartBag: action.value };
  }

  return state;
};

const store = createStore(
  reducer,
  {
    loggedIn: false,
    artupload: false,
    submitSellerDetails: false,
    dashboardOverview: [],
    artItems: [],
    searchValue: "All",
    searchInput: "",
    loading: true,
    profileImageURL: "/art-images/a70ca64023691b0195c8dc93cbbbe187",
    cartItems: [],
    navSearchBar: true,
    navShopButton: true,
    navDashBoardButton: true,
    navUploadButton: true,
    NavSellButton: true,
    NavCartBag: true,
    userIsSeller: false
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
