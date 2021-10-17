import react from 'react'
import useIsMounted from 'ismounted'
import {
	useHistory,
	Link
} from 'react-router-dom'

import FormWrapper from '../../../Components/Misc/FormWrapper.js'
import useFormValidation from '../../../Components/Validation/useFormValidation'
import validateOrganization from '../../../Components/Validation/validateOrganization'
import server from '../../../server/functions.js'

let INITIAL_STATE = {
	contact_name: "",
	contact_number: "",
	organization_name: "",
	about: "",
	address: "",
	apt_suite_bldg: "",
	city: "",
	state: "VIC",
	postcode: "",
	country: "",
	tos: false,
	email: "",
	password: "",
	abn: "",
	anonymous: false
}

function Register() {

	const isMounted = useIsMounted()
	let history = useHistory()

	async function submit(callback) {
		setServerError("")
		server.addOrganization(values)
		.then(res => {
			if (!isMounted.current) return
			console.log(res.data.message)
			callback(true)
			// history.push('/')
		})
		.catch(err => { 
			if (!isMounted.current) return
			callback(false)
			console.error(err)
			setServerError(err.response ? err.response.data.message : err.message)
		})
	}

	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		handleBlur,
		values, 
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, validateOrganization, submit)

	return (
		<div>
			<h1 className="header-2"> Agency Registration </h1> 
			<br/>
			<div className="bold ctr-1 invis"> 
				Only schools, healthcare or commmunity organisations in the Corangamite 
				Shire, Colac and Warrnambool in Victoria can register. 
				We hope to reach more communities very soon.
			</div>
			<br/>
			<div className="ctr-1">
				<FormWrapper
				error={serverError}
				isSubmitted={isSubmitted}
				confirmationContent={
					<div className="confirmation-message">
						<div className="header-3 display-flex flex-column"> 
							<i className="fas fa-check-circle"></i> 
								Thank you for applying to be an A Helping Hand Agency. 
								A member of our administration team will review and approve your registration as soon as possible. 						
								<div className="text-center">
									<button className="btn btn-black" type="text" onClick={() => history.push('/')}> Back to home </button>
								</div>
						</div>
					</div> 
				}
				isSubmitting={isSubmitting}>
				<form onSubmit={handleSubmit} className="display-flex flex-column">	

					<label> Contact name</label>
					<input
					name="contact_name"
					value={values.contact_name}
					onChange={handleChange}
					onBlur={handleBlur}
					className={errors.contact_name && 'error-input'}
					placeholder="eg. Sonya Lee"/>
					{errors.contact_name && <p className="error-text">{errors.contact_name}</p> }

					<label> Contact number (optional) </label>
					<input
					name="contact_number"
					value={values.contact_number}
					onChange={handleChange}
					onBlur={handleBlur}
					className={errors.contact_number && 'error-input'}
					placeholder="0123456789"/>
					{errors.contact_number && <p className="error-text">{errors.contact_number}</p> }

					<label> Organisation name </label>
					<input
					name="organization_name"
					value={values.organization_name}
					onChange={handleChange}
					onBlur={handleBlur}
					className={errors.organization_name && 'error-input'}
					placeholder="Your organisation name"/>
					{errors.organisation_name && <p className="error-text">{errors.organization_name}</p> }

					<label> About your organisation </label>
					<textarea
					name="about"
					value={values.about}
					onChange={handleChange}
					onBlur={handleBlur}
					className={errors.about && 'error-input'}
					placeholder="Please tell us a little bit about your organisation"/>
					{errors.about && <p className="error-text">{errors.about}</p> }

					<label> Address </label>
					<input
					name="address"
					value={values.address}
					onChange={handleChange}
					onBlur={handleBlur}
					className={errors.address && 'error-input'}
					placeholder="eg. 30 Smith Street"/>
					{errors.address && <p className="error-text">{errors.address}</p> }

					<label> Apartment/Unit/Building (optional) </label>
					<input
					name="org_street_address_secondary"
					value={values.apt_suite_bldg}
					onChange={handleChange}
					onBlur={handleBlur}
					className={errors.apt_suite_bldg && 'error-input'}
					placeholder="eg. Unit 20"/>
					{errors.apt_suite_bldg && <p className="error-text">{errors.apt_suite_bldg}</p> }
						
					<label> City </label>
					<input
					name="city"
					value={values.city}
					onChange={handleChange}
					onBlur={handleBlur}
					className={errors.city && 'error-input'}
					placeholder="City"/>
					{errors.city && <p className="error-text">{errors.city}</p> }

					<label> State </label>
					<select
					name="state"
					key={values.state}
					value={values.state.toUpperCase()}
					onChange={handleChange}
					onBlur={handleBlur}
					className={errors.state && 'error-input'}>
						<option value="QLD"> QLD </option>
						<option value="VIC"> VIC </option>
						<option value="NSW"> NSW </option>
						<option value="WA"> WA </option>
						<option value="TAS"> TAS </option>
						<option value="SA"> SA </option>
						<option value="NT"> NT </option>
					</select>
					{errors.state && <p className="error-text">{errors.state}</p> }

					<label> Postcode </label>
					<input
					name="postcode"
					value={values.postcode}
					onChange={handleChange}
					onBlur={handleBlur}
					className={errors.postcode && 'error-input'}
					placeholder="eg. 3000"/>
					{errors.postcode && <p className="error-text">{errors.postcode}</p> }

					<label> Country </label>
					<input
					name="country"
					value={values.country}
					onChange={handleChange}
					onBlur={handleBlur}
					className={errors.country && 'error-input'}
					placeholder="eg. Australia"/>
					{errors.country && <p className="error-text">{errors.country}</p> }

					<label> Company ABN (optional) </label>
					<input
					value={values.abn}
					name="abn"
					onChange={handleChange}
					onBlur={handleBlur}
					className={errors.abn && 'error-input'}
					placeholder="Your company ABN"/>
					{errors.abn && <p className="error-text">{errors.abn}</p> }

					<div className="form-checkbox display-flex align-items-center justify-center">
						<input 
						style={{"margin":"0px 8px 0px 0px"}}
						value={values.tos}
						name="tos"
						onChange={(e) => { e.target.value = e.target.checked; handleChange(e)}}
						onBlur={handleBlur}
						className={errors.tos && 'error-input'}
						type="checkbox"/>
						<div className="bold"> 
							I accept&nbsp;
							<a href="/terms-of-use" target="_none">Terms Of Use</a> 
							&nbsp;and&nbsp;
							<a href="/privacy-policy" target="_none">Privacy Policy</a> 
						</div>
					</div>
					<br/>
					{errors.tos && <p className="error-text">{errors.tos}</p> }

					<label> E-mail Address </label>
					<input
					name="email"
					type="email"
					value={values.email ? values.email : ""}
					className={errors.email && 'error-input'}
					placeholder="eg. john.smith@live.com"
					onBlur={handleBlur}
					onChange={handleChange}/>
					{errors.email && <p className="error-text">{errors.email}</p> }

					<label> Password (min. 6 characters) </label>
					<input 
					name="password"
					type="password"
					value={values.password ? values.password : ""}
					className={errors.password && 'error-input'}
					placeholder="Choose a strong password"
					onBlur={handleBlur}
					onChange={handleChange}/>
					{errors.password && <p className="error-text">{errors.password}</p> }

					<div className="form-checkbox display-flex flex-column align-items-center justify-center">
						<div className="display-flex align-items-center">
							<input 
							style={{"margin":"0px 8px 0px 0px"}}
							value={values.anonymous}
							name="anonymous"
							onChange={(e) => { e.target.value = e.target.checked; handleChange(e)}}
							onBlur={handleBlur}
							className={errors.anonymous && 'error-input'}
							type="checkbox"/>
							<div className="bold"> 
								Would your organisation like to remain anonymous to the public?
							</div>
						</div>
						<div className="italic">
							(Needs listed by an anonymous organisation will have 'local agent' as their author)
						</div>
					</div>
					<br/>
					{errors.anonymous && <p className="error-text">{errors.anonymous}</p> }


					<div className="text-center">
						<button className="btn btn-black" type="submit"> Submit </button>
					</div>

				</form>
				</FormWrapper>
			</div>

			<br/>
			<br/>
			<br/>
		</div>
	)

}

export default Register