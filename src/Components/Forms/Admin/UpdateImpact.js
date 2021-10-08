import react from 'react'
import FormWrapper from '../../Misc/FormWrapper'
import useFormValidation from '../../Validation/useFormValidation'
import validateImpact from '../../Validation/validateImpact'
import useIsMounted from 'ismounted'
import server from '../../../server/functions'
import { useParams, useHistory } from 'react-router-dom'
import useFormMultipleImages from '../../Misc/useFormMultipleImages'

let UpdateImpact = props => {

	let history = useHistory()
	const isMounted = useIsMounted()
	let { impactid } = useParams()

	let INITIAL_STATE = {
		title: "",
		content: ""
	}

	let submit = async (callback) => {
		try {
			// Get policies for all the new images
			let result
			let uuids = []
			if (images.length) {
				result = await server.getSignedPolicies(images.length)
				uuids = result.data.policies.map((policy) => {
					return policy.fields.key
				})
			}	

			// Then we submit the updated 
			let existingUrls = existingImages.map((img) => img.url)
			let _result = await server.adminUpdateImpact(values.id, { ...values, uuids: uuids, delete: deleteImageUrls })

			if (uuids.length) {
				// Then if that works, submit the images to s3
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

	/*
		We use two 'useFormMultipleImages' hooks here. One to keep track of existing images, one for new images
		When we remove an existing one, we add to it to 'deleteImageUrls' explicitly to send to the server on submission
	*/

	let [ deleteImageUrls, setDeletImageUrls ] = react.useState([]) 
	let { images: existingImages, 
		setImages: setExistingImages, 
		onImageChange: onExistingImageChange, 
		removeImage: removeExistingImage } = useFormMultipleImages()
	let { images, setImages, onImageChange, removeImage } = useFormMultipleImages()

	let removedExistingImage = (i) => {
		let _urls = [...deleteImageUrls]
		_urls.push(existingImages[i].url)
		setDeletImageUrls(_urls)
	}

	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		values, 
		setValues,
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, validateImpact, submit)


	console.log(props)

	/* Set form values to impact passed as a prop */
	react.useEffect(() => {
		let impact
		props.impacts.forEach((_impact) => {
			if (_impact.id == impactid) { 
				impact = {..._impact}
				setValues({ ...values, ...impact })
				let _images = impact.impact_image_urls.split(',').map((url) => {
					return { url }
				})
				setExistingImages(_images)
				return 
			}
		})
	}, [])

	return (
		<>
			<FormWrapper
			error={serverError}
			isSubmitted={isSubmitted}
			isSubmitting={isSubmitting}
			confirmationContent={<div> Updated impact <button onClick={history.goBack}> Back </button> </div>}>
				<div className="header-2"> Updating Impact </div>
				<br/>
	 			<form className="display-flex flex-column" onSubmit={handleSubmit}>
					<label> Title </label>
					<input 
					name="title" 
					onChange={handleChange}
					value={values.title}
					className={errors.title && 'error-input'}
					placeholder="title" type="text"/>
					{errors.title && <p className="error-text">{errors.title}</p> }
					
					<div> 
						<label className="image-input" htmlFor="impact_image">
							<input 
							onChange={onImageChange} 
							type="file"
							id="impact_image" 
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
						{ existingImages && !!existingImages.length && existingImages.map((image, i) => {
							return ( 
								<img 
								style={{ "width": "150px" }}
								src={image.url} 
								key={i + 'impact-img'} 
								onClick={() => { removedExistingImage(i); removeExistingImage(i) }}/>
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
			</FormWrapper>

		</>
	)

}

export default UpdateImpact