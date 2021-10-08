import react from 'react'
import FormWrapper from '../../Misc/FormWrapper'
import useFormValidation from '../../Validation/useFormValidation'
import validateImpact from '../../Validation/validateImpact'
import useIsMounted from 'ismounted'
import server from '../../../server/functions'
import { useParams, useHistory } from 'react-router-dom'
import useFormMultipleImages from '../../Misc/useFormMultipleImages'

let UpdateTestimonial = props => {

	let history = useHistory()
	const isMounted = useIsMounted()
	{ testimonialid } = useParams()

	let INITIAL_STATE = {
		content: ""
	}

	let submit = async (callback) => {
		try {
			// Send updated testimonial to server

			callback(true)
		} catch(err) {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		}
	}

	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		values, 
		setValues,
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, validateImpact, submit)

	/* Set form values to testimonial that is passed as a prop */
	react.useEffect(() => {
		let testimonial
		props.testimonials.forEach((_testimonial) => {
			if (_testimonial.id == testimonialid) { 
				// Get the values
				testimonial = {..._testimonial}
				setValues({ ...values, ...testimonial })
				return 
			}
		})
	}, [])

	return (
		<>
			<FormWrapper
			error={serverError}
			isSubmitted={isSubmitted}
			isSubmitting={isSubmitting}
			confirmationContent={<div> Updated testimonial <button onClick={history.goBack}> Back </button> </div>}>

				<div className="header-2"> Updating Testimonial </div>

				<br/>
	 			<form className="display-flex flex-column" onSubmit={handleSubmit}>

					<label> Content </label>
					<textarea 
					name="content" 
					onChange={handleChange}
					value={values.content}
					className={errors.content && 'error-input'}
					placeholder="content" type="text"/>
					{errors.content && <p className="error-text">{errors.content}</p> }

					<br/>

					<div>
						<button> Submit </button>
						<button onClick={(e) => { e.preventDefault(); history.goBack() }}> Cancel </button>
					</div>

				</form>

			</FormWrapper>

		</>
	)

}

export default UpdateTestimonial