import react from 'react'
import useFormValidation from '../../Validation/useFormValidation'
import ResourceWrapper from '../../Misc/ResourceWrapper.js'
import server from '../../../server/functions.js'
import useIsMounted from 'ismounted'
import usePagination from '../../Misc/usePagination'
import AdminNeed from './AdminNeed'
import FuzzySearch from 'fuzzy-search'

let UpdateNeeds = props => {

	const isMounted = useIsMounted()

	const [ serverError, setServerError ] = react.useState(null)
	const [ needs, setNeeds ] = react.useState([])
	const [ filteredNeeds, setFilteredNeeds ] = react.useState([])
	const [ searchTerm, setSearchTerm ] = react.useState("")

	let { page, setPage, pages } = usePagination(5, filteredNeeds)
	console.log(page)
	console.log(pages)


	let getResource = (callback) => {
		server.adminGetNeeds()
		.then(res => {
			if (!isMounted.current) return
			setNeeds(res.data.needs)
			setFilteredNeeds(res.data.needs)
			callback()
		})
		.catch(err => {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		})
	}

	let toggleNeedMajor = (id, index) => {
		// Toggle need 'major' field on server
		// * Using index from filteredNeeds
		server.adminToggleNeedMajor(id)
		.then(res => {
			if (!isMounted.current) return
			setNeeds(res.data.needs)
		})
		.catch(err => {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
		})
	}

	let toggleNeedApproved = (id, index) => {
		// Toggle need 'major' field on server
		server.adminToggleNeedApproved(id)
		.then(res => {
			if (!isMounted.current) return
			setNeeds(res.data.needs)
		})
		.catch(err => {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
		})
	}

	let deleteNeed = (id, index) => {
		server.adminDeleteNeed(id)
		.then(res => {
			if (!isMounted.current) return
			setNeeds(res.data.needs)
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
		let _filteredNeeds = needs.filter((need) => {
			switch(filter) {
				case 0:
					return true
				break;
				case 1:
					return !need.approved
				break;
				case 2:
					return need.major
				break;
				case 3:
					return need.time_expired
				break;
			}
		})

		// Filter with fuzzy search (if there is a search term)
		const searcher = new FuzzySearch(_filteredNeeds, ['name'])
		const result = searcher.search(searchTerm)

		setFilteredNeeds(result)

	}, [filter, searchTerm,  needs])

	return (
		<>
			<ResourceWrapper
			condition={true} 
			getResource={getResource} 
			error={serverError}>
				<div className="header-3"> Updating Needs </div>
				<div className="mt2">
					<button onClick={() => setFilter(0)} className={`admin-button ${filter == 0 && 'active'}`}> All </button>
					<button onClick={() => setFilter(1)} className={`admin-button ${filter == 1 && 'active'}`}> Not Approved </button>
					<button onClick={() => setFilter(2)} className={`admin-button ${filter == 2 && 'active'}`}> Major </button>
					<button onClick={() => setFilter(3)} className={`admin-button ${filter == 3 && 'active'}`}> Expired </button>
					<input 
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search name..." 
					value={searchTerm} /> 
				</div>

				{ !!pages.length &&
					pages[page].map((need, i) => {
						return ( <div key={"need" + i}>
								<AdminNeed 
								key={need.id}
								toggleNeedMajor={toggleNeedMajor}
								toggleNeedApproved={toggleNeedApproved}
								deleteNeed={deleteNeed}
								need={need} 
								index={i}/>
								<div className="divider"/>
							</div>
						)
					})
				}

				<br/> <br/>

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

export default UpdateNeeds