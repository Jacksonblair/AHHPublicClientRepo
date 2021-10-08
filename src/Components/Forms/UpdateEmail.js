import react from 'react'
import useFormValidation from '../Validation/useFormValidation'
import validateEmail from '../Validation/validateEmail'
import { Link, useParams, useHistory } from 'react-router-dom'
import server from '../../server/functions.js'
import useIsMounted from 'ismounted'
import FormWrapper from '../Misc/FormWrapper'
import ResourceWrapper from '../Misc/ResourceWrapper'

let UpdateEmail = props => {

	let INITIAL_STATE = {
		email: "",
	}

	let { orgid } = useParams()
	let history = useHistory()
	const isMounted = useIsMounted()

	let submit = (callback) => {
		setServerError("")
		console.log("Submitted")
		server.changeEmail(orgid, values.email)
		.then(res => {
			// Email change confirmation sent to e-mail address
			// User has to click confirmation in e-mail to affect email change
			callback(true)
		})
		.catch(err => {
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		})
	}

	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		handleBlur,
		values, 
		setValues,
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, validateEmail, submit)

	return (
		<div className="ctr-3 flex display-flex justify-center flex-column align-items-center">
			<div className="header-2 text-left top-left-abs-header"> Change E-mail Address </div>
			<div className="ctr-1 display-flex flex-column">
				<div className="header-2 mobile-only mb2"> Change E-mail Address </div>
				<br className="mobile-only"/>
				<ResourceWrapper condition={props.userId == orgid} getResource={(cb) => cb()}>
				<FormWrapper
				confirmationContent={ 
					<div className="confirmation-message">
						<i className="fas fa-check-circle mb2"></i> 
						<div className="header-3">
							Confirmation email sent. Please view your e-mail to confirm the change.
						</div>
						<button className="btn btn-black" type="text" onClick={() => history.push(`/org/${orgid}/profile`)}> Back to Profile </button>
					</div>
				}
				error={serverError}
				isSubmitted={isSubmitted}
				isSubmitting={isSubmitting}>
					<form onSubmit={handleSubmit} className="display-flex flex-column">
						<label> New E-mail Address </label>
						<input 
						name="email"
						autoComplete="email"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="eg. john.smith@live.com"
						className={errors.email && 'error-input'} type="email"/> 
						{errors.email && <p className="error-text">{errors.email}</p> }

						<div className="text-center">
							<button className="btn btn-black" type="submit"> Submit </button>
						</div>

						<Link className="text-left form-text-link mobile-only" to={`/org/${orgid}/profile`}> Back to profile </Link> 

					</form>
				</FormWrapper>
				</ResourceWrapper>
			</div>
		</div>
	)

}

export default UpdateEmail