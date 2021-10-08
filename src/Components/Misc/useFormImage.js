import react from 'react'

let useFormImage = props => {

	/*
		How does it work:
		- We get a file, and turn it into a url
		- If cancelled, we wipe the url from memory
		- This removes this logic out of any component that uses an image preview
	*/

	let [ image, setImage ] = react.useState({})
	let [ imageUrl, setImageUrl ] = react.useState('')

	let onImageChange = (event) => {
		// Use FileReader to parse file into a url
		if (event.target.files[0]) {
			URL.revokeObjectURL(imageUrl)
			let reader = new FileReader()
			reader.onloadend = () => {
				setImageUrl(reader.result)
			}
			reader.readAsDataURL(event.target.files[0])
			setImage(event.target.files[0])		
		}
	}

	let onImageRemove = (event) => {
		let reader = new FileReader()
		URL.revokeObjectURL(imageUrl)
		setImageUrl('')
		setImage({})
	}

	react.useEffect(() => {
		// Cleanup function for removing image from memory
		return () => {
			let reader = new FileReader()
			URL.revokeObjectURL(imageUrl)
		}
	}, [])

	return { onImageChange, onImageRemove, image, imageUrl }
}

export default useFormImage