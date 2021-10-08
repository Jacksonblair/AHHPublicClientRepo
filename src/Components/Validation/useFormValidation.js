import react from 'react'
import sanitize from 'sanitize-html-react'

/* Hook for updating all values of a form in a decoupled way */
/* Keeps track of all state */

function useFormValidation(initialState, validate, submit) {
	const [values, setValues] = react.useState(initialState)
	const [errors, setErrors] = react.useState({})
	const [isSubmitting, setIsSubmitting] = react.useState(false)
	const [isSubmitted, setIsSubmitted] = react.useState(false)

	react.useEffect(() => {
		if (isSubmitting) {
			const noErrors = Object.keys(errors).length === 0
			if (noErrors) {
				// Call 'submit' with optional callback
				// * used if we need to show a visual confirmation of successful submission
				// * not used if we route away from that page immediately after successful submission
				let optionalCallback = (result) => {
					// If submission succeeded, set is submitted to true
					( result == true ) && setIsSubmitted(true)
					setIsSubmitting(false)		
				}
				submit(optionalCallback)
			} else {
				setIsSubmitting(false)
			}
		}
	}, [errors, isSubmitting])

	let handleChange = (event) => {
		// event.persist() // just incase?
		setValues(previousValues => ({
			...previousValues,
			[event.target.name]: event.target.value
		}))
	}

	let handleBlur = () => {
		const validationErrors = validate(values)
		setErrors(validationErrors)
	}

	let handleSubmit = (event) => {
		event.preventDefault()

		// Sanitize input
		let sanitizedValues = {...values}
		for (let property in sanitizedValues) {
			sanitizedValues[property] = sanitize(sanitizedValues[property])
		}
		setValues(sanitizedValues)

		const validationErrors = validate(values)
		setErrors(validationErrors)
		setIsSubmitting(true)
	}


	return { handleSubmit, handleChange, handleBlur, values, setValues, errors, isSubmitting, isSubmitted }
}

export default useFormValidation;