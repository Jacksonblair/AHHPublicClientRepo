import react from 'react'
import useFormValidation from '../Validation/useFormValidation'
import FormWrapper from '../Misc/FormWrapper.js'
import ResourceWrapper from '../Misc/ResourceWrapper.js'
import useIsMounted from 'ismounted'
import server from '../../server/functions.js'
import { Link, useHistory, useParams } from 'react-router-dom'

let DeleteNeed = props => {

	let history = useHistory()
	let { needid, orgid } = useParams()
	const isMounted = useIsMounted()
	let [ confirming, setConfirming ] = react.useState(false)

	let submit = (callback) => {
		setServerError("")		
		server.deleteNeed(props.userId, needid)
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
			condition={props.userId == orgid}>
				<div className="ctr-2 display-flex flex-column justify-center align-items-center">
					<FormWrapper 
					error={serverError}
					isSubmitted={isSubmitted}
					confirmationContent={
						<>
							<div className="confirmation-message display-flex flex-column justify-center align-items-center">
								<i className="fas fa-check-circle mb2"></i> 
								<div className="header-3">
									Need was deleted
								</div>
								<button className="btn btn-black" type="text" onClick={() => history.push(`/org/${props.need.organization_id}/profile`)}> Back to Profile </button>
							</div>
						</>
					}
					isSubmitting={isSubmitting}>
						<div className="header-2"> Delete Need </div> 
						<br/>
						<form onSubmit={handleSubmit} className="display-flex flex-column"> 
							<div className="medium"> 
								Please only delete this need if it is no longer required. 
								If the recipient has received the donation/service, please&nbsp;
								<Link to={`/org/${props.need.organization_id}/needs/${props.need.id}/set-fulfilled`}>set the need as fulfilled</Link>
								&nbsp;instead
							</div>

							<br/>
							<div className="text-center">
							{ !confirming && 
								<button className="btn btn-black" onClick={(e) => { e.preventDefault(); setConfirming(true) }}> Delete Need </button>
							}
							{ confirming &&
								<button className="btn btn-black" type="submit"> Confirm </button>
							}
							</div>

							<Link className="form-text-link" to={`/org/${props.need.organization_id}/needs/${props.need.id}`}> Back to the need </Link> 
						</form>
					</FormWrapper>
				</div>
			</ResourceWrapper>	
		</>
	)

}

export default DeleteNeed