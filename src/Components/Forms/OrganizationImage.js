import react from 'react'
import useIsMounted from 'ismounted'
import useFormValidation from '../Validation/useFormValidation'
import FormWrapper from '../Misc/FormWrapper'
import server from '../../server/functions'
import useFormImage from '../Misc/useFormImage'
import './OrganizationImage.css'

let OrganizationImage = props => {

	const isMounted = useIsMounted()

	let onSubmitImage = async (e) => {

		e.preventDefault()
		try {
			setIsSubmitting(true)
			
			let result = await server.getSignedPolicy(props.userId)
			let uuid = result.data.signed.fields.key

			await server.uploadImageToS3(result.data.signed, image)
			await server.updateOrganizationImage(props.userId, uuid)

			setIsSubmitting(false)
			setEditingImage(false)

			if (!isMounted.current) return
			props.updateImage(`https://s3.ap-southeast-2.amazonaws.com/ahelpinghandbucket/${uuid}`)
		} catch(err) {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
		}
	}

	let toggleEditingImage = () => {
		setShowSubmit(false)
		setEditingImage(!editingImage)
	}

	const [ editingImage, setEditingImage ] = react.useState(false)
	const [ showSubmit, setShowSubmit ] = react.useState(false)
	const [ serverError, setServerError ] = react.useState(null)
	const [ isSubmitting, setIsSubmitting ] = react.useState(false)
	let { onImageChange, onImageRemove, image, imageUrl } = useFormImage()

	return (
		<div>
			{editingImage ? 
				<FormWrapper
				error={serverError}
				isSubmitted={false}
				isSubmitting={isSubmitting}>
					<form className="org-profile-image upload-image-container" onSubmit={onSubmitImage}>
						{ !imageUrl && <>
							<div className="bold"> Updating profile image </div>
							<label className="upload-image-button btn btn-black" htmlFor="org_image" tabIndex={0}>
								<i className="fas fa-folder-open"></i>&nbsp;Upload Photo
								<input 
								onChange={onImageChange} 
								type="file"
								id="org_image" 
								accept="image/png, image/jpeg"/>
							</label> </>
						}
						{ imageUrl && <>
							<div className="bold"> Preview </div>
							<div className="thumb-2" style={{"backgroundImage":`url(${imageUrl})`}}/>
							</>
						}

						<div>
							{ imageUrl && <button className="submit btn btn-black" type="submit"> Submit </button>}
							<button className="btn btn-black" onClick={(e) => { e.preventDefault(); onImageRemove(); toggleEditingImage() }}> Cancel </button>
						</div>
					</form>
				</FormWrapper>
				:
				<div className="org-profile-image">
					<div className="org-profile-image-thumb-container">
						{ props.profileImageUrl && 
							<div className="thumb-2" style={{"backgroundImage":`url(${props.profileImageUrl})`}}/>
						}
						{ !props.profileImageUrl && 
							<div className="header-2"> No profile image </div>
						}
						{ props.isOwner && 
							<button onClick={() => toggleEditingImage()} className="edit-profile-image-button btn btn-black">
								<i className="fas fa-edit font-20"></i>
							</button> 
						}
					</div>
				</div>
			}
		</div>
	)


}

export default OrganizationImage