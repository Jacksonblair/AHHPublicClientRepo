import react from 'react'
import { Link, useParams } from 'react-router-dom'
import './CurrentNeeds.css'

let NeedsSidebar = props => {

	let { region } = useParams()

	return (
		<div className="needs-sidebar side-ctr-4 text-left">
			<Link to={`/current-needs/${region}`}> 
				<div className="capitalize"> <i className="fas fa-compass"></i> <br/> {region} Major Needs </div>
			</Link>		
			<Link to={`/current-needs/${region}/living`}> 
				<div> <i className="fas fa-home"></i> <br/> Living Needs </div>
			</Link>		
			<Link to={`/current-needs/${region}/educational`}> 
				<div> <i className="fas fa-graduation-cap"></i> <br/> Education Needs </div>
			</Link>		
			<Link to={`/current-needs/${region}/sports-and-social`}> 
				<div> <i className="fas fa-volleyball-ball"></i><br/> Sport or Social Needs </div>
			</Link>		
			<Link to={`/current-needs/${region}/parenting-and-baby`}> 
				<div> <i className="fas fa-baby-carriage"></i><br/> Parenting/Baby Needs </div>
			</Link>		
			<Link to={`/current-needs/${region}/job-help-or-mentoring`}> 
				<div> <i className="fas fa-briefcase"></i><br/> Job Help or Mentoring </div>
			</Link>
		</div>
	)

}

export default NeedsSidebar