import react from 'react'
import FormWrapper from '../../Misc/FormWrapper'
import useFormValidation from '../../Validation/useFormValidation'
import validateImpact from '../../Validation/validateImpact'
import useIsMounted from 'ismounted'
import server from '../../../server/functions'
import { useHistory } from 'react-router-dom'
import useFormMultipleImages from '../../Misc/useFormMultipleImages'

let AddImpact = props => {

	/* 
		IMAGE HANDLING:
		Adding impact:
			Add/remove multiple images
			Image uuid's get sent as array to server to be stored
			
		Removing impact:
			All image uuids for that impact need to be wiped from S3

		Updating impact:
			We remove or add urls to the array
			On the server, it iterates over the array, checking against whats stored.
			Any missing uuids from the new array need to be wiped from S3
	*/


	let history = useHistory()
	const isMounted = useIsMounted()

	let INITIAL_STATE = {
		title: "",
		content: ""
	}

	let submit = async (callback) => {

		try {
			// If they uploaded an images to go along with the need..
			// ..get signed policies first
			let uuids = []
			let result = []

			if (images.length) {
				result = await server.getSignedPolicies(images.length)
				uuids = result.data.policies.map((policy) => {
					return policy.fields.key
				})
			}

			// Then submit the impact to the server
			await server.adminAddImpact({ ...values, uuids: uuids })

			console.log(uuids)

			if (uuids.length) {
				// Then if that works, submit the image(s) to s3
				await server.uploadImagesToS3(result.data.policies, images)
			}

			if (!isMounted.current) return
			callback(true)
		} catch(err) {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		}

	}

	// let submit = async (callback) => {
	// 	try {
	// 		// If we uploaded an image(s) to go along with the impact..
	// 		// ..get a signed policy first

	// 		let result = await server.adminAddImpact(values)
	// 		if (!isMounted.current) return
	// 		callback(true)
	// 	} catch(err) {
	// 		if (!isMounted.current) return
	// 		setServerError(err.response ? err.response.data.message : err.message)
	// 		callback()
	// 	}
	// }

	const [ newNeedId, setNewNeedId ] = react.useState(null)
	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		values, 
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, validateImpact, submit)

	let { images, onImageChange, removeImage } = useFormMultipleImages()


	return (
		<>

			<FormWrapper
			error={serverError}
			isSubmitted={isSubmitted}
			isSubmitting={isSubmitting}
			confirmationContent={<div> Added new impact <button onClick={history.goBack}> Back </button> </div>}>
				<div className="header-2"> Add new impact </div>
				<div>
		 			<form className="display-flex flex-column" onSubmit={handleSubmit}>
						<label> Title </label>
						<input 
						name="title" 
						onChange={handleChange}
						value={values.title}
						className={errors.title && 'error-input'}
						placeholder="title" type="text"/>
						{errors.title && <p className="error-text">{errors.title}</p> }
						
						<br/>

						<div> 
							<label className="image-input" htmlFor="need_image">
								<input 
								onChange={onImageChange} 
								type="file"
								id="need_image" 
								accept="image/png, image/jpeg"/>
							</label>
							<br/>
							<div className="italic"> Click image to remove from impact. Submit to save. </div>
							<br/>
							{ images && !!images.length && images.map((image, i) => {
								return ( 
									<img 
									style={{ "width": "150px" }}
									src={image.url} 
									key={i + 'impact-img'} 
									onClick={() => removeImage(i)}/>
								)
							})}
						</div>
						<br/>

						<label> Content </label>
						<textarea 
						name="content" 
						onChange={handleChange}
						value={values.content}
						className={errors.content && 'error-input'}
						placeholder="content" type="text"/>
						{errors.content && <p className="error-text">{errors.content}</p> }
						<br/>

						<div>
							<button> Submit </button>
							<button onClick={(e) => { e.preventDefault(); history.goBack() }}> Cancel </button>
						</div>

					</form>
				</div>
			</FormWrapper>

		</>
	)

}

export default AddImpact