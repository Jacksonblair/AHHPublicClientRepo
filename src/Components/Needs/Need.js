import react from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import Session from "supertokens-auth-react/recipe/session"
import useWindowDimensions from '../Misc/useWindowDimensions'
import './Need.css'
import defaultProfileImage from '../../Assets/Images/defaultProfileImage.jpg'

const Need = props => {

	let { width, height } = useWindowDimensions()
	let history = useHistory()
	let { orgid, needid } = useParams()

	let categories = {
		"educational": "green",
		"housing": "blue",
		"sports-and-social": "orange",
		"parenting-and-baby": "yellow",
		"job-help-or-mentoring": "pink"
	}

	let clickedShareFacebook = () => {

	}

	let regions = {
		"corangamite": "Corangamite Shire",
		"warrnambool": "Warrnambool",
		"geelong": "Geelong"
	}

	/*
		Hackily setting up this component to also be used by admins to edit a need.
	*/
	let [ isAdmin, setIsAdmin ] = react.useState(false)
	react.useEffect(async () => {
		let doesSessionExist = await Session.doesSessionExist()
		if (doesSessionExist) {
			let jwtPayload = await Session.getJWTPayloadSecurely()
			if (jwtPayload["role"] == "admin") setIsAdmin(true)
		}
	}, [])

	return (
		<div className="display-flex flex-column ctr-7">
			<h1 className="header-2 capitalize desktop-only"> {props.need.name} </h1>
			<br className="desktop-only"/>
			<h1 className="header-2 capitalize mobile-only text-center"> {props.need.name} </h1>
			<div className={`ctr-2 ${props.need.category} text-left`}>
				{ !props.need.fulfilled || props.need.fulfilled != "false" && 
					<div className="blue text-center header-3"> 
						<i className="fas fa-check"/>&nbsp;
						Fulfilled at: {props.need.fulfilled_at} 
					</div>
				}

				{ props.need.need_image_url && 
					<div className="view-need-image display-flex justify-center">
						<div className="thumb-2" style={{"backgroundImage":`url(${props.need.need_image_url})`}}/>
					</div>
				}	

				<div className="display-flex bold" style={{"textTransform":"capitalize"}}>
					<div> {props.need.category} </div>
					&nbsp;|&nbsp;
					<div> {regions[props.need.region]} </div>
				</div> <br/>

				<div className="bold"> Details: </div>
				<div className="mb3"> {props.need.details} </div> <br/>
				<div className="bold"> Requirements: </div> 
				<div className="mb3"> {props.need.requirements ? props.need.requirements : <i>None specified</i>} </div>  <br/>

				<div className="display-flex align-items-center justify-center flex-wrap">

					{ props.userId != orgid && !props.need.fulfilled &&
						<button 
						className={`btn btn-yellow`}
						onClick={() => history.push(`/org/${props.need.organization_id}/needs/${props.need.id}/fulfil`)}> Fulfil Need </button>
					}

					{ props.userId == orgid && <>
						<button className="btn btn-black" onClick={() => history.push(`/org/${props.need.organization_id}/needs/${props.need.id}/update`)}> Edit Need </button>
						<button className="btn btn-black" onClick={() => history.push(`/org/${props.need.organization_id}/needs/${props.need.id}/delete`)}> Delete Need </button>
						{ !props.need.fulfilled && 
							<button className="btn btn-orange" onClick={() => history.push(`/org/${props.need.organization_id}/needs/${props.need.id}/set-fulfilled`)}> Mark as fulfilled </button>
						}
						</>
					}

					{ isAdmin && 
						<button className="mx1 my1" onClick={() => history.push(`/org/${props.need.organization_id}/needs/${props.need.id}/update`)}> Admin Edit Need </button>
					}

					<a target="_none" className="btn share-fb"  href={`https://facebook.com/sharer/sharer.php?u=https://ahelpinghandserver.herokuapp.com/org/${orgid}/needs/${needid}`}> 
						<i className="font-20 fab fa-facebook"></i> &nbsp;Share 
					</a>

				</div>

				<div className="mobile-only italic text-center">
					<br/> Not able to fulfil this need? You can still help! 
					Please consider sharing this need with your family, friends and business associates.
					We can do so much more together. <br/><br/>
				</div>



{/*					<a target="_none" className="btn share-instagram" href={``}> 
						<i className="font-20 fab fa-instagram"></i> &nbsp;Share
					</a>*/}
				<br/>

				<div className="bold text-center"> Listed by: </div>
				<div className="text-center"> 
					{ props.need.organization_name.toLowerCase() == "local agency" 
					? <div className="bold black header-3"> Local Agency </div>
					: <Link to={`/org/${props.need.organization_id}/profile`} className="header-3"> {props.need.organization_name} </Link> 
					}
				</div>
				<div className="display-flex justify-center">
					{ props.need.organization_name.toLowerCase() == "local agency" 
						? null
						: <div className="thumb-1" style={{"backgroundImage":`url(${
							!props.need.profile_image_url || props.need.profile_image_url != "null" ? props.need.profile_image_url : defaultProfileImage
						})`}}/>
					}
				</div>

				<br/>
				<form className="text-center">
					<button className="btn btn-black" onClick={(e) => { e.preventDefault(); history.goBack() }}> Back </button>
				</form>

			</div>
		</div>
	)

}

export default Need