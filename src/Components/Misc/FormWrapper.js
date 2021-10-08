import react from 'react'

const FormWrapper = props => {

	/*
		Wraps a form, using variables from useFormValidation hook
	
		States:
		- Show visual confirmation of successful submission (optional)
			- Takes a component/message or just uses default
		- Show currently submitting form
			- Takes a component/message or just uses default
		- Show form
	*/

	return (
		<>
			{ props.isSubmitted && 
				<> 
					{props.confirmationContent 
					? props.confirmationContent 
					: "Submitted successfully!"} 
				</> 
			}
			{ props.isSubmitting && !props.error && 
				<> 
					{props.submittingMessage 
					? props.submittingMessage 
					: "Submitting..."} 
				</> 
			}
			{ !props.isSubmitted && props.error && <div className="server-error-text"> {props.error} </div> }
			{ ( !props.isSubmitted && !props.isSubmitting ) && 
				<> {props.children} </>
			}
		</>
	)

}

export default FormWrapper