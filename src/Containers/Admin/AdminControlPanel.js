import react, { Component } from 'react'
import { Link, useHistory, Switch, Route } from 'react-router-dom'
import UpdateNeeds from '../../Components/Forms/Admin/UpdateNeeds'
import UpdateOrganizations from '../../Components/Forms/Admin/UpdateOrganizations'
import UpdateSupporters from '../../Components/Forms/Admin/UpdateSupporters'
import Impacts from './Impacts'
import AddImpact from '../../Components/Forms/Admin/AddImpact'
import UpdateTotalNeeds from '../../Components/Forms/Admin/UpdateTotalNeeds'
import './AdminControlPanel.css'

const AdminControlPanel = props => {
	let history = useHistory()

	react.useEffect(() => {
		if (!props.isAdmin) history.push('/admin/login')
	}, [])

	return (
		<div className="flex display-flex justify-center">
			<div className="main-column display-flex flex-column">
				<Link to="/"> Back to A Helping Hand </Link><br/>
				ADMIN CONTROL PANEL

				<div className="admin-buttons-top">
					<button className="admin-button" onClick={() => history.push('/admin/cp/update-needs')}> Update needs </button>
					<button className="admin-button" onClick={() => history.push('/admin/cp/update-orgs')}> Update orgs </button>
					<button className="admin-button" onClick={() => history.push('/admin/cp/impacts')}> Update impacts </button>
					<button className="admin-button" onClick={() => history.push('/admin/cp/update-supporters')}> Update supporters </button>
					<button className="admin-button" onClick={() => history.push('/admin/cp/total-fulfilled-needs')}> Update total needs </button>
				</div>

				<div className="divider my2"/>

				<Switch>
					<Route path="/admin/cp/update-needs">
						<UpdateNeeds/>
					</Route>
					<Route path="/admin/cp/update-orgs">
						<UpdateOrganizations/>
					</Route>
					<Route path="/admin/cp/update-supporters">
						<UpdateSupporters/>
					</Route>
					<Route path="/admin/cp/impacts/add">
						<AddImpact/>
					</Route>
					<Route path="/admin/cp/impacts">
						<Impacts/>
					</Route>
					<Route path="/admin/cp/total-fulfilled-needs">
						<UpdateTotalNeeds/>
					</Route>
				</Switch>

			</div>
		</div>
	)
}

export default AdminControlPanel