import react from 'react'
import useIsMounted from 'ismounted'
import useFormValidation from '../Validation/useFormValidation'
import validateAbout from '../Validation/validateAbout'
import FormWrapper from '../Misc/FormWrapper'
import server from '../../server/functions'
import './OrganizationAbout.css'

let INITIAL_STATE = {
	about: ""
}

let OrganizationAbout = props => {

	const isMounted = useIsMounted()

	let submit = (callback) => {
		setTimeout(() => {
			setServerError("")		
			server.updateOrganizationAbout(props.userId, values.about)
			.then(res => {
				if (!isMounted.current) return
				callback()
				props.updateAbout(values.about)
				toggleEditAbout()
			})
			.catch(err => {
				if (!isMounted.current) return

				setServerError(err.response ? err.response.data.message : err.message)
				callback()
			})
		}, 1000)
	}

	let toggleEditAbout = () => {
		setEditingAbout(!editingAbout)
		setServerError("")
	}

	const [ editingAbout, setEditingAbout ] = react.useState(false)
	const [ serverError, setServerError ] = react.useState(null)
	const { handleSubmit, 
		handleChange, 
		values, 
		setValues,
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, validateAbout, submit)

	// Set 'about' value using prop passed from 'OrganizationProfile' on load
	react.useEffect(() => {
		setValues({ about: props.about })
	}, [])

	return (
		<div className="text-left">
			<div className="bold"> About this organisation: </div>
			{editingAbout ? 
				<FormWrapper
				error={serverError}
				isSubmitted={isSubmitted}
				isSubmitting={isSubmitting}>
					<form onSubmit={handleSubmit} 
					className="display-flex flex-column">
						<textarea
						name="about"
						value={values.about}
						placeholder="Please tell us a little bit about your organization."
						className={"text-area-about " + (errors.about && 'error-input')}
						onChange={handleChange}/>
						<div className="mobile-about-buttons">
							<button className="submit-about btn btn-black" type="submit"> Submit </button>
							<button className="btn btn-black" type="text" onClick={(e) => { e.preventDefault(); toggleEditAbout() }}> Cancel </button>
						</div>
					</form>
				</FormWrapper>
				:
				<div className="org-profile-about">
					<div className=""> { props.about } </div>
					{ props.isOwner && 
						<button onClick={() => toggleEditAbout()} 
						className="edit-profile-about-button">
							<i className="fas fa-edit font-20"></i>
						</button> 
					}
					{ serverError && <div> {serverError} </div> }
				</div>
			}
		</div>
	)


}

export default OrganizationAbout