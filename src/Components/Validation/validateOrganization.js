import validateEmail from './validateEmail.js'

export default function validateOrganization(values) {

// let INITIAL_STATE = {
// 	contact_name: "",
// 	contact_number: "",
// 	organization_name: "",
// 	about: "",
// 	address: "",
// 	apt_suite_bldg: "",
// 	city: "",
// 	state: "",
// 	postcode: "",
// 	country: "",
// 	tos: false,
// 	email: "",
// 	password: "",
// 	abn: ""
// }

	let errors = validateEmail(values)

	if (!values.password) {
		errors.password = "Password required"
	} else if (values.password.length < 6) {
		errors.password = "Password must be at least 6 characters"
	}
	if (!values.contact_name) {
		errors.contact_name = "Contact name required"
	}

	if (!values.contact_number) {
		errors.contact_number = "Contact number required"
	}

	if (!values.organization_name) {
		errors.organization_name = "Organization name required"
	}

	if (!values.address) {
		errors.address = "Address required"
	}

	if (!values.city) {
		errors.city = "City required"
	}

	if (!values.state) {
		errors.state = "State required"
	} else if (!["QLD", "NSW", "VIC", "TAS", "SA", "NT", "WA"].includes(values.state)) {
		errors.state = "Invalid state"
	}

	if (!values.postcode) {
		errors.postcode = "Postcode required"
	} 
	let re = new RegExp('^(0[289][0-9]{2})$|^([1-9][0-9]{3})$')
	if (!re.test(values.postcode)) {
		errors.postcode = "Postcode must consist of 4 digits between 0-9"
	}

	if (!values.country) {
		errors.country = "Country is required"
	}

	if (!values.tos) {
		errors.tos = "Must agree to Terms and Conditions"
	}

	// if (!values.abn) {
	// 	errors.abn = "ABN required"
	// }
	// Basic regex for validating ABN. Just checks digit length. Does not check real validity
	// https://abr.business.gov.au/Help/AbnFormat
	if (values.abn) {
		re = new RegExp('^([0-9]){11}$')
		if (!re.test(values.abn)) {
			errors.abn = "Invalid ABN"
		}	
	}

	return errors;
}