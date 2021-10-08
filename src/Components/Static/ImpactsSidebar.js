import react from 'react'
import { Link } from 'react-router-dom'
import './Impacts.css'

let ImpactsSidebar = props => {

	return (
		<div className="side-ctr-3 display-flex flex-column">
			<Link className="black impact-sidebar-link" to={`/our-impacts/`}> 
				<div className="black"> Our impacts </div>
			</Link>	
			{ props.impacts.map((impact) => {
				return (
					<Link key={impact.id} 
					className="impact-sidebar-link"
					to={`/our-impacts/${impact.id}`}> 
						<div className="blue"> {impact.title} </div>
					</Link>	
				)
			})}
		</div>
	)

}

export default ImpactsSidebar