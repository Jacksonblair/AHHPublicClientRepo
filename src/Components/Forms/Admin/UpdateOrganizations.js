import react from 'react'
import useFormValidation from '../../Validation/useFormValidation'
import ResourceWrapper from '../../Misc/ResourceWrapper.js'
import server from '../../../server/functions.js'
import useIsMounted from 'ismounted'
import usePagination from '../../Misc/usePagination'
import { useHistory } from 'react-router-dom'
import FuzzySearch from 'fuzzy-search'

let UpdateOrganizations = props => {

	const isMounted = useIsMounted()
	let history = useHistory()

	const [ serverError, setServerError ] = react.useState(null)
	const [ organizations, setOrganizations ] = react.useState([])
	const [ filteredOrganizations, setFilteredOrganizations ] = react.useState([])
	let [ searchTerm, setSearchTerm ] = react.useState("")

	let { page, setPage, pages } = usePagination(10, filteredOrganizations)

	let getResource = (callback) => {
		server.adminGetOrganizations()
		.then(res => {
			if (!isMounted.current) return
			setOrganizations(res.data.orgs)
			setFilteredOrganizations(res.data.orgs)
			callback()
		})
		.catch(err => {
			if (!isMounted.current) return
			console.log(err)
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		})
	}

	let approveOrg = (id) => {
		// Toggle organization 'approved' field on server
		server.toggleOrgApproved(id)
		.then(res => {
			if (!isMounted.current) return
			setOrganizations(res.data.orgs)
			setFilteredOrganizations(res.data.orgs)
			setFilter(0)
			console.log(res)
		})
		.catch(err => {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
		})
	}

	const [ filter, setFilter ] = react.useState(0)
	// Change needs we see based on filter.
	react.useEffect(() => {

		// Filter by toggles
		let _filteredOrganizations = organizations.filter((org) => {
			switch(filter) {
				case 0:
					return true
				break;
				case 1:
					return !org.approved
				break;
			}
		})

		// Filter with fuzzysearch
		const searcher = new FuzzySearch(_filteredOrganizations, ['organization_name', 'email', 'contact_name'])
		const result = searcher.search(searchTerm)

		setFilteredOrganizations(result)
	}, [filter, searchTerm])

	return (
		<>
			<ResourceWrapper
			condition={true} 
			getResource={getResource} 
			error={serverError}>
				<div className="header-3"> Updating Orgs </div>
				<div>
					<button onClick={() => setFilter(0)} className={`admin-button ${filter == 0 && 'active'}`}> All </button>
					<button onClick={() => setFilter(1)} className={`admin-button ${filter == 1 && 'active'}`}> Not Approved </button>
					<input 
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search name/email/contact..." 
					value={searchTerm} /> 
				</div>

				{!!pages.length && pages[page].map((org, i) => {
					return ( 
						<div key={'org' + i} className="display-flex flex-column">
							<div className="text-left" key={i + org.organization_name}> 
							<div> <strong> Org Name: </strong> {org.organization_name} </div>
							<div> <strong> Contact Name: </strong> {org.contact_name} </div>
							<div> <strong> Contact Number: </strong> {org.contact_number} </div>
							<div> <strong> Email: </strong> {org.email} </div>
							<div> <strong> Country: </strong> {org.country} </div>
							<div> <strong> City: </strong> {org.city} </div>
							<div> <strong> Address: </strong> {org.address} </div>
							<div> <strong> Apt/Suite/Bldg: </strong> {org.apt_suite_bldg} </div>
							<div> <strong> Postcode: </strong> {org.postcode} </div>
							<div> <strong> Appproved: </strong> {org.approved ? "Yes" : "No"} </div>
							<button className="admin-button" onClick={() => approveOrg(org.id)}> {org.approved ? "Remove approval" : "Approve org"} </button>
							<button className="admin-button" onClick={() => history.push(`/org/${org.id}/profile`)}> View </button>
						</div>
						<br/>
						</div>
					)
				})}

				<div> 
					{ !!pages.length && 
						pages.map((_, i) => {
							return <button 
							key={i + "123123asd"}
							onClick={() => setPage(i)}
							disabled={i == page}> 
								{i + 1} 
							</button>
						})
					} 
				</div>	
			</ResourceWrapper>
		</>
	)

}

export default UpdateOrganizations