import react from 'react'
import validateEmail from '../../../Components/Validation/validateEmail'
import FormWrapper from '../../../Components/Misc/FormWrapper'
import useFormValidation from '../../../Components/Validation/useFormValidation'
import useIsMounted from 'ismounted'
import server from '../../../server/functions'
import { useHistory, Link } from 'react-router-dom'

function ForgotPassword() {
	
	let history = useHistory()
	const isMounted = useIsMounted()
	let INITIAL_STATE = {
		email: ""
	}

	async function submit(callback) {
		try {
			console.log("Callback")
			await server.resetPassword(values.email)
			if (!isMounted.current) return
			callback(true)
		} catch(err) {
			if (!isMounted.current) return
			callback()
			setServerError(err.response ? err.response.data.message : err.message)
		}
	}


	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		handleBlur,
		values, 
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, validateEmail, submit)

	console.log(serverError)

	return (
		<>
		<div className="header-2"> Reset Your Password </div> 
		<br/>
			<div className="ctr-1">
				<FormWrapper
				error={serverError}
				isSubmitted={isSubmitted}
				confirmationContent={
					<div className="confirmation-message display-flex flex-column justify-center">
						<i className="fas fa-check-circle"></i> 
						<div className="header-3">
							An email will be sent to the email address you provided. 
							Please visit a page through a link attached on the email in order to reset your password.
						</div>
						<div>
							<button className="btn btn-black" type="text" onClick={() => history.push('/')}> Back to home </button>
						</div>
					</div>
				}
				isSubmitting={isSubmitting}>
				<form onSubmit={handleSubmit} className="display-flex flex-column">
					<label> Your e-mail address </label>
					<input
					type="email"
					name="email"
					value={values.mail}
					placeholder="e.g. john.smith@live.com"
					onBlur={handleBlur}
					onChange={handleChange}/>
					{errors.email && <p className="error-text">{errors.email}</p> }

					<div className="text-center">
						<button className="btn btn-black"> Reset password </button>
					</div>

					<Link className="form-text-link text-left" type="button" to="./login"> Back to Log In </Link>

				</form>
				</FormWrapper>
			</div>
		</>
	)

}

export default ForgotPassword