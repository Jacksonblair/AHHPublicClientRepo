import react, { Component } from 'react'
import './Landing.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { actions } from '../../reducer.js'
import server from '../../server/functions.js'
import FacebookPost from '../../Components/Misc/FacebookPost'
import useWindowDimensions from '../../Components/Misc/useWindowDimensions'
import ResourceWrapper from '../../Components/Misc/ResourceWrapper'
import useIsMounted from 'ismounted'

import majorNeedsBg from '../../Assets/Images/majorNeedsBg.jpg'
import logoWithValues from '../../Assets/Images/logoWithValue.png';
import bubbleImage from '../../Assets/Images/bubble.png'

import colacBg from '../../Assets/Images/GeelongBg.jpg'
import warrnamboolBg from '../../Assets/Images/WarrnamboolBg.jpg'
import corangamiteBg from '../../Assets/Images/CorangamiteBg.jpg'

import {
	Link,
	useHistory,
	useParams
} from 'react-router-dom'

let regions = {
	corangamite: "Corangamite Shire",
	colac: "Colac",
	warrnambool: "Warrnambool"
}

let facebookPage = {
	corangamite: "https://www.facebook.com/ahelpinghandcorangamite/",
	colac: "https://www.facebook.com/ahelpinghandcolac/",
	warrnambool: "https://www.facebook.com/ahelpinghandwarrnambool/"
}

let bgImages = {
	warrnambool: warrnamboolBg,
	colac: colacBg,
	corangamite: corangamiteBg
}

