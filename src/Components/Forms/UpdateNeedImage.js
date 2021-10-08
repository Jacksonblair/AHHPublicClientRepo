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

	let submit = async (callback) => {
		setServerError("")		
		try {
			let uuid, result
			if (image.type) {

				// If we uploaded an image(s) to go along with the impact..
				// ..get a signed policy first
				result = await server.getSignedPolicy(orgid)
				uuid = result.data.signed.fields.key

				// Then submit the need update to the server
				await server.updateNeed(orgid, needid, {...values, need_image_url: `https://s3.ap-southeast-2.amazonaws.com/ahelpinghandbucket/${uuid}` })
				
				// Then it that works, submit the image to s3
				await server.uploadImageToS3(result.data.signed, image)

				if (!isMounted.current) return
				props.updateNeed({...values, need_image_url: `https://s3.ap-southeast-2.amazonaws.com/ahelpinghandbucket/${uuid}` })
			} else {
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
		<FormWrapper
		confirmationContent={null}
		isSubmitted={isSubmitted}
		isSubmitting={isSubmitting}>
			<form>

				{/* Show existing image if there is one */}
				{ props.need.need_image_url && !imageUrl && <>
					<label className="text-center"> Image for the Need (optional) </label>
					<div className="thumb-2" style={{"backgroundImage":`url(${props.need.need_image_url})`}}/>
				</> }

				{/* Show new image preview if we've uploaded one */}
				{ imageUrl && <>
						<label className="text-center"> Image Preview </label>
						<div className="thumb-2" style={{"background-image":`url(${imageUrl})`}}/>
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
					{ !imageUrl && props.need.need_image_url && 
						<button className="btn btn-black"> 
							<i className="fas fa-times"/> Delete Photo 
						</button>
					}
				</div>
			</form>

		</FormWrapper>
	)

}

export default UpdateNeed