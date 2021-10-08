import react, { Component } from 'react'
import { useParams, useHistory, Route, Switch, Redirect } from 'react-router'
import ResourceWrapper from '../../Components/Misc/ResourceWrapper.js'
import server from '../../server/functions.js'
import CurrentNeedsRegion from '../../Components/Needs/CurrentNeedsRegion'
import CurrentNeedsRegionCategory from '../../Components/Needs/CurrentNeedsRegionCategory'
import { connect } from 'react-redux'
import NeedsSidebar from '../../Components/Needs/NeedsSidebar'
import useWindowDimensions from '../../Components/Misc/useWindowDimensions'
 
function CurrentNeeds(props) {

	let [ serverError, setServerError ] = react.useState(null)
	let [ needs, setNeeds ] = react.useState([])
	let [ majorNeeds, setMajorNeeds ] = react.useState(null)
	let { region } = useParams()
	let { width, height } = useWindowDimensions()
	let history = useHistory()

	let getResource = (callback) => {
		server.getCurrentNeeds(region)
		.then(res => {
			setNeeds(res.data.needs)
			callback()
		})
		.catch(err => {
			callback()
			setServerError(err.response ? err.response.data.message : err.message)
		})
	}

	/*
		We get all needs for this region. 
	*/

	return(
		<>
			<ResourceWrapper 
			condition={true} 
			getResource={getResource} 
			error={serverError}>

{/*						<Route path="/org/:orgid">
							<div className="display-flex justify-center">
								{ width >= 500 && props.doesSessionExist && props.jwtPayload.role == "org" && 
									<MobileOrganizationSidebar key="mop"/>
								}
								<div className="display-flex flex-column flex" style={{"width":"100%"}}>
									<Organization/>
								</div>
							</div>
						</Route>*/}

				<Switch>
					
					<Route path="/current-needs/:region/:category">
						<div className="display-flex">
							{ width >= 500 && <NeedsSidebar key="needsidebar"/> }
							<div className="display-flex flex-column flex" style={{"width":"100%"}}> 
								<CurrentNeedsRegionCategory userId={props.userId} needs={needs.filter((need) => { return need.region == region })}/>
							</div>
						</div>
					</Route>

					<Route path="/current-needs/:region">
						<div className="display-flex">
							{ width >= 500 && <NeedsSidebar key="needsidebar"/> }
							<div className="display-flex flex-column flex" style={{"width":"100%"}}> 
								<CurrentNeedsRegion userId={props.userId} needs={needs.filter((need) => { return need.region == region })}/>
							</div>
						</div>
					</Route>

				</Switch>

			</ResourceWrapper>
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

export default connect(mapStateToProps)(CurrentNeeds)