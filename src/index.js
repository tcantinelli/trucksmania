import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import App from "./components/app";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
ReactDOM.render(
	<Provider
		store={createStoreWithMiddleware(
			reducers,
			window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
		)}
	>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.querySelector("#root")
);
registerServiceWorker();