import react, { Component } from 'react'
import { connect } from 'react-redux'
import { actions } from '../../reducer.js'
import ResourceWrapper from '../../Components/Misc/ResourceWrapper'
import server from '../../server/functions'
import useIsMounted from 'ismounted'

import UpdateOrganizationProfile from '../../Components/Forms/UpdateOrganizationProfile.js'
import DeleteOrganization from '../../Components/Forms/DeleteOrganization.js'
import OrganizationProfile from '../../Components/Organization/OrganizationProfile.js'
import Needs from '../Needs/Needs.js'
import UpdatePassword from '../../Components/Forms/UpdatePassword'
import UpdateEmail from '../../Components/Forms/UpdateEmail'
import OrganizationSidebar from '../../Components/Organization/OrganizationSidebar'

import {
	Link,
	useHistory,
	useParams,
	Switch,
	Route,
	Redirect
} from 'react-router-dom'

/*

*/

function Organization(props) {

	let isMounted = useIsMounted()
	let [ organizationProfile, setOrganizationProfile ] = react.useState('')
	let [ serverError, setServerError ] = react.useState('')
	let { orgid } = useParams()

	let getResource = (callback) => {
		server.getOrganizationProfile(orgid)
		.then(res => {
			if (!isMounted.current) return

			// overwrite null value from db
			if (res.data.profile.profile_image_url == null) { res.data.profile.profile_image_url = ''}
			setOrganizationProfile(res.data.profile)
			callback()
		})
		.catch(err => {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		})
	}

	let updateOrgImage = (imgUrl) => {
		setOrganizationProfile({...organizationProfile, profile_image_url: imgUrl})
	}

	let updateOrgAbout = (about) => {
		setOrganizationProfile({...organizationProfile, about: about})
	}

	let updateProfile = (profile) => {
		setOrganizationProfile({...organizationProfile, ...profile})
	}

	return(

		<ResourceWrapper
		condition={true} 
		getResource={getResource} 
		error={serverError}>

			<Switch>
				{/* Organization pages */}
				<Route exact path="/org/:orgid/profile/">
					<OrganizationProfile 
					updateOrgImage={updateOrgImage}
					updateOrgAbout={updateOrgAbout}
					profile={organizationProfile} userId={props.userId} jwtPayload={props.jwtPayload}/>
				</Route>

				<Route exact path="/org/:orgid/profile/update">
					<UpdateOrganizationProfile 
					updateProfile={updateProfile}
					profile={organizationProfile} userId={props.userId}/>
				</Route>

				<Route exact path="/org/:orgid/delete">
					<DeleteOrganization profile={organizationProfile} logout={props.logout} userId={props.userId}/>
				</Route>
				
				{/* Needs pages */}
				<Route path="/org/:orgid/needs/">
					<Needs profile={organizationProfile} userId={props.userId}/>
				</Route>	

				{/* Update auth */}
				<Route exact path="/org/:orgid/update-password">
					<UpdatePassword userId={props.userId}/>
				</Route>
				<Route exact path="/org/:orgid/update-email">
					<UpdateEmail userId={props.userId}/>
				</Route>

				<Route>
					<Redirect to="/"/>
				</Route>
			</Switch>

		</ResourceWrapper>
	)

}

const mapStateToProps = (state) => {
	return {
		doesSessionExist: state.doesSessionExist,
		jwtPayload: state.jwtPayload,
		userId: state.userId
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch({ type: actions.LOGOUT })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Organization)