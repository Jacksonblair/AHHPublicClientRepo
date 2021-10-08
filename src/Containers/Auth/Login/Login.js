import react from 'react'
import './Login.css'
import { useHistory, Link } from 'react-router-dom'
import useIsMounted from 'ismounted'

import FormWrapper from '../../../Components/Misc/FormWrapper.js'
import useFormValidation from '../../../Components/Validation/useFormValidation'
import validateLogin from '../../../Components/Validation/validateLogin'
import server from '../../../server/functions.js'

let INITIAL_STATE = {
	email: "",
	password: ""
} 

function Login(props) {

	const isMounted = useIsMounted()
	let history = useHistory()

	async function submit(callback) {
		setServerError("")
		server.login(values.email, values.password)
		.then(res => {
			if (!isMounted.current) return
			callback(true)
			history.push('/')
		})
		.catch(err => {
			if (!isMounted.current) return
			callback(false)
			setServerError(err.response ? err.response.data.message : err.message)
		})
	}

	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		handleBlur,
		values, 
		errors, 
		isSubmitting,
		showConfirmation
	} = useFormValidation(INITIAL_STATE, validateLogin, submit)

	return(
		<div> 
			<h1 className="header-2"> Agency Login </h1> 
			<br/>
			<div className="ctr-1">
				<FormWrapper
				error={serverError}
				isSubmitting={isSubmitting}>

					<form onSubmit={handleSubmit} className="display-flex flex-column">
						<label> E-mail address </label>
						<input 
						name="email" 
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email ? values.email : ""}
						className={errors.email && 'error-input'}
						placeholder="e.g. john.smith@live.com"
						type="text"/>
						{errors.email && <p className="error-text">{errors.email}</p> }

						<label> Password </label>
						<input type="password" 
						name="password" 
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.password ? values.password : ""}
						className={errors.password && 'error-input'}
						type="password" placeholder="********"/>
						{errors.password && <p className="error-text">{errors.password}</p> }

						<div className="text-center">
							<button className="btn btn-black" type="submit"> Submit </button>
						</div>

						<Link className="form-text-link text-left" type="button" to="./forgot"> Forgot password? </Link>
						<br/>
						<div className="text-left">
							If you don't already have an account,&nbsp;
							<Link className="form-text-link" to="./register">register now </Link>
						</div>
					
					</form>
				</FormWrapper>
			</div>
		</div>
	)

}

export default Login