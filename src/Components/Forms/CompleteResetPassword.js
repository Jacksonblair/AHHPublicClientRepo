import react from 'react'
import useFormValidation from '../Validation/useFormValidation'
import FormWrapper from '../Misc/FormWrapper.js'
import validateResetPassword from '../Validation/validateResetPassword'
import useIsMounted from 'ismounted'
import server from '../../server/functions'
import { Link, withRouter, useHistory } from 'react-router-dom'

let CompleteResetPassword = props => {

	const isMounted = useIsMounted()
	let history = useHistory()

	let INITIAL_STATE = {
		new_password: "",
		confirm_new_password: ""
	}

	// Send confirmation to server
	let submit = (callback) => {
		setServerError("")
		server.completeResetPassword(props.match.params.uuid, values.new_password)
		.then(res => {
			if (!isMounted.current) return
			callback(true)
			props.logout()
		})
		.catch(err => {
			if (!isMounted.current) return
			callback()
			setServerError(err.response ? err.response.data.message : err.message)
		})
	}

	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		values, 
		setValues,
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, validateResetPassword, submit)

	return (
		<>
			<div className="header-2"> Confirm New Password </div> 
			<br/>
			<div className="ctr-1">
				<FormWrapper				
				error={serverError}
				confirmationContent={ 

					<div className="confirmation-message">
						<div className="header-3 display-flex flex-column"> 
							<i className="fas fa-check-circle"></i> 
								Your password has been updated
								<div className="text-center">
									<button className="btn btn-black" type="text" onClick={() => history.push('/login')}> Log in </button>
								</div>
						</div>
					</div> 

				}
				isSubmitted={isSubmitted}
				isSubmitting={isSubmitting}>
					<form onSubmit={handleSubmit} className="display-flex flex-column">

						<label> New password (min 6 characters) </label>
						<input 
						name="new_password"
						value={values.new_password}
						onChange={handleChange}
						placeholder="Your new password"
						className={errors.new_password && 'error-input'}
						type="password"/> 
						{errors.new_password && <p className="error-text">{errors.new_password}</p> }

						<label> Confirm new password </label>
						<input 
						name="confirm_new_password"
						value={values.confirm_new_password}
						onChange={handleChange}
						placeholder="Confirm your new password"
						className={errors.confirm_new_password && 'error-input'}
						type="password"/> 
						{errors.confirm_new_password && <p className="error-text">{errors.confirm_new_password}</p> }

						<div className="text-center">
							<button className="btn btn-black" type="submit"> Submit </button>
						</div>

					</form>
				</FormWrapper>
			</div>
		</>
	)


}

export default withRouter(CompleteResetPassword)