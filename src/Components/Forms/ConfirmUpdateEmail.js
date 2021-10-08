import react from 'react'
import useFormValidation from '../Validation/useFormValidation'
import FormWrapper from '../Misc/FormWrapper.js'
import useIsMounted from 'ismounted'
import server from '../../server/functions'
import { Link, withRouter, useHistory } from 'react-router-dom'

let ConfirmUpdateEmail = props => {

	let INITIAL_STATE = {
		email: ""
	}

	let history = useHistory()

	const isMounted = useIsMounted()

	// Send confirmation to server
	let submit = (callback) => {
		setServerError("")		
		server.confirmUpdateEmail(props.match.params.uuid)
		.then(res => {
			if (!isMounted.current) return
			callback(true)
			props.logout()
		})
		.catch(err => {
			if (!isMounted.current) return
			callback(true)
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
	} = useFormValidation(INITIAL_STATE, () => true, submit)

	return (
		<>
			<div className="header-2"> Confirm E-mail Change </div> 
			<br/>
			<div className="ctr-1">
				<FormWrapper				
				error={serverError}
				confirmationContent={ 
					<div className="confirmation-message">
						<div className="header-3 display-flex flex-column"> 
							<i className="fas fa-check-circle"></i> 
								Your e-mail has been updated
								<div className="text-center">
									<button className="btn btn-black" type="text" onClick={() => history.push('/login')}> Log in </button>
								</div>
						</div>
					</div> 
				}
				isSubmitted={isSubmitted}
				isSubmitting={isSubmitting}>
					<form onSubmit={handleSubmit}>
						<button className="btn btn-black" type="submit"> Confirm change </button>
					</form>
				</FormWrapper>
			</div>
		</>
	)


}

export default withRouter(ConfirmUpdateEmail)