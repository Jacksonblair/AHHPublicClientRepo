import react from 'react'
import { Link } from 'react-router-dom'
import ImpactLink from './ImpactLink'

function Impacts(props) {
	return (
		<>
			<div className="ctr-2">
				<h1 className="header-2 blue"> Our Impacts </h1> 
				<br/>
				A Helping Hand is built on the good will and kindness of our local community members who wish to make a difference to other locals. Please view some of the special stories of the impact A Helping Hand has been able to have through locals helping locals.
				<div className="impacts-container display-flex flex-wrap justify-space-between">
					{ 
						props.impacts.map((impact) => {
							return (
								<ImpactLink key={impact.id} impact={impact}/>
							)						
						})
					}
				</div>
			</div>
		</>
	)
}

export default Impacts