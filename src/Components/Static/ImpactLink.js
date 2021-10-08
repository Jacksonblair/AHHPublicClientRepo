import react from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'

let ImpactLink = props => {

	let history = useHistory()
	let [ url, setUrl ] = react.useState("")

	// Get images from impact
	react.useEffect(() => {
		if (props.impact.impact_image_urls) {
			setUrl(props.impact.impact_image_urls.split(',').filter((impact) => impact)[0])
		}
	}, [props.impact])

	return (
		<div className="impact-link display-flex flex-column">
			<div className="impact-link-image">
				{ props.impact.impact_image_urls.length
					? <div className="image" style={{"backgroundImage":`url(${url})`}}/>
					: "No image"
				}
			</div>
			<div className="impact-link-content text-left bold"> 
				<div className="header-3 capitalize blue"> {props.impact.title} </div>
				{ 
					props.impact.content.length < 120 
					? props.impact.content 
					: props.impact.content.substr(0, 120) + "..."
				} 
			</div>
			<Link className="btn btn-blue" to={`/our-impacts/${props.impact.id}`}> Read More </Link>
		</div>
	)

}

export default ImpactLink