import react from 'react'
import useFormValidation from '../Validation/useFormValidation'
import FormWrapper from '../Misc/FormWrapper.js'
import ResourceWrapper from '../Misc/ResourceWrapper.js'
import useIsMounted from 'ismounted'
import validateNeed from '../Validation/validateNeed.js'
import server from '../../server/functions.js'
import { Link, useParams, useHistory } from 'react-router-dom'
import useFormImage from '../Misc/useFormImage'
import './AddNeed.css'

let AddNeed = props => {

	const isMounted = useIsMounted()
	let history = useHistory()
	let { orgid } = useParams()

	let INITIAL_STATE = {
		name: "",
		details: "",
		region: "geelong",
		requirements: "",
		category: "educational"
	}

	let submit = async (callback) => {

		try {
			// If we uploaded an image(s) to go along with the impact..
			// ..get a signed policy first
			let uuid, result
			if (image.type) {
				result = await server.getSignedPolicy(orgid)
				uuid = result.data.signed.fields.key
			}

			// Then submit the need to the server
			let _result = await server.addNeed(orgid, {...values, uuid})
			
			if (image.type) {
				// Then it that works, submit the image to s3
				await server.uploadImageToS3(result.data.signed, image)
			}

			if (!isMounted.current) return
			
			// Get new need UUID from server for confirmation message redirect button
			setNewNeedId(_result.data.id)

			callback(true)
		} catch(err) {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		}
	}

	const [ newNeedId, setNewNeedId ] = react.useState(null)
	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		handleBlur,
		values, 
		setValues,
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, validateNeed, submit)
	let { onImageChange, onImageRemove, image, imageUrl } = useFormImage()

	return (
		<>
			<div className="ctr-2">
			<ResourceWrapper condition={props.userId == orgid} getResource={(cb) => cb()}>
				<FormWrapper 
				error={serverError}
				isSubmitted={isSubmitted}
				isSubmitting={isSubmitting}
				confirmationContent={
					<div className="confirmation-message display-flex flex justify-center flex-column align-items-center">
						<i className="fas fa-check-circle"></i> 
						<div className="header-3">
							Thank you for listing your need with A Helping Hand.
							A member of our administration team will review and publish your listing as soon as possible. 
						</div>
						<form>
							<button className="btn btn-black" type="text" onClick={() => history.push(`/org/${orgid}/profile`)}> Back to profile </button>
						</form>
					</div>
				}>
					<form onSubmit={handleSubmit} className="display-flex flex-column"> 
						{ props.jwtPayload && !props.jwtPayload.approved && 
							<div className="red bold italic"> Your organization is not approved yet. You will not be able to submit a need. </div>
						}
						<div className="header-2 text-left desktop-only"> Create New Need </div> 
						<div className="header-2 mobile-only"> Create New Need </div> 
						<div className="upload-image-container display-flex flex-column align-items-center">
							<label> Image for the Need (optional) </label>
							{ !imageUrl && 
								<label className="btn btn-black upload-image-button" htmlFor="need_image">
									<i className="fas fa-folder-open"></i>&nbsp;Upload Photo
									<input 
									onChange={onImageChange} 
									type="file"
									id="need_image" 
									accept="image/png, image/jpeg"/>
								</label>
							}
							{ imageUrl && 
								<>
								<div className="add-need-image-container">
									<div className="thumb-2" style={{"backgroundImage":`url(${imageUrl})`}}/>
								</div>
								<button className="btn btn-black" onClick={(e) => { e.preventDefault(); onImageRemove() }}> Cancel </button> 
								</>
							}
						</div>

						<label htmlFor="name"> Title of the need </label>
						<input
						name="name"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.name}
						className={errors.name && 'error-input'}
						type="text" placeholder="Max 35 characters"/>
						{ errors.name && <p className="error-text">{errors.name}</p> } 
						
						<label htmlFor="region"> Region/Suburb </label>
						<select 
						name="region" 
						selected="geelong"
						value={values.region} 
						className={errors.region && 'error-input'}
						onBlur={handleBlur}
						onChange={handleChange}>
							<option value="geelong"> Geelong </option>
							<option value="warrnambool"> Warrnambool </option>
							<option value="corangamite"> Corangamite Shire </option>
						</select>
						{ errors.region && <p className="error-text">{errors.region}</p> } 
						
						<label htmlFor="category"> Category </label>
						<select 
						name="category" 
						selected="Educational"
						value={values.category} 
						className={errors.category && 'error-input'}
						onBlur={handleBlur}
						onChange={handleChange}>
							<option value="educational"> Educational </option>
							<option value="living"> Living </option>
							<option value="sports-and-social"> Sports and Social </option>
							<option value="parenting-and-baby"> Parenting and Baby </option>
							<option value="job-help-or-mentoring"> Job Help or Mentoring </option>
						</select>
						{ errors.category && <p className="error-text">{errors.category}</p> } 

						<label htmlFor="details"> Description of the need </label>
						<textarea 
						name="details"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.details}
						placeholder="Text"
						className={errors.details && 'error-input'}
						type="text" placeholder="Please describe the need in detail"/>
						{ errors.details && <p className="error-text">{errors.details}</p> } 

						<label htmlFor="requirements"> Requirements </label>
						<textarea 
						name="requirements"
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.requirements}
						placeholder="Text"
						className={errors.requirements && 'error-input'}
						type="text" placeholder="eg. Working With Children Check"/>
						{ errors.requirements && <p className="error-text">{errors.requirements}</p> } 

						<div className="display-flex justify-center">
							<button className="btn btn-black" type="submit"> Submit </button>
						</div>	

						<Link className="text-left form-text-link mobile-only" to={`/org/${orgid}/profile`}> Back to profile </Link> 

					</form>
				</FormWrapper>
			</ResourceWrapper>
			</div>
		</>
	)

}

export default AddNeed