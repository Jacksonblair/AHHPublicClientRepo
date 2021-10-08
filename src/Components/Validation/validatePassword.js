export default function validatePassword(values) {

	let errors = {}

	// Current password errors
	if (!values.current_password) {
		errors.current_password = "Email required"
	} else if (values.current_password.length < 6) {
		errors.current_password = "Password must be at least 6 characters"
	}

	// New/confirm new password errors
	if (!values.new_password) {
		errors.new_password = "Password required"
	} else if (values.new_password.length < 6) {
		errors.new_password = "Password must be at least 6 characters"
	}

	// New confirm password errors
	if (!values.confirm_new_password) {
		errors.confirm_new_password = "Password required"
	} else if (values.confirm_new_password.length < 6) {
		errors.confirm_new_password = "Password must be at least 6 characters"
	} else if (values.confirm_new_password != values.new_password) {
		errors.confirm_new_password = "New passwords do not match"
	} else if (values.current_password == values.new_password) {
		errors.confirm_new_password = "New password cannot match old password"
	}

	return errors;
}