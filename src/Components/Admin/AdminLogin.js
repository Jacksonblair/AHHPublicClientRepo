import react, { Component } from 'react'
import FormWrapper from '../Misc/FormWrapper'
import useFormValidation from '../Validation/useFormValidation'
import { Link, useHistory } from 'react-router-dom'
import server from '../../server/functions'
import useIsMounted from 'ismounted'

const AdminLogin = props => {

	let history = useHistory()
	let isMounted = useIsMounted()

	let INITIAL_STATE = {
		email: "",
		password: ""
	}

	let submit = (callback) => {
		setServerError("")
		server.adminLogin(values.email, values.password)
		.then(res => {
			if (!isMounted.current) return
			history.push('/admin/cp')
		})
		.catch(err => {
			if (!isMounted.current) return
			callback()
			setServerError(err.response ? err.response.data.message : err.message)
		})
		// Submit login to server

	}

	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		values, 
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, () => true, submit)

	react.useEffect(() => {
		if (props.adminLoggedIn) {
			history.push('/admin/cp')
		}
	},)


	// TODO
	// On load, check is props.loggedIn is true. If so, redirect to admin cp.
	// Do the same thing with normal login? 

	return (
		<div className="flex display-flex justify-center">
			<div className="main-column">
				<p> Admin Login </p>
					<FormWrapper
					error={serverError}
					isSubmitted={isSubmitted}
					isSubmitting={isSubmitting}>
						<form onSubmit={handleSubmit} className="display-flex flex-column align-items-center">
							<input 
							name="email"
							value={values.email}
							onChange={handleChange}
							type="email"/>
							{errors.email && <p className="error-text">{errors.email}</p> }

							<input 
							name="password"
							value={values.password}
							onChange={handleChange}
							type="password"/>
							{errors.password && <p className="error-text">{errors.password}</p> }

							<button type="submit"> Login </button>
						</form>
					</FormWrapper>
				<Link to="/"> Back to A Helping Hand </Link>
			</div>
		</div>
	)
}

export default AdminLogin