import React, { Component } from 'react'
import './Body.css'
import {
	Route,
	Redirect,
	Switch,
	Link,
	matchPath,
	useHistory
} from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from '../../reducer.js'

import OurImpacts from '../Impacts/OurImpacts'
import About from '../../Components/Static/About'
import Registering from '../../Components/Static/Registering.js'
import PrivacyPolicy from '../../Components/Static/PrivacyPolicy.js'
import TermsOfUse from '../../Components/Static/TermsOfUse.js'
import Supporters from '../../Components/Static/Supporters.js'
import Testimonials from '../../Components/Static/Testimonials.js'
import ContactUs from '../../Components/Static/ContactUs.js'
import NeedHelp from '../../Components/Static/NeedHelp.js'

import Landing from '../Landing/Landing.js'
import Login from '../Auth/Login/Login.js'
import Register from '../Auth/Register/Register.js'
import ForgotPassword from '../Auth/ForgotPassword/ForgotPassword.js'
import Needs from '../Needs/Needs.js'
import CurrentNeeds from '../Needs/CurrentNeeds.js'
import Organization from '../Organization/Organization.js'
import ConfirmUpdateEmail from '../../Components/Forms/ConfirmUpdateEmail'
import CompleteResetPassword from '../../Components/Forms/CompleteResetPassword'
import Region from '../Landing/Region'

import OrganizationSidebar from '../../Components/Organization/OrganizationSidebar'
import useWindowDimensions from '../../Components/Misc/useWindowDimensions'


const Body = (props) => {

	let { width, height } = useWindowDimensions()

	return(
		<div className="flex display-flex justify-center"> 
			<div className="main-column">
				{ props.hasInit && <Switch>
						{/* Static pages TODO: Make this a separate page */}
						<Route path="/region">
							<Region/>
						</Route>

						<Route path="/landing/:region">
							<Landing/>
						</Route>

						<Route path="/landing/">
							<Redirect to="/region"/>
						</Route>

						<Route path="/about">
							<About/>
						</Route>
						<Route path="/contact">
							<ContactUs/>
						</Route>
						<Route path="/supporters">
							<Supporters/>
						</Route>
						<Route path="/testimonials">
							<Testimonials/>
						</Route>
						<Route path="/registering">
							<Registering/>
						</Route>
						<Route path="/our-impacts">
							<OurImpacts/>
						</Route>
						<Route path="/terms-of-use">
							<TermsOfUse/>
						</Route>
						<Route path="/privacy-policy">
							<PrivacyPolicy/>
						</Route>
						<Route path="/need-help">
							<NeedHelp/>
						</Route>


						{/* View all needs */}
						<Route path="/current-needs/:region/">
							<CurrentNeeds/>
						</Route>


						{/* Auth Pages */}
						<Route path="/login">
							<Login/>
						</Route>
						<Route path="/register">
							<Register/>
						</Route>
						<Route path="/forgot">
							<ForgotPassword/>
						</Route>
						<Route path="/confirm-update-email/:uuid">
							<ConfirmUpdateEmail logout={props.logout} userId={props.userId}/>
						</Route>
						<Route path="/complete-reset-password/:uuid">
							<CompleteResetPassword logout={props.logout} userId={props.userId}/>
						</Route>


						{/* Organizations */}
						<Route path="/org/:orgid">
							<div className="display-flex">
								{ width >= 500 && props.doesSessionExist && props.jwtPayload.role == "org" && 
									<OrganizationSidebar key="mop" jwtPayload={props.jwtPayload}/>
								}
								<div className="display-flex flex-column flex" style={{"width":"100%"}}>
									<Organization/>
								</div>
							</div>
						</Route>
						
						<Route>
							<Redirect to="/region"/>
						</Route>
					</Switch> }
			</div>
		</div>
	)

}

const mapStateToProps = (state) => {
	return {
		hasInit: state.hasInit,
		userId: state.userId,
		jwtPayload: state.jwtPayload,
		doesSessionExist: state.doesSessionExist
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch({ type: actions.LOGOUT })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Body)