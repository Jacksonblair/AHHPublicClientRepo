import react from 'react'
import ResourceWrapper from '../Misc/ResourceWrapper'
import server from '../../server/functions'
import { Link, useHistory, useParams } from 'react-router-dom'
import useIsMounted from 'ismounted'
import './OrganizationProfile.css'
import FormWrapper from '../Misc/FormWrapper'
import OrganizationAbout from '../Forms/OrganizationAbout'
import OrganizationImage from '../Forms/OrganizationImage'
import UpdatePassword from '../Forms/UpdatePassword'
import UpdateEmail from '../Forms/UpdateEmail'
import useWindowDimensions from '../Misc/useWindowDimensions'
import defaultProfileImage from '../../Assets/Images/defaultProfileImage.jpg'

const OrganizationProfile = props => {

	let history = useHistory()
	const isMounted = useIsMounted()
	let [serverError, setServerError] = react.useState(null)
	let [editingProfileImage, setEditingProfileImage] = react.useState(false)
	let { width, height } = useWindowDimensions()
	let { orgid } = useParams()

	let updateOrganizationImage = (newUrl) => {
		props.updateOrgImage(newUrl)
	}

	let updateOrganizationAbout = (newAbout) => {
		props.updateOrgAbout(newAbout)
	}

	return (
		<>
			{ width <  500 && <>
				<OrganizationImage
				userId={props.userId}
				isOwner={orgid == props.userId}
				profileImageUrl={!!props.profile.profile_image_url ? props.profile.profile_image_url : defaultProfileImage}
				updateImage={updateOrganizationImage}/>
				<div className="header-2"> {props.profile.organization_name} </div>
			</> }

			<div className="flex ctr-2">
				{ width >= 500 && <>
					<div className="bold text-left"> Profile Picture: </div>
					<OrganizationImage
					userId={props.userId}
					isOwner={orgid == props.userId}
					profileImageUrl={props.profile.profile_image_url ? props.profile.profile_image_url : defaultProfileImage}
					updateImage={updateOrganizationImage}/>
					<br/>
				</> }

				<div className="text-left profile-field"> 
					<div className="bold"> Agency name:&nbsp; </div>
					<div className="inline"> {props.profile.organization_name} </div>			
				</div> 		

				<div className="text-left profile-field"> 
					<div className="bold"> Contact name:&nbsp; </div>
					<div className="inline"> {props.profile.contact_name} </div>			
				</div> 				

				<div className="text-left profile-field"> 
					<div className="bold"> E-mail:&nbsp; </div>
					<div className="inline"> {props.profile.email} </div>			
				</div> 

				<OrganizationAbout 
				userId={props.userId}
				isOwner={orgid == props.userId}
				about={props.profile.about} 
				updateAbout={updateOrganizationAbout}/> 

				{ width < 500 && 
					<form className="display-flex flex-column mobile-profile-buttons align-items-center">
						<button className="btn btn-black" onClick={() => history.push(`/org/${orgid}/needs/`)}> View All Needs </button>
						{ props.userId == orgid && <>
							<button className="btn btn-black" onClick={() => history.push(`/org/${props.userId}/needs/add`)}> Create New Need </button>
							<button className="btn btn-black" onClick={() => history.push(`/org/${props.userId}/update-email`)}> Change E-mail Address </button>
							<button className="btn btn-black" onClick={() => history.push(`/org/${props.userId}/update-password`)}> Change Password </button>
							<button className="btn btn-black" onClick={() => history.push(`/org/${props.userId}/profile/update`)}> Edit Organisation Details </button>
							<button className="btn btn-black" onClick={() => history.push(`/org/${props.userId}/delete`)}> Delete Organization </button>
						</> }
					</form>
				}
			</div>
		</>
	)

}

export default OrganizationProfile