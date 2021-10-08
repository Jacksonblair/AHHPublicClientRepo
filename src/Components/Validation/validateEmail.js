export default function validateEmail(values) {

	let errors = {}

	// Email errors
	if (!values.email) {
		errors.email = "Email required"
	} else if (!isEmailValid(values.email)) {
		errors.email = "Invalid email address"
	}

	return errors;
}

function isEmailValid(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}