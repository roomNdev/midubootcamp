import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
// import "./index.css"
import { createStore, combineReducers, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"

import blogReducer from "./reducers/blogReducers"
import userReducer from "./reducers/userReducers"
import usersAmountReducer from "./reducers/allUsersReducer"

const reducer = combineReducers({
  blogs: blogReducer,
  user: userReducer,
  users: usersAmountReducer
}
)

const store = createStore(reducer,
  applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <div className="min-h-screen bg-thistle">
      <App />
    </div>
  </Provider>,
  document.getElementById("root")
)
