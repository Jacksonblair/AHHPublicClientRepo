import react from 'react'
import useIsMounted from 'ismounted'
import ResourceWrapper from '../Misc/ResourceWrapper.js'
import { withRouter, Link, useParams, useHistory } from 'react-router-dom'
import server from '../../server/functions.js'
import NeedLink from './NeedLink'
import useWindowDimensions from '../Misc/useWindowDimensions'
import './OrganizationNeeds.css' 

const OrganizationNeeds = props => {

	let { orgid } = useParams()
	let history = useHistory()
	const isMounted = useIsMounted()
	let [needs, setNeeds] = react.useState([])
	let [fulfilledNeeds, setFufilledNeeds] = react.useState([])
	let [serverError, setServerError] = react.useState(null)
	let { width, height } = useWindowDimensions()

	let getResource = (callback) => {
		server.getNeeds(orgid)
		.then(res => {
			if (!isMounted.current) return

			// Split needs into fulfilled/unfulfilled
			let _needs = []
			let _fulfilledNeeds = []
			res.data.needs.forEach((need) => {
				if (need.fulfilled) {
					_fulfilledNeeds.push(need)
				} else {
					_needs.push(need)
				}
			})

			setNeeds(_needs)
			setFufilledNeeds(_fulfilledNeeds)

			callback()
		})
		.catch(err => {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		})
	}

	return (
		<div className="ctr-3 flex">
			<div className="header-2 desktop-only text-left"> Current Needs List </div>
			<div className="header-2 mobile-only text-center"> Current Needs List </div>
			<ResourceWrapper
			condition={true} 
			getResource={getResource} 
			error={serverError}>

				<div className={`display-flex justify-space-between flex-wrap org-current-needs-list`}>
					{ needs && needs.map((need, i) => {
						return  (
							<NeedLink key={'needlink' + need.id} color="black" need={need} userId={props.userId}/>
						)
					}) }
					{ needs && !needs.length && 
						<div className="text-center flex">
							<div className="header-3"> None </div>
						</div>
					}
				</div>

				<Link className="text-center form-text-link mobile-only" to={`/org/${orgid}/profile`}> Back to profile </Link> 

				<br/>
				<div className="header-3 desktop-only text-left"> Fulfilled Needs </div>
				<div className="header-3 mobile-only text-center"> Fulfilled Needs </div>
				<div className="display-flex justify-space-between flex-wrap org-fulfilled-needs-list">
				{ fulfilledNeeds && fulfilledNeeds.map((need, i) => {
					return (
						<NeedLink key={'needlink' + need.id} color="black" need={need} userId={props.userId}/>
					)
				}) }
				{ fulfilledNeeds && !fulfilledNeeds.length && 
					<div className="text-center flex">
						<div className="header-3"> None </div>
					</div>
				 }
				</div>
				<Link className="text-center form-text-link mobile-only" to={`/org/${orgid}/profile`}> Back to profile </Link> 

			</ResourceWrapper>
		</div>
	)

}

export default OrganizationNeeds