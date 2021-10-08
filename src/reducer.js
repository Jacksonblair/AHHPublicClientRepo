import react from 'react'
import Session from "supertokens-auth-react/recipe/session"


const actions = {
	UPDATE_DOES_SESSION_EXIST: 'UPDATE_DOES_SESSION_EXIST',
	UPDATE_JWT_PAYLOAD: 'UPDATE_JWT_PAYLOAD',
	UPDATE_USER_ID: 'UPDATE_USER_ID',
	UPDATE_HAS_INIT: 'UPDATE_HAS_INIT',
	LOGOUT: 'LOGOUT',
	UPDATE_FACEBOOK_FEED: 'UPDATE_FACEBOOK_FEED'
}

const asyncSessionUpdate = () => {

}

const initialState = {
	doesSessionExist: false,
	jwtPayload: null,
	userId: null,
	hasInit: false,
	corangamiteFeed: [],
	geelongFeed: [],
	warrnamboolFeed: []
}

let appReducer = (state = initialState, action) => {

	switch(action.type) {
		case actions.UPDATE_DOES_SESSION_EXIST:
			return {
				...state,
				doesSessionExist: action.payload
			}
		case actions.UPDATE_JWT_PAYLOAD:
			return {
				...state,
				jwtPayload: action.payload
			}
		case actions.UPDATE_USER_ID:
			return {
				...state,
				userId: action.payload
			}
		case actions.UPDATE_HAS_INIT:
			return {
				...state,
				hasInit: true
			}
		case actions.LOGOUT:
			return {
				...state,
				doesSessionExist: false,
				jwtPayload: null,
				userId: null
			}
		case actions.UPDATE_FACEBOOK_FEED:
			switch(action.payload.region) {
				case "geelong":
					return {
						...state,
						geelongFeed: action.payload.feed
					}
				case "corangamite":
					return {
						...state,
						corangamiteFeed: action.payload.feed
					}
				case "warrnambool":
					return {
						...state,
						warrnamboolFeed: action.payload.feed
					}
			}
	}

	return state;
}

export { actions }
export default appReducer;