function Landing(props) {

	let isMounted = useIsMounted()
	const history = useHistory()
	const { region } = useParams()
	let [ facebookFeedError, setFacebookFeedError ] = react.useState(null)
	let [ majorNeedsError, setMajorNeedsError ] = react.useState(null)
	let [ majorNeeds, setMajorNeeds ] = react.useState([])
	let { width, height } = useWindowDimensions()

	async function getFacebookFeed(callback) {
		// Dont get feed again on component load if we already have it (for that region)
		// if (props.facebookFeed[region].length) return

		try {
			let result = await server.getFacebookFeed(region)
			if (!isMounted.current) return
			callback()
			props.updateFacebookFeed(result.data.data, region)
		} catch(err) {
			if (!isMounted.current) return
			setFacebookFeedError(err.response ? err.response.data.message : err.message)
			callback()
		}		
	}

	async function getMajorNeeds(callback) {
		try {
			let result = await server.getMajorNeeds(region)
			if (!isMounted.current) return
			callback()
			setMajorNeeds(result.data.needs)
		} catch(err) {
			if (!isMounted.current) return
			setMajorNeedsError(err.response ? err.response.data.message : err.message)
			callback()
		}
	}

	react.useEffect(async () => {
		// Redirect if region invalid?
		if (!["colac", "corangamite", "warrnambool"].includes(region)) {
			history.push('/region')
			return			
		}	
	}, [])

	return(
		<>
			<div className="container-landing flex-column display-flex"> 

				{ width >= 500 && 
					<div className="pc-region-welcome-header" style={{"backgroundImage":`url(${bgImages[region]})`}}>
						<h1 className="header-1"> Welcome to <div className="inline uppercase"> A Helping Hand </div> 
		 					<div className="header-1"> {regions[region]} </div>
						</h1>
		 				<div className="please-select-header bold"> Please select from the options below: </div>
	 				</div>
				}

				{ width < 500 && <>
					<div className="header-2"> Welcome to
						<div className="uppercase blue">A Helping Hand </div> 
						<div className="blue"> {regions[region]}</div> 

					</div>
	 				<div className="please-select-header bold"> Please select from the options below: </div> 
	 				<br/>
	 				</>
				}

 				<div className="landing-buttons display-flex justify-center align-items-center">
 					<Link 
 					to={props.doesSessionExist ? `/org/${props.userId}/needs/add` : "/registering"}
 					className="landing-button display-flex justify-center align-items-center"> 
 						<h2 className="white text display-flex align-items-center justify-center small-text-shadow">
							I am a community organisation who wants to
							<div className="subject-text white">
								REGISTER A LOCAL NEED
							</div>
						</h2>
 					</Link>
 					<Link to={`/current-needs/${region}`} className="landing-button display-flex justify-center align-items-center"> 
 						<h2 className="text display-flex align-items-center justify-center small-text-shadow">
							I would like to 
							<div className="subject-text white">
								HELP SOMEONE LOCAL
							</div>
						</h2>
 					</Link>
 					<Link to="/need-help" className="landing-button display-flex justify-center align-items-center"> 
 						<h2 className="white text display-flex align-items-center justify-center small-text-shadow">
							<div className="subject-text white">
								Do you need help? 
							</div>
						</h2>
 					</Link>
 					<div className="landing-button display-flex justify-center align-items-center"> 
 						<div className="display-flex align-items-center justify-center small-text-shadow">
							<a href={facebookPage[region]} target="_none"> 
								<i className="landing-social-icon fab fa-facebook font-48"></i> 
							</a>&nbsp;&nbsp;&nbsp;
							<a href="https://www.instagram.com/ahelpinghandcommunity/" target="_none">
								<i className="landing-social-icon fab fa-instagram"></i> 
							</a>
						</div>
 					</div>
 				</div>

 				<br/>
 				<br/>
 				<br/>

 				<div className="display-flex justify-center">

 					{ width >= 500 && 
 						<div className="display-flex justify-end">
							<ResourceWrapper 
							condition={true} 
							getResource={getMajorNeeds} 
							error={majorNeedsError}>
								<div className="landing-major-needs-bg display-flex flex-column" style={{"backgroundImage":`url(${majorNeedsBg})`}}>
									<h2 className="landing-major-needs-header landing header-3 capitalize"> 
										{regions[region]} Community <br/> Major Needs 
									</h2>
									<div className="landing-major-needs display-flex justify-center align-items-center flex-column">
										{ majorNeeds.length ? 
											majorNeeds.map((need) => {
												return (
													<Link 
													key={need.id + "asdasd"}
													className="text-center landing-major-need capitalize"
													to={`/org/${need.organization_id}/needs/${need.id}`} key={"ahhh" + need.id}> 
														{need.name.length > 34 ? need.name.substr(0, 35) + '...' : need.name}
													</Link>
												)
											})
											: <div className="bold italic"> Coming soon </div>
										}
									</div>
									<div className="landing-major-needs-footer italic">
										Click need to see more details
									</div>
								</div>
							</ResourceWrapper>
						</div>
 					}

					<div className="facebook-feed display-flex flex-column align-items-left">
						<ResourceWrapper 
						condition={true} 
						getResource={getFacebookFeed} 
						error={facebookFeedError}>
							<div className="header-3 blue text-center"> 
								Facebook Feed 
							</div>
							<br/>
		 					{ width >= 500 && <>
								{ !!props.facebookFeed[region] && 
									<>
									{!!props.facebookFeed[region][0] && 
										<>
										<div className="facebook-bubble display-flex white bold italic desktop-only justify-center align-items-center" style={{"backgroundImage":`url(${bubbleImage})`}}>
											Click here for your local facebook page!
										</div>
										<FacebookPost post={props.facebookFeed[region][0]}/> 
										</>
									}
									{!!props.facebookFeed[region][1] && <FacebookPost post={props.facebookFeed[region][1]}/> }
									</>
								}
		 					</>}
		 					{ width < 500 && <>
								{ !!props.facebookFeed[region].length && props.facebookFeed[region].map((post, i) => {
									return <FacebookPost key={"fb-post" + i} post={post}/>
								}) }
		 					</>}
						</ResourceWrapper>
					</div>

				</div>

			</div>
		</>
	)

}

const mapDispatchToProps = (dispatch) => {
	return {
		updateFacebookFeed: (feed, region) => dispatch({ type: actions.UPDATE_FACEBOOK_FEED, payload: { feed, region } })
	}
}

const mapStateToProps = (state) => {
	return {
		doesSessionExist: state.doesSessionExist,
		jwtPayload: state.jwtPayload,
		userId: state.userId,
		facebookFeed: { colac: state.colacFeed, warrnambool: state.warrnamboolFeed, corangamite: state.corangamiteFeed }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)