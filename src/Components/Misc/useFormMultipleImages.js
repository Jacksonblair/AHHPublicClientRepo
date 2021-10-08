import react from 'react'
import useFormImage from '../Misc/useFormImage'

let useFormMultipleImages = props => {

	/*
		How does this one work
		- We keep an array of objects, which consists of
			url: Blob URI of object
			file: ref to object
	*/

	let [ images, setImages ] = react.useState([])

	let removeImage = (i) => {
		// When we remove image, remove the image from memory
		let _images = [...images]
		URL.revokeObjectURL(_images[i].url)		
		_images.splice(i, 1)
		setImages(_images)
	}

	let onImageChange = (event) => {
		// console.log(e.target.files[0])
		if (event.target.files[0]){
			let image = {}
			let reader = new FileReader()
			reader.onloadend = () => {
				image.url = reader.result
				image.file = event.target.files[0]
				setImages([...images, image])
			}
			reader.readAsDataURL(event.target.files[0])
		}
	}

	return { images, setImages, onImageChange, removeImage }

}

export default useFormMultipleImages