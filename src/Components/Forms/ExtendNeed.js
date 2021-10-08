import react from 'react'
import useFormValidation from '../Validation/useFormValidation'
import FormWrapper from '../Misc/FormWrapper.js'
import ResourceWrapper from '../Misc/ResourceWrapper.js'
import useIsMounted from 'ismounted'
import server from '../../server/functions.js'
import { Link, useHistory, useParams } from 'react-router-dom'

let ExtendNeed = props => {

	let history = useHistory()
	let { needid, orgid } = useParams()
	const isMounted = useIsMounted()

	let submit = (callback) => {
		setServerError("")		
		server.extendNeed(props.userId, needid)
		.then(res => {
			if (!isMounted.current) return
			callback(true)
		})
		.catch(err => {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback(false)
		})
	}

	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		values, 
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation({}, () => true, submit)

	return (
		<>
			<ResourceWrapper		
			getResource={(cb) => cb()}
			condition={props.userId == orgid && props.need.contacted}>
				<div className="header-2 my3 mx3"> Extend Need </div> 
				<div className="float-box mx3 mb3 px3 py3">
					<FormWrapper 
					error={serverError}
					isSubmitted={isSubmitted}
					confirmationContent={
						<>
							<p> Need was extended! You will receive another reminder when the need expires again. </p>
							<Link to={`/org/${orgid}/needs/`}> Go back </Link>
						</>
					}

					isSubmitting={isSubmitting}>
						<div className="medium"> 
							Extend this Need if it is ongoing <br/>
							Please click&nbsp;'
							<Link to={`/org/${orgid}/needs/${needid}/delete`}>Delete Need</Link>
							'&nbsp;if it is no longer required.
						</div>
						<form onSubmit={handleSubmit} className="display-flex flex-column"> 
							<button className="mt3 mb2" type="submit"> Extend </button> 
							<Link className="text-left mt2 bold black" to={`/org/${props.need.organization_id}/needs/${props.need.id}`}> Back to the need </Link> 
						</form>
					</FormWrapper>
				</div>
			</ResourceWrapper>
		</>
	)

}

export default ExtendNeed