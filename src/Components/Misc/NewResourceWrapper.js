import react from 'react'
import ahhlogo from '../../Assets/Images/ahhlogo.png'
import { useHistory } from 'react-router-dom'
import useIsMounted from 'ismounted'

const NewResourceWrapper = getResource => {
	/*
		This hook is for API calls.

		This hook returns an object, containing:
		- A component that is updated based on the state of this hook..
		.. which renders the children passed to it, depending on whether..
		.. or not this hook has finished loading some content.

		- A function exposed to repeat the api request
	*/

	let [ loading, setLoading ] = react.useState(false)
	let [ error, setError ] = react.useState("")
	let [ resource, setResource ] = react.useState(null)
	let isMounted = useIsMounted() 

	let get = async () => {

		setTimeout(async() => {
			try {
				let result = await getResource()
				if (!isMounted.current) return
				setResource(result.data)
				setLoading(false)
			} catch(err) {
				if (!isMounted.current) return
				setLoading(false)
				setError(err?.message)
			}			
		}, 2000)

		// console.log("Getting resource")
		setLoading(true)

	}

	// Call get on load	
	react.useEffect(async() => {
		if (!getResource) {
			setError("No getResource function passed")
		} else {
			get()
		}
	}, [])

	/*
		Render error if there is one
		Otherwise render children
	*/

	let Content = props => {
		let history = useHistory()
		return ( <>
			{ loading && <div> Loading... </div> }
			{ !loading && !!error && <div> {error} </div> }
			{ resource && !loading && !error && props.children }
		</> )

	}

	return { Content, resource, get }
}

export default NewResourceWrapper