import react from 'react'
import ResourceWrapper from '../../Components/Misc/ResourceWrapper'
import FormWrapper from '../../Components/Misc/FormWrapper'
import { connect } from 'react-redux'
import { actions } from '../../reducer'
import AdminLogin from '../../Components/Forms/Admin/AdminLogin'
import AdminControlPanel from './AdminControlPanel'
import {  Link, Redirect, Route, Switch } from 'react-router-dom'

let Admin = props => {


	let getResource = () => {

	}

	return (
		<>
			{ props.hasInit && <Switch> 
				<Route path="/admin/login">
					<AdminLogin adminLoggedIn={props.doesSessionExist && props.jwtPayload && props.jwtPayload.role == "admin"}/>
				</Route>
				<Route path="/admin/cp">
					<AdminControlPanel 
					isAdmin={props.doesSessionExist && props.jwtPayload && props.jwtPayload.role == "admin"}
					doesSessionExist={props.doesSessionExist} 
					jwtPayload={props.jwtPayload}/>
				</Route>
				<Route>
					<Redirect to="/admin/login"/>
				</Route>
			</Switch> }
		</>
	)


}

const mapStateToProps = (state) => {
	return {
		hasInit: state.hasInit,
		doesSessionExist: state.doesSessionExist,
		jwtPayload: state.jwtPayload
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch({ type: actions.LOGOUT })
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
