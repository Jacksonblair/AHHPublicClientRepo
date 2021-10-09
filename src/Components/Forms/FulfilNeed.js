import react from 'react'
import useFormValidation from '../Validation/useFormValidation'
import validateFulfilment from '../Validation/validateFulfilment'
import FormWrapper from '../Misc/FormWrapper.js'
import useIsMounted from 'ismounted'
import server from '../../server/functions.js'
import { Link, useParams, useHistory } from 'react-router-dom'
import useWindowDimensions from '../Misc/useWindowDimensions'

let FulfilNeed = props => {

	const isMounted = useIsMounted()
	let history = useHistory()
	let { orgid, needid } = useParams()
	let { width, height } = useWindowDimensions()

	let INITIAL_STATE = {
		contact_name: "",
		message: "",
		email: "",
		contact_number: ""
	}

	let submit = (callback) => {
		setServerError("")
		server.fulfilNeed(orgid, needid, values)
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

	const [ newNeedId, setNewNeedId ] = react.useState(null)
	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		handleBlur,
		values, 
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, validateFulfilment, submit)

return (
		<div className="ctr-7 display-flex justify-center">
			<div className="ctr-2">
				<FormWrapper 
				error={serverError}
				isSubmitted={isSubmitted}
				isSubmitting={isSubmitting}
				confirmationContent={ 
					<div className="confirmation-message display-flex flex-column justify-center align-items-center">
						<i className="fas fa-check-circle mb2 orange"></i> 
						<div className="header-3"> Thank you for helping a local person in need. </div>
						<div className="medium"> 
							Your act of kindness will have a positive impact on someone’s day, week, or life. 
							We appreciate your contribution. 
							Together, we are making a difference! Your details have been sent to the 
							organisation and they will contact you shortly.
						</div>
						<button onClick={() => history.push('/')} className="btn btn-black"> Back to home </button>
						<button 
						onClick={() => history.push(`/current-needs/${props.need.region}`)} 
						className="btn btn-black"> 
							More needs in {props.need.region[0].toUpperCase() + props.need.region.substr(1)}
						</button>
					</div>
				}>
					<h1 className={`header-2 ${props.need.region} capitalize ${width < 500 ? "text-center" : "text-left"}`}> Fulfil Need </h1>
					<br/>
					<div className="bold text-left"> To Agency:
						<div className="medium"> {props.need.organization_name} </div>
					</div> 
					<div className="bold text-left"> Agency Contact:
						<div className="medium capitalize"> {props.need.contact_name} </div>
					</div> 
					<div className="bold text-left"> About Need: 
						<div className="medium"> {props.need.name} </div>
					</div> 
					<div className="bold text-left"> Details:
						<div className="medium"> {props.need.details} </div>
					</div> 

					<br/>

					<form onSubmit={handleSubmit} className="display-flex flex-column"> 
						<label> Contact name </label>
						<input
						name="contact_name"
						type="text"
						value={values.contact_name}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="eg. Sonya Lee"
						className={errors.contact_name && 'error-input'}/>
						{ errors.contact_name && <p className="error-text">{errors.contact_name}</p> } 

						<label> E-mail Address </label>
						<input
						name="email"
						type="email"
						value={values.email}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="eg. john.smith@live.com"
						className={errors.email && 'error-input'}/>
						{ errors.email && <p className="error-text">{errors.email}</p> } 

						<label> Contact number (optional) </label>
						<input
						name="contact_number"
						type="tel"
						value={values.contact_number}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="0123456789"
						autoComplete="tel-national"
						className={errors.contact_number && 'error-input'}/>
						{ errors.contact_number && <p className="error-text">{errors.contact_number}</p> } 

						<label> Message </label>
						<textarea
						name="message"
						value={values.message}
						onChange={handleChange}
						onBlur={handleBlur}
						placeholder="Please leave a message"
						className={errors.message && 'error-input'}/>
						{ errors.message && <p className="error-text">{errors.message}</p> } 
						
						<div>
							<button className="btn btn-black" type="submit"> Submit </button>
							<button className="btn btn-black" onClick={history.goBack} type="submit"> Back </button>
						</div>
					</form>
				</FormWrapper>
			</div>
		</div>
	)

}

export default FulfilNeed