import react, { Component } from 'react'
import ResourceWrapper from '../Misc/ResourceWrapper'
import { Link, useHistory, Switch, Route } from 'react-router-dom'
import server from '../../server/functions'
import useIsMounted from 'ismounted'
import UpdateNeeds from '../Forms/Admin/UpdateNeeds'
import UpdateOrganizations from '../Forms/Admin/UpdateOrganizations'
import UpdateImpacts from '../Forms/Admin/UpdateImpacts'

const AdminControlPanel = props => {

	let [ organizations, setOrganizations ] = react.useState(null)
	let [ needs, setNeeds ] = react.useState(null)
	let [ serverError, setServerError ] = react.useState("")
	let isMounted = useIsMounted()
	let history = useHistory()

		/*
			Main things to show in admin cp.
			- Organizations
				- Need to be able to approve/dissaprove them

			- Needs
				- Need to be able to flag/unflag them as 'major'

			Use formwrapper && useFormValidation? Or something lighter...

		*/

		// server.adminGetOrganizations()
		// server.adminGetNeeds()

	react.useEffect(() => {
		if (!props.isAdmin) history.push('/admin/login')
	}, [])

	return (
		<div className="flex display-flex justify-center">
			<div className="main-column display-flex flex-column">
				<Link to="/"> Back to A Helping Hand </Link><br/>
				ADMIN CONTROL PANEL

				<div>
					<button onClick={() => history.push('/admin/cp/update-needs')}> Update needs </button>
					<button onClick={() => history.push('/admin/cp/update-orgs')}> Update orgs </button>
					<button onClick={() => history.push('/admin/cp/update-impacts')}> Update impacts </button>
				</div>

				<Switch>
					<Route path="/admin/cp/update-needs">
						<UpdateNeeds/>
					</Route>
					<Route path="/admin/cp/update-orgs">
						<UpdateOrganizations/>
					</Route>
					<Route path="/admin/cp/impacts">
						<Impacts/>
					</Route>
				</Switch>

			</div>
		</div>
	)
}

export default AdminControlPanel