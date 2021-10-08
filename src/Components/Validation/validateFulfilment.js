import validateEmail from './validateEmail.js'

export default function validateFulfilment(values) {

	let errors = {}

	// contact name
	// fullfilment message
	// email
	// contact number (optional)

	if (!values.contact_name) {
		errors.contact_name = "Contact name required"
	}

	if (!values.message) {
		errors.message = "A message is required when fulfilling this need"
	}

	if (!values.email) {
		errors.email = "E-mail required"
	} else if (!validateEmail(values.email)) {
		errors.email = "Invalid email address"
	}

	return errors;
}
