import react from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'
import NeedLink from './NeedLink'
import './CurrentNeeds.css'
import majorNeedsBg from '../../Assets/Images/majorNeedsBg.jpg'
import useWindowDimensions from '../Misc/useWindowDimensions'

let facebookPage = {
	corangamite: "https://www.facebook.com/ahelpinghandcorangamite/",
	colac: "https://www.facebook.com/ahelpinghandcolac/",
	warrnambool: "https://www.facebook.com/ahelpinghandwarrnambool/"
}

const CurrentNeedsRegion = props => {

	let history = useHistory()
	let { region } = useParams()
	let majorNeeds = props.needs.filter((need) => need.major )
	let needs
	let { width, height } = useWindowDimensions()

	let categories = {
		"educational": { name: "Educational", icon: "fas fa-graduation-cap", color: "green"},
		"living": { name: "Living", icon: "fas fa-home", color: "blue"},
		"sports-and-social": { name:"Sports and Social", icon: "fas fa-volleyball-ball", color: "orange"},
		"parenting-and-baby": { name: "Parenting/Baby", icon: "fas fa-baby-carriage", color: "yellow"},
		"job-help-or-mentoring": { name: "Job Help or Mentoring", icon: "fas fa-briefcase", color: "pink"},
		"major": { name: "Major", icon: "fas fa-compass", color: "black"}
	}

	if (majorNeeds.length) {
		needs = majorNeeds.map((need) => {
			return (
				<Link 
				key={need.id + "asdasd"}
				className="blue major-need-element bold text-center capitalize italic"
				style={{"fontSize":"100%", "textDecoration":"none"}}
				to={`/org/${need.organization_id}/needs/${need.id}`} key={"ahhh" + need.id}> 
					&nbsp;{need.name.length > 34 ? need.name.substr(0, 35) + '...' : need.name}
				</Link>
			)
		})
	} else {
		needs = <div> Coming soon </div>
	}

	return (
		<>
			{ width >= 500 && <>
				<div className={`ctr-2`}>
					<div className="region-category-icon major display-flex justify-center align-items-center"> 
						<i className={`${categories["major"].icon}`}></i> 
					</div>
					<h1 className="header-2 capitalize region-category-header"> {region} {categories["major"].name} Needs</h1>
					<br/>
					<div className="medium">
						Thank you for considering to help a person or family in your community who is experiencing a tough time. 
						Even the smallest act of kindness can have a positive impact on someone’s day, week or life. 
						We appreciate your contribution.<br/><br/>
						Our local agencies have worked hard to identify needs in your community. 
						Please spread the word by sharing with friends, family and business associates. 
						We can do so much more together.
					</div>
					<br/>
					<div className="display-flex justify-space-between flex-wrap">
						{ majorNeeds.map((need) => {
							return (
								<div className="ctr-4 display-flex flex-column">
									<div className="header-3 text-left"> {need.name} </div>
									<div className="medium text-left flex"> 
										{need.details.length > 150 ? need.details.substr(0, 150) + "..." : need.details }
									</div>{/*
									<button className={`btn btn-${categories[need.category].color}`}>
										View Need
									</button>*/}
									<Link 
									to={`/org/${need.organization_id}/needs/${need.id}`}
									className="need-link-btn btn btn-black">
										View Need
									</Link>
								</div>
							)
						})}
						{ !majorNeeds.length && 
							<div className="text-center flex">
								<div className="header-3 blue"> 
									We have just begun and we will soon begin listing needs of vulnerable locals.  
									Please ‘like’ your local  A Helping Hand <a className="header-3 blue" target="_none" href={facebookPage[region]}> Facebook page</a> or visit us again soon to find out how you can make a real difference to a person’s life who may live around the corner
								</div> 
							</div>
						}
					</div>
					<br/>
					<br/>
					<button 
					className="btn btn-black"
					onClick={(e) => { e.preventDefault(); history.goBack() }}> Back </button>

				</div> </> 
			}




			{ width < 500 && 

				<>
					<div className="header-2"> Give a local family or individual in <div className="capitalize inline"> {region} </div> </div>
					<div className="header-2 orange"> A Helping Hand </div>

					<div className="region-major-needs-bg display-flex flex-column" style={{"backgroundImage":`url(${majorNeedsBg})`}}>
						<div className="region-major-needs-header header-3 blue capitalize"> 
							{region == "corangamite" ? "Corangamite Shire" : region} Community <br/> Major Needs 
						</div>
						<div className="region-major-needs display-flex justify-center align-items-center flex-column">

							{ majorNeeds.length 
								? majorNeeds.map((need) => {
									return (
										<Link 
										key={need.id + "asdasd"}
										className="blue capitalize region-major-need"
										to={`/org/${need.organization_id}/needs/${need.id}`} key={"ahhh" + need.id}> 
											{need.name.length > 34 ? need.name.substr(0, 35) + '...' : need.name}
										</Link>
									)
								})
								: <div> Coming soon </div>
							}

						</div>
						<div className="region-major-needs-footer blue italic bold">
							Click need to see more details
						</div>
					</div>
					<br/>
					<br/>

					<div className="category-buttons display-flex flex-column align-items-center"> 

						<div className="category-button display-flex align-items-center" 
						onClick={() => history.push(history.location.pathname + "/living")}> 
							<div className="category-button-icon display-flex justify-center align-items-center"> 
								<i className="white fas fa-home"></i> 
							</div>
							<div className="category-button-text medium text-left"> Fulfil a Living Need </div>
						</div>
					
						<div className="category-button display-flex align-items-center my1" 
						onClick={() => history.push(history.location.pathname + "/educational")}> 
							<div className="category-button-icon display-flex justify-center align-items-center"> 
								<i className="font-36 white fas fa-graduation-cap"></i> 
							</div>
							<div className="category-button-text py2 px3 medium text-left"> Fulfil an Education Need </div>
						</div>

						<div className="category-button display-flex align-items-center my1" 
						onClick={() => history.push(history.location.pathname + "/sports-and-social")}> 
							<div className="category-button-icon display-flex justify-center align-items-center"> 
								<i className="font-36 white fas fa-volleyball-ball"></i> 
							</div>
							<div className="category-button-text py2 px3 medium text-left"> Fulfil a Sport or Social need </div>
						</div>

						<div className="category-button display-flex align-items-center my1" 
						onClick={() => history.push(history.location.pathname + "/parenting-and-baby")}> 
							<div className="category-button-icon display-flex justify-center align-items-center"> 
								<i className="font-36 white fas fa-baby-carriage"></i> 
							</div>
							<div className="category-button-text py2 px3 medium text-left"> Fulfil a Parenting/Baby Need </div>
						</div>

						<div className="category-button display-flex align-items-center my1" 
						onClick={() => history.push(history.location.pathname + "/job-help-or-mentoring")}> 
							<div className="category-button-icon display-flex justify-center align-items-center"> 
								<i className="font-36 white fas fa-briefcase"></i> 
							</div>
							<div className="category-button-text py2 px3 medium text-left"> Provide Job Help or Mentoring </div>
						</div>

						<br/>
						<button className="btn btn-black" onClick={history.goBack}> Back </button>
					</div>
				</>
			}
		</>
	)

}

export default CurrentNeedsRegion