import react from 'react'
import useFormValidation from '../../Validation/useFormValidation'
import ResourceWrapper from '../../Misc/ResourceWrapper.js'
import server from '../../../server/functions.js'
import useIsMounted from 'ismounted'
import usePagination from '../../Misc/usePagination'
import { useHistory } from 'react-router-dom'
import AdminTestimonial from './AdminTestimonial'

let UpdateTestimonials = props => {
	let history = useHistory()
	const isMounted = useIsMounted()
	const [ serverError, setServerError ] = react.useState(null)
	let { page, setPage, pages } = usePagination(5, props.testimonials)

	let deleteTestimonial = (id, index) => {
		// server.adminDeleteImpact(id)
		// .then(res => {
		// 	if (!isMounted.current) return
		// 	let _impacts = [...props.impacts]
		// 	_impacts.splice(index, 1)
		// 	props.updateImpacts(_impacts)
		// })
		// .catch(err => {
		// 	if (!isMounted.current) return
		// 	setServerError(err.response ? err.response.data.message : err.message)
		// })
	}

	return (
		<div className="display-flex flex-column">
			<div className="header-3"> Updating Testimonials </div>

			<div>
				<button className="admin-button my2" onClick={() => history.push('/admin/cp/testimonial/add')}> Add new testimonial </button>
			</div>

			{ !!pages.length &&
				pages[page].map((testimonial, i) => {
					return ( 
						<AdminTestimonial key={testimonial.id} testimonial={testimonial} deleteTestimonial={() => deleteTestimonial(testimonial.id, i)}/>
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

export default UpdateTestimonials;