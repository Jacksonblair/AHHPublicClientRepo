import react from 'react'
import useFormValidation from '../Validation/useFormValidation'
import FormWrapper from '../Misc/FormWrapper.js'
import useIsMounted from 'ismounted'
import server from '../../server/functions.js'
import { Link, useParams, useHistory } from 'react-router-dom'

let DeleteOrganization = props => {

	const isMounted = useIsMounted()
	let history = useHistory()
	let { orgid } = useParams()
	let [ confirming, setConfirming ] = react.useState(false)

	let submit = (callback) => {
		setServerError("")		
		server.deleteOrganization(props.userId)
		.then(res => {
			if (!isMounted.current) return
			props.logout()
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
			<div className="ctr-2 display-flex justify-center align-items-center">
				<FormWrapper 
				error={serverError}
				isSubmitted={isSubmitted}
				isSubmitting={isSubmitting}
				confirmationContent={
					<div className="confirmation-message display-flex flex-column justify-center">
						<i className="fas fa-check-circle"></i> 
						<div className="header-3">
							The Organization was deleted
						</div>
						<form>
							<button className="btn btn-black" type="text" onClick={() => history.push('/')}> Back to home </button>
						</form>
					</div>
				}
				isSubmitting={isSubmitting}>
					<form onSubmit={handleSubmit} className="display-flex flex-column"> 
						<div className="header-2"> Delete Organization </div>
						<br/>
						<div className="bold"> Are you sure you want to delete this organization? All listed needs will be removed. </div>
						<br/>
						<div className="text-center">
						{ !confirming && 
							<button className="btn btn-black" onClick={(e) => { e.preventDefault(); setConfirming(true) }}> Sure? </button>
						}
						{ confirming &&
							<button className="btn btn-black" type="submit"> Confirm </button>
						}
						</div>

						<Link className="text-left form-text-link mobile-only" to={`/org/${orgid}/profile`}> Back to profile </Link> 
					</form>
				</FormWrapper>
			</div>
		</>
	)

}

export default DeleteOrganization