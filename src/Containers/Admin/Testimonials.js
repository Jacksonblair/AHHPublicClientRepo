import react from 'react'
import { Switch, Route, useParams } from 'react-router-dom'
import UpdateTestimonials from '../../Components/Forms/Admin/UpdateTestimonials'
import UpdateTestimonial from '../../Components/Forms/Admin/UpdateTestimonial'
import server from '../../server/functions'
import useIsMounted from 'ismounted'
import ResourceWrapper from '../../Components/Misc/ResourceWrapper'

let Testimonials = props => {

	let isMounted = useIsMounted()
	let { testimonialid } = useParams()
	const [ impacts, setImpacts ] = react.useState([])
	let [ serverError, setServerError ] = react.useState('')

	let getResource = (callback) => {
		server.adminGetImpacts()
		.then(res => {
			setImpacts(res.data.impacts)
			callback()
		})
		.catch(err => {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		})
	}

	let updateImpact = (updatedImpact) => {
		let _impacts = [...impacts]
		_impacts.forEach((impact, i) => {
			if (impact.id == updatedImpact.id) {
				_impacts[i] = updatedImpact
				return
			}
		})
		setImpacts(_impacts)
	}

	let updateImpacts = (updatedImpacts) => {
		setImpacts(updatedImpacts)
	}

	react.useEffect(() => {
		console.log("Changed id")
	}, [impactid])

	return (

		<ResourceWrapper
		condition={true} 
		getResource={getResource} 
		error={serverError}>
			<Switch>
				<Route path="/admin/cp/impacts/:impactid/update">
					<UpdateImpact updateImpact={updateImpact} impacts={impacts}/>
				</Route>

				<Route path="/admin/cp/impacts/">
					<UpdateImpacts updateImpacts={updateImpacts} impacts={impacts}/>
				</Route>
			</Switch>
		</ResourceWrapper>

	)
}

export default Testimonials;