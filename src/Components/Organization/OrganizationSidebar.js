import react from 'react'
import { Link, useHistory } from 'react-router-dom'
import './OrganizationProfile.css'
import { connect } from 'react-redux'
import { signOut } from 'supertokens-auth-react/recipe/session';
import defaultProfileImage from '../../Assets/Images/defaultProfileImage.jpg'

let MobileOrganizationSidebar = props => {

	let history = useHistory()

	const clickedLogout = async () => {
		await signOut()
		props.logout()
		history.push('/')
	}

	return (
		<div className="">
			<div className="side-ctr-2">
					<div className="thumb-1" style={{"backgroundImage":`url(${
						props.jwtPayload.profile_image_url ? props.jwtPayload.profile_image_url : defaultProfileImage
					})`}}/>
				<div className="header-3 my2 px2"> 
					{ props.jwtPayload && props.jwtPayload.organization_name}
				</div>
				<div className="divider my2"/>
				<div className="bold">
					{ props.jwtPayload && props.jwtPayload.email}
				</div>
			</div>
			<div className="side-ctr-1">
				<Link className="option" to={`/org/${props.userId}/profile/`}> 
					<div className="content">
						<i className="fas fa-user-circle"></i>
						<div className="text">Profile</div>
					</div>
				</Link>				
				<Link className="option" to={`/org/${props.userId}/needs/add`}> 
					<div className="content">
						<i className="fas fa-plus"></i>
						<div className="text">Create New Need </div>
					</div>
				</Link>
				<Link className="option" to={`/org/${props.userId}/needs/`}> 
					<div className="content">
						<i className="fas fa-clipboard-list"></i>
						<div className="text">View Current Needs</div>
					</div>
				</Link>
				<Link className="option" to={`/org/${props.userId}/update-password`}> 
					<div className="content">
						<i className="fas fa-key"></i>
						<div className="text">Change Password </div>
					</div>
				</Link>
				<Link className="option" to={`/org/${props.userId}/update-email`}> 
					<div className="content">
						<i className="fas fa-envelope"></i>
						<div className="text">Change E-mail Address </div>
					</div>
				</Link>
				<Link className="option" to={`/org/${props.userId}/profile/update`}> 
					<div className="content">
						<i className="fas fa-info-circle"></i>
						<div className="text">Edit Organisation Details</div>
					</div>
				</Link>
				<button className="option" onClick={clickedLogout} tabIndex={0}> 
					<div className="content">
						<i className="fas fa-sign-out-alt"></i>
						<div className="text">Log Out</div>
					</div>
				</button>
			</div>
		</div>
	)

}

const mapStateToProps = (state) => {
	return {
		userId: state.userId,
		jwtPayload: state.jwtPayload,
		doesSessionExist: state.doesSessionExist
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch({ type: "LOGOUT" })
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(MobileOrganizationSidebar)