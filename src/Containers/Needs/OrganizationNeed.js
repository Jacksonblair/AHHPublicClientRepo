import react from 'react'
import useIsMounted from 'ismounted'
import ResourceWrapper from '../../Components/Misc/ResourceWrapper.js'
import { Switch, Redirect, Route, useParams, useHistory, Link } from 'react-router-dom'
import server from '../../server/functions.js'
import UpdateNeed from '../../Components/Forms/UpdateNeed.js'
import DeleteNeed from '../../Components/Forms/DeleteNeed.js'
import FulfilNeed from '../../Components/Forms/FulfilNeed.js'
import SetNeedFulfilled from '../../Components/Forms/SetNeedFulfilled.js'
import ExtendNeed from '../../Components/Forms/ExtendNeed.js'
import Need from '../../Components/Needs/Need.js'

const OrganizationNeed = props => {

	const isMounted = useIsMounted()
	let [ need, setNeed ] = react.useState({})
	let [ serverError, setServerError ] = react.useState(null)
	let history = useHistory()
	let { orgid, needid } = useParams()

	let getResource = (callback) => {
		server.getNeed(orgid, needid)
		.then(res => {
			if (!isMounted.current) return
			if (res.data.need == undefined) {
				throw new Error("Need does not exist")
			} else {
				setNeed(res.data.need)
				callback()				
			}
		})
		.catch(err => {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		})
	}

	let updateNeed = (updatedNeed) => {
		setNeed({...need, ...updatedNeed})
	}

	return (
		<>
			<ResourceWrapper
			condition={true} 
			getResource={getResource} 
			error={serverError}>

				<Switch>
					<Route exact path="/org/:orgid/needs/:needid">
						<Need need={need} userId={props.userId}/>
					</Route>

					<Route path="/org/:orgid/needs/:needid/update">
						<UpdateNeed updateNeed={updateNeed} need={need} userId={props.userId}/>
					</Route>

					<Route path="/org/:orgid/needs/:needid/delete">
						<DeleteNeed need={need} userId={props.userId}/>
					</Route>

					<Route path="/org/:orgid/needs/:needid/extend">
						<ExtendNeed need={need} userId={props.userId}/>
					</Route>

					<Route path="/org/:orgid/needs/:needid/set-fulfilled">
						<SetNeedFulfilled need={need} userId={props.userId}/>
					</Route>

					<Route path="/org/:orgid/needs/:needid/fulfil">
						<FulfilNeed profile={props.profile} need={need} userId={props.userId}/>
					</Route>

					<Route>
						<Redirect to="/org/:orgid/needs/:needid"/>
					</Route>

				</Switch>
			</ResourceWrapper>
		</>
	)

}

export default OrganizationNeed