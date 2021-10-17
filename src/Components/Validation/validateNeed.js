export default function validateNeed(values) {

	let errors = {}

	if (!values.name) {
		errors.name = "Name for need required"
	} else if (values.name.length >= 35) {
		errors.name = "Max. name length is 35 characters"
	}

	if (!values.details) {
		errors.details  = "Details for need required"
	}

	if (!values.region) {
		errors.region = "Region required"
	} else if (!["colac", "corangamite", "warrnambool"].includes(values.region.toLowerCase())) {
		errors.region = "Invalid region"
	}

	if (!values.category) {
		errors.category = "Category required"
	} else if (!["educational", "living", "sports-and-social", "parenting-and-baby", "job-help-or-mentoring"].includes(values.category.toLowerCase())) {
		errors.category = "Invalid category"
	}

	return errors;
}