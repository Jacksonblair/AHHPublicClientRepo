import react from 'react'
import { useHistory, useParams } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

let Impact = props => {
	let history = useHistory()
	let { impactid } = useParams()
	let [ impact, setImpact ] = react.useState({})
	let [ urls, setUrls ] = react.useState({})

	react.useEffect(() => {
		props.impacts.forEach((_impact) => {
			setUrls([]) 
			if (_impact.id == impactid) setImpact(_impact)
		})
	}, [impactid])

	// Get images from impact
	react.useEffect(() => {
		if (impact.impact_image_urls) {
			setUrls(impact.impact_image_urls.split(',').filter((impact) => impact))
		}
	}, [impact])

	return (
		<div className="ctr-2">
			<div className="header-2 blue"> {impact.title} </div> 
			<br className="desktop-only"/>
	        <Carousel
	        infiniteLoop={true}
	        showThumbs={false}
	        dynamicHeight={false}>
	        	{ urls.length && urls.map((url) => {
	        		return (
	        			<div key={url + impactid} className="carousel-image" style={{"backgroundImage":`url(${url})`}}/>
	        		)
	        	})}
	        </Carousel>
	        <br/>
			<div style={{"whiteSpace":"break-spaces"}} className="text-left bold"> {impact.content} </div>
		</div>
	)

}

export default Impact