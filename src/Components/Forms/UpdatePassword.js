import react from 'react'
import useFormValidation from '../Validation/useFormValidation'
import { useParams, useHistory, Link } from 'react-router-dom'
import server from '../../server/functions'
import useIsMounted from 'ismounted'
import FormWrapper from '../Misc/FormWrapper'
import ResourceWrapper from '../Misc/ResourceWrapper'
import validatePassword from '../Validation/validatePassword.js'

let UpdatePassword = props => {

	let INITIAL_STATE = {
		current_password: "",
		new_password: "",
		confirm_new_password: ""
	}

	let history = useHistory()
	let { orgid } = useParams()
	const isMounted = useIsMounted()

	let submit = (callback) => {
		setServerError("")
		server.updatePassword(orgid, values.current_password, values.new_password)
		.then(res => {
			if (!isMounted.current) return
			callback(true)
		})
		.catch(err => {
			console.log(err.response)
			if (!isMounted.current) return
			callback()
			setServerError(err.response ? err.response.data.message : err.message)
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
	} = useFormValidation(INITIAL_STATE, validatePassword, submit)

	return (
		<>
			<div className="ctr-3 flex display-flex flex-column justify-center align-items-center">
				<div className="header-2 text-left top-left-abs-header"> Change Password </div>
				<div className="ctr-1 display-flex flex-column">
					<div className="header-2 mobile-only text-center"> Change Password </div>
					<br className="mobile-only"/>
					<ResourceWrapper condition={props.userId == orgid} getResource={(cb) => cb()}>
					<FormWrapper
					confirmationContent={
						<div className="confirmation-message">
							<div className="header-3 display-flex flex-column"> 
								<i className="fas fa-check-circle"></i> 
									Your password has been updated								
									<div className="text-center">
										<button className="btn btn-black" type="text" onClick={() => history.push(`/org/${orgid}/profile`)}> Back to profile </button>
									</div>
							</div>
						</div> 
					}
					error={serverError}
					isSubmitted={isSubmitted}
					isSubmitting={isSubmitting}>
						<form onSubmit={handleSubmit} className="display-flex flex-column">
							<label> Current password </label>
							<input 
							name="current_password"
							value={values.current_password}
							onChange={handleChange}
							onBlur={handleBlur}
							className={errors.current_password && 'error-input'}
							placeholder="Min. 6 characters"
							type="password"/> 
							{errors.current_password && <p className="error-text">{errors.current_password}</p> }

							<label> New password </label>
							<input 
							name="new_password"
							value={values.new_password}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Min. 6 characters"
							className={errors.new_password && 'error-input'}
							type="password"/> 
							{errors.new_password && <p className="error-text">{errors.new_password}</p> }

							<label> Confirm new password </label>
							<input 
							name="confirm_new_password"
							value={values.confirm_new_password}
							onChange={handleChange}
							onBlur={handleBlur}
							placeholder="Min. 6 characters"
							className={errors.confirm_new_password && 'error-input'}
							type="password"/> 
							{errors.confirm_new_password && <p className="error-text">{errors.confirm_new_password}</p> }

							<div className="text-center">
								<button className="btn btn-black" type="submit"> Submit </button>
							</div>

							<Link className="text-left form-text-link mobile-only" to={`/org/${orgid}/profile`}> Back to profile </Link> 

						</form>
					</FormWrapper>
					</ResourceWrapper>
				</div>
			</div>
		</>
	)

}

export default UpdatePassword