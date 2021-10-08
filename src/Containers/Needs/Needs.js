import react, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import AddNeed from '../../Components/Forms/AddNeed.js'
import OrganizationNeeds from '../../Components/Needs/OrganizationNeeds.js'
import OrganizationNeed from './OrganizationNeed.js'
import UpdateNeed from '../../Components/Forms/UpdateNeed.js'
import DeleteNeed from '../../Components/Forms/DeleteNeed.js'
import FulfilNeed from '../../Components/Forms/FulfilNeed.js'


import {
	Switch,
	Route,
	Redirect
} from 'react-router-dom'

function Needs(props) {

	return(
		<>
			<Switch>

				<Route exact path="/org/:orgid/needs/">
					<OrganizationNeeds profile={props.profile} userId={props.userId}/>
				</Route>

				<Route exact path="/org/:orgid/needs/add">
					<AddNeed userId={props.userId} jwtPayload={props.jwtPayload}/>
				</Route>

				<Route path="/org/:orgid/needs/:needid/">
					<OrganizationNeed profile={props.profile} userId={props.userId} jwtPayload={props.jwtPayload}/>
				</Route>

				<Route>
					<Redirect to="/"/>
				</Route>

			</Switch>
		</>
	)

}

const mapStateToProps = (state) => {
	return {
		doesSessionExist: state.doesSessionExist,
		jwtPayload: state.jwtPayload,
		userId: state.userId
	}
}

export default connect(mapStateToProps)(Needs)