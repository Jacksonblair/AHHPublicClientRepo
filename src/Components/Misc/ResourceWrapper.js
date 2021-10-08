import react from 'react'
import ahhlogo from '../../Assets/Images/ahhlogo.png'

const ResourceWrapper = props => {

	let [loading, setLoading] = react.useState(true)

	react.useEffect(() => {
		// On ResouceWrapper mount...
		// - Check if there is a getResource callback
		// - If there is, and condition is true, call it
		// - A callback is provided to confirm the resource loaded
		if (props.condition && props.getResource) {
			props.getResource(() => {
				setLoading(false)				
			})
		}
	}, [props.condition])

	/*
		States:
		- Hasnt met condition to access resource (only frontend check)
		- Resource GET error
		- Loading
		- Got resource
	*/


	return (
		<>
			{ !props.condition &&  
				<p> {props.conditionError ? props.conditionError : "Cannot access this resource"} </p>
			}

			{ props.error &&
				<div className="mt3 bold font-16 red"> {props.error} </div>
			}

			{ props.condition && loading && 
				<div className="my2"> <div className="loading-icon" style={{"backgroundImage":`url(${ahhlogo})`}}/> </div>
			}

			{ !props.error && props.condition && !loading && props.children }
		</>
	)

}

export default ResourceWrapper