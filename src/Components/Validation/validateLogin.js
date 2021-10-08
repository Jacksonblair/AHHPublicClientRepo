export default function validateLogin(values) {

	let errors = {}

	// Email errors
	if (!values.email) {
		errors.email = "Email required"
	} else if (!validateEmail(values.email)) {
		errors.email = "Invalid email address"
	}

	// Password errors
	if (!values.password) {
		errors.password = "Password required"
	} else if (values.password.length < 6) {
		errors.password = "Password must be at least 6 characters"
	}

	return errors;
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}