import react from 'react'
import useFormValidation from '../Validation/useFormValidation'
import validateNeed from '../Validation/validateNeed.js'
import ResourceWrapper from '../Misc/ResourceWrapper.js'
import FormWrapper from '../Misc/FormWrapper.js'
import { withRouter, Link, useParams, useHistory } from 'react-router-dom'
import server from '../../server/functions.js'
import useIsMounted from 'ismounted'
import useFormImage from '../Misc/useFormImage'
import Session from "supertokens-auth-react/recipe/session"

let UpdateNeed = props => {

	const isMounted = useIsMounted()
	let { orgid, needid } = useParams()
	let history = useHistory()

	let INITIAL_STATE = {
		name: "",
		details: "",
		region: "",
		category: "",
		requirements: ""
	}

	let submit = async (callback) => {
		setServerError("")		

		// server.updateNeed(orgid, needid, values)
		// .then(res => {
		// 	props.updateNeed(values)
		// 	if (!isMounted.current) return
		// 	callback(true)
		// })
		// .catch(err => {
		// 	if (!isMounted.current) return
		// 	setServerError(err.response ? err.response.data.message : err.message)
		// 	callback()
		// })

		try {
			let uuid, result
			
			// If we want to upadload an image for the need
			if (image.type) {

				// ..get a signed policy first
				result = await server.getSignedPolicy(orgid)
				uuid = result.data.signed.fields.key

				// Then submit the need update to the server
				await server.updateNeed(orgid, needid, {...values, need_image_url: `https://s3.ap-southeast-2.amazonaws.com/ahelpinghandbucket/${uuid}` })
				
				// Then if that works, submit the image to s3
				await server.uploadImageToS3(result.data.signed, image)

				if (!isMounted.current) return
				props.updateNeed({...values, need_image_url: `https://s3.ap-southeast-2.amazonaws.com/ahelpinghandbucket/${uuid}` })
			} else {
				// Otherwise if we're just updating the need without uploading a new image, we send 'values'
				await server.updateNeed(orgid, needid, values)
				if (!isMounted.current) return
				props.updateNeed(values)
			}

			callback(true)
		} catch(err) {  
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		}

	}

	let [ need, setNeed ] = react.useState({})
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

	react.useEffect(() => {
		setValues({...values, ...props.need})
	}, [])

	/*
		Hackily setting up this component to also be used by admins to edit a need.
	*/
	let [ isAdmin, setIsAdmin ] = react.useState(false)
	react.useEffect(async () => {
		let doesSessionExist = await Session.doesSessionExist()
		if (doesSessionExist) {
			let jwtPayload = await Session.getJWTPayloadSecurely()
			if (jwtPayload["role"] == "admin") setIsAdmin(true)
		}
	}, [])

	let deleteImage = () => {
		setValues({...values, need_image_url: ""})
		console.log(values)
	}

	return (
		<ResourceWrapper
		error={serverError}
		getResource={(cb) => cb()}
		condition={props.userId == orgid || isAdmin}>
			<div className="ctr-2">
			{ isAdmin && <div className="header-3 blue"> Editing as Admin </div> }
			<FormWrapper
				confirmationContent={ 
/*						<>
						<i className="font-40 green fas fa-check-circle mb2"></i> 
						<div className="header-3">
							Your need listing has been updated
						</div>
						<form>
							{ isAdmin && 
								<button className="mt3" type="text" onClick={() => history.push(`/admin/cp`)}> Back to Admin CP </button>
							}
							<button className="mt3" type="text" onClick={() => history.push(`/org/${orgid}/needs/${needid}`)}> View Need </button>
						</form>
					</>*/
					<div className="confirmation-message flex-column display-flex justify-center align-items-center">
						<i className="fas fa-check-circle mb2"></i> 
						<div className="header-3">
							Your need listing has been updated. 
							A member of our administration team will review and approve the changes as soon as possible. 						
						</div>
						<button className="btn btn-black" type="text" onClick={ () => history.push(`/org/${orgid}/needs/${needid}`) }> View Need </button>
					</div>

				}
				isSubmitted={isSubmitted}
				isSubmitting={isSubmitting}>
				<div className="header-2"> Edit need </div>

					<form onSubmit={handleSubmit} className="display-flex flex-column"> 

						<div className="upload-image-container display-flex flex-column align-items-center">

							{/* Show existing image if there is one */}
							{ values.need_image_url && !imageUrl && <>
								<label className="text-center"> Image for the Need (optional) </label>
								<div className="thumb-2" style={{"backgroundImage":`url(${values.need_image_url})`}}/>
							</> }

							{/* Show new image preview if we've uploaded one */}
							{ imageUrl && <>
									<label className="text-center"> Image Preview </label>
									<div className="thumb-2" style={{"backgroundImage":`url(${imageUrl})`}}/>
									<button className="btn btn-black" onClick={(e) => { e.preventDefault(); onImageRemove() }}> Cancel </button> 
							</> }

							<div>
								{/* Show upload button if we havn't uploaded a new one */}
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

								{/* Show delete button if there is an existing need photo */}
								{ !imageUrl && values.need_image_url && 
									<button className="btn btn-black" onClick={(e) => { e.preventDefault(); deleteImage() }}> 
										<i className="fas fa-times"/> Delete Photo 
									</button>
								}
							</div>
						</div>


						<label htmlFor="name">  Title of the need  </label>
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

						<div className="text-center">
							<button className="btn btn-black" type="submit"> Submit </button>
						</div>
						<Link className="form-text-link" to={`/org/${props.need.organization_id}/needs/${props.need.id}`}> Back to the need </Link> 

					</form>

				</FormWrapper>
			</div>
		</ResourceWrapper>
	)

}

export default UpdateNeed