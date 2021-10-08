import react from 'react'
import useFormValidation from '../Validation/useFormValidation'
import FormWrapper from '../Misc/FormWrapper.js'
import useIsMounted from 'ismounted'
import server from '../../server/functions.js'
import { Link, useParams, useHistory } from 'react-router-dom'

let SetNeedFulfilled = props => {

	let history = useHistory()
	const isMounted = useIsMounted()
	let [ fulfilled, setFulfilled ] = react.useState(false)
	let { orgid } = useParams()

	let submit = (callback) => {
		setServerError("")		
		server.setNeedFulfilled(props.userId, props.need.id)
		.then(res => {
			if (!isMounted.current) return
			callback(true)
		})
		.catch(err => {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
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
			<div className="ctr-2 display-flex flex-column justify-center align-items-center">
				<FormWrapper 
				error={serverError}
				isSubmitted={isSubmitted}
				confirmationContent={
					<div className="confirmation-message display-flex flex-column justify-center align-items-center">
						<i className="fas fa-check-circle mb2"></i> 
						<div className="header-3">
							Need was set as fullfilled
						</div>
						<div className="bold">
							<br/>
							A big part of the success of A Helping Hand will be through letting our community know the difference they are making and ensuring we thank our generous supporters.
							<br/>
							<br/>
							We need your help to do this! We’d love any photos of the items, stories and thank you notes that no not identify the recipients but show the generosity of our community. It’s the beautiful stories of giving and the kindness that A Helping Hand shows and spreads that will encourage others to provide a helping hand where they can.
							<br/>
							<br/>
							Please share your stories along with any photos you have by emailing 
							elise@ahelpinghand.com.au
						</div>
						<br/>
						<button className="btn btn-black" type="text" onClick={() => history.push(`/org/${orgid}/profile`)}> Back to profile </button>
					</div>
				}
				isSubmitting={isSubmitting}>
					<div className="header-2"> Set Need Fulfilled </div> 
					<br/>
					<div className="medium"> 
						Please click ‘Need Fulfilled’ if the recipient has received the donation/service. 
						If the need is no longer required, please&nbsp;
						<Link to={`/org/${props.need.organization_id}/needs/${props.need.id}/delete`}>delete it</Link>
					</div>
					<br/>
					<form onSubmit={handleSubmit} className="display-flex flex-column align-items-center"> 
						<button className="btn btn-black"> Need Fulfilled </button>
						<Link className="form-text-link" to={`/org/${props.need.organization_id}/needs/${props.need.id}`}> Back to the need </Link> 
					</form>
				</FormWrapper>
			</div>
		</>
	)

}

export default SetNeedFulfilled