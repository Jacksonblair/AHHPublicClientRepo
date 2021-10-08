import react from 'react'
import useFormValidation from '../../Validation/useFormValidation'
import ResourceWrapper from '../../Misc/ResourceWrapper.js'
import server from '../../../server/functions.js'
import useIsMounted from 'ismounted'
import usePagination from '../../Misc/usePagination'
import { useHistory } from 'react-router-dom'
import AdminImpact from './AdminImpact'

let UpdateImpacts = props => {
	let history = useHistory()
	const isMounted = useIsMounted()
	const [ serverError, setServerError ] = react.useState(null)
	let { page, setPage, pages } = usePagination(5, props.impacts)

	let deleteImpact = (id, index) => {
		server.adminDeleteImpact(id)
		.then(res => {
			if (!isMounted.current) return
			let _impacts = [...props.impacts]
			_impacts.splice(index, 1)
			props.refresh()
		})
		.catch(err => {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
		})
	}

	return (
		<div className="display-flex flex-column">
			<div className="header-3"> Updating Impacts </div>

			<div>
				<button className="admin-button my2" onClick={() => history.push('/admin/cp/impacts/add')}> Add new impact </button>
			</div>

			{ !!pages.length &&
				pages[page].map((impact, i) => {
					return ( 
						<AdminImpact key={impact.id} impact={impact} deleteImpact={() => deleteImpact(impact.id, i)}/>
					)
				})
			}

			<br/> <br/>

			<div> 
				{ !!pages.length && 
					pages.map((_, i) => {
						return <button 
						key={i + "page"}
						onClick={() => setPage(i)}
						disabled={i == page}> 
							{i + 1} 
						</button>
					})
				} 
			</div>
		</div>
	)
}

export default UpdateImpacts;