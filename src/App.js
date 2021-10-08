import './App.css';
import react from 'react'

// Setup supertokens
import SuperTokens from "supertokens-auth-react"
import Session from "supertokens-auth-react/recipe/session"

// Axios and routing
import axios from 'axios'
import {
	BrowserRouter,
	Switch,
	Route
} from 'react-router-dom'

// Redux
import { Provider, connect } from 'react-redux'
import { createStore } from 'redux'
import reducer, { actions } from './reducer.js'

// Containers
import Header from './Containers/Header/Header.js'
import Body from './Containers/Body/Body.js'
import Footer from './Containers/Footer/Footer.js'
import Admin from './Containers/Admin/Admin.js'

// Redux store
const store = createStore(reducer)

/*
	// https://supertokens.io/docs/website/usage/init
	- To be called at least once before any http request is made to any of your APIs that require authentication.
	- You only need to call this once in your SPA app or on page load.
*/

// Add supertokens axios interceptor
Session.addAxiosInterceptors(axios);

// Function for updating session state on response
axios.interceptors.response.use((response) => {
	updateSessionInfo()
	return response;
})

SuperTokens.init({
    appInfo: {
        // learn more about this on https://supertokens.io/docs/session/appinfo
        appName: "AHH", // Example: "SuperTokens",
        apiDomain: process.env.NODE_ENV == "production" ? "https://ahelpinghandserver.herokuapp.com/" : "http://localhost:3001", // Example: "https://api.supertokens.io",
        websiteDomain: process.env.NODE_ENV == "production" ? "https://ahelpinghandclient.herokuapp.com/" : "http://localhost:3000" // Example: "https://supertokens.io"
    },
    recipeList: [
        Session.init()
    ]
})

// console.log(process.env.NODE_ENV)

// Interceptor for updating session state
let updateSessionInfo = async (callback) => {
	let doesSessionExist = await Session.doesSessionExist()
	if (doesSessionExist) {
		let userId = await Session.getUserId()
		let jwtPayload = await Session.getJWTPayloadSecurely()
		store.dispatch({ type: actions.UPDATE_USER_ID, payload: userId})
		store.dispatch({ type: actions.UPDATE_JWT_PAYLOAD, payload: jwtPayload})
		store.dispatch({ type: actions.UPDATE_DOES_SESSION_EXIST, payload: doesSessionExist})
	}
	callback && callback()
}


// Call updateSessionInfo once on app load to initialize ..
// .. store with session information
updateSessionInfo(() => {
	store.dispatch({ type: actions.UPDATE_HAS_INIT, payload: null })
})

// Base server url
axios.defaults.baseURL = process.env.NODE_ENV == "production" ? "https://ahelpinghandserver.herokuapp.com/" : "http://localhost:3001"

function App(props) {
	return (
		<Provider store={store}>
			<div className="App">
				<BrowserRouter>
					<Switch>
						<Route path="/admin">
							<Admin/>
							<Footer/>
						</Route>
						<Route>
							<Header/>
							<Body/>
							<Footer/>
						</Route>
					</Switch>
				</BrowserRouter>
			</div>
		</Provider>
	)
}

export { axios }
export default App;
