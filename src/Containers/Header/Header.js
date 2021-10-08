import react, { useContext } from 'react'
import './Header.css'
import MainMenu from '../../Components/Menus/MainMenu/MainMenu.js'
import { signOut } from 'supertokens-auth-react/recipe/session';
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { actions } from '../../reducer.js'

function Header(props) {

	const history = useHistory()

	const clickedLogout = async () => {
		console.log("Logging out")
		// TODO: Set local state to logging out while we wait? 
		await signOut()
		props.logout()
		history.push('/')
	}

	return(
		<div className="container-header display-flex justify-center">
			<MainMenu 
			session={props.doesSessionExist} 
			jwt={props.jwtPayload} 
			id={props.userId}
			logout={clickedLogout}/>
		</div>
	)

}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch({ type: actions.LOGOUT })
	}
}

const mapStateToProps = (state) => {
	return {
		doesSessionExist: state.doesSessionExist,
		jwtPayload: state.jwtPayload,
		userId: state.userId
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Header)