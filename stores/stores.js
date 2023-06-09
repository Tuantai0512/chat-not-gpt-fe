import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import userReducer from "./reducers/userReducer";
import modalReducer from "./reducers/modalReducer";
import currentChatReducer from "./reducers/currentChatReducer";
import { createWrapper } from "next-redux-wrapper";

// You can add many reducers at here
const rootReducer = combineReducers({
  user: userReducer,
  modal: modalReducer,
  currentChat: currentChatReducer
});

const initalState = {};

// middleware
const middleware = [thunk];

// creating store
export const store = createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// assigning store to next wrapper
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);