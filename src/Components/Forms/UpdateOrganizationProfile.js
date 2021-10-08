import react from 'react'
import useFormValidation from '../Validation/useFormValidation'
import validateOrganizationProfileUpdate from '../Validation/validateOrganizationProfileUpdate.js'
import useIsMounted from 'ismounted'
import FormWrapper from '../Misc/FormWrapper.js'
import ResourceWrapper from '../Misc/ResourceWrapper.js'
import server from '../../server/functions.js'
import { useHistory, useParams, Link } from 'react-router-dom'
import './UpdateOrganizationProfile.css'

let UpdateOrganizationProfile = props => {

	let isMounted = useIsMounted()
	let history = useHistory()
	let { orgid } = useParams()

	let INITIAL_STATE = {
		contact_name: "",
		contact_number: "",
		organization_name: "",
		address: "",
		apt_suite_bldg: "",
		city: "",
		state: "",
		postcode: "",
		country: "",
		anonymous: ""
	}

	let submit = (callback) => {
		setServerError("")
		server.updateOrganizationProfile(props.userId, values)
		.then(res => {
			if (!isMounted.current) return
			callback(true)
			props.updateProfile(values)
		})
		.catch(err => {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		}) 
	}

	const [ serverError, setServerError ] = react.useState(null)
	let { handleSubmit, 
		handleChange, 
		handleBlur,
		values, 
		setValues,
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, validateOrganizationProfileUpdate, submit)

	react.useEffect(() => {
		props.profile.anonymous = props.profile.anonymous.toString()
		setValues({...values, ...props.profile})
	}, [])

	return (
		<div className="ctr-3 flex display-flex flex-column justify-center">
			<div className="header-2 top-left-abs-header"> Edit Organization Details </div>
			<div className="ctr-1 update-org-ctr">
				<div className="header-2 mobile-only text-center"> Change Password </div>
				<br className="mobile-only"/>
				<ResourceWrapper condition={props.userId == orgid} getResource={(cb) => cb()}>
					<FormWrapper
					error={serverError}
					isSubmitted={isSubmitted}
					confirmationContent={
						<div className="confirmation-message">
							<i className="fas fa-check-circle"></i> 
							<div className="header-3">
								Your organization details have been updated
							</div>
							<button className="btn btn-black" type="text" onClick={() => history.push(`/org/${orgid}/profile`)}> Back to Profile </button>
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
							{errors.organization_name && <p className="error-text">{errors.organization_name}</p> }

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

							<div className="form-checkbox display-flex flex-column align-items-center justify-center">
								<div className="display-flex align-items-center">
									<input 
									style={{"margin":"0px 8px 0px 0px"}}
									value={values.anonymous}
									checked={values.anonymous == "true" ? true : false}
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
						
							<Link className="text-left form-text-link mobile-only" to={`/org/${orgid}/profile`}> Back to profile </Link> 
							<Link className="text-left form-text-link" to={`/org/${orgid}/delete`}> Delete your account </Link> 

						</form>

					</FormWrapper>
				</ResourceWrapper>
			</div>
		</div>
	)

}

export default UpdateOrganizationProfile