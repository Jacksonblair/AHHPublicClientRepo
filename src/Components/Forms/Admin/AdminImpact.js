import react from 'react'
import { useHistory } from 'react-router-dom'

let AdminImpact = props => {

	let history = useHistory()
	let [ deleting, setDeleting ] = react.useState(false)

		// <div className={`${props.need.major && 'major'} px2 py1 my2 display-flex flex-column text-left`}> 
		// 	<div> <strong>Name:</strong> {props.need.name} </div>
		// 	<div> <strong>Major:</strong> {props.need.major ? "yes" : "no"} </div>
		// 	<div> <strong>Approved:</strong> {props.need.approved ? "yes" : "no"} </div>
		// 	<div> 
		// 		<strong>Expired for:</strong> {props.need.time_expired 
		// 			? `Days: ${props.need.time_expired.days ? props.need.time_expired.days : 0} 
		// 			Hours: ${props.need.time_expired.hours ? props.need.time_expired.hours : 0} 
		// 			Mins: ${props.need.time_expired.minutes ? props.need.time_expired.minutes : 0}` 
		// 			: "Not expired" } 
		// 	</div>
		// 	<div>
		// 		<button className="admin-button" onClick={() => history.push(`/org/${props.need.organization_id}/needs/${props.need.id}`)}> View need </button>
		// 		<button className="admin-button" onClick={() => history.push(`/org/${props.need.organization_id}/needs/${props.need.id}/update`)}> Edit need </button>
		// 		<button className="admin-button" onClick={() => props.toggleNeedMajor(props.need.id, props.index)}> {props.need.major ? "Remove major" : "Set as major"} </button>
		// 		<button className="admin-button" onClick={() => props.toggleNeedApproved(props.need.id, props.index)}> {props.need.approved ? "Remove approval" : "Approve need"} </button>

		// 		{ deleting && <>
		// 			<button className="admin-button" onClick={() => props.deleteNeed(props.need.id, props.index)}> Confirm </button>
		// 			<button className="admin-button" onClick={() => setDeleting(false)}> Cancel </button>
		// 		</> }

		// 		{ !deleting &&  
		// 			<button className="admin-button" onClick={() => setDeleting(true)}> Delete this need </button>
		// 		}
		// 	</div>
		// </div> 


	return (
		<div key={props.impact.id} className={`px2 py1 my2 display-flex flex-column text-left`}> 
			<div> <strong>title:</strong> {props.impact.title} </div>
			<div> <strong>content:</strong> {props.impact.content} </div>
			<div> <strong>created:</strong> {props.impact.created_at} </div>
			<div>
				<button className="admin-button" onClick={() => history.push(`/our-impacts/${props.impact.id}`)}> View Impact </button>
				<button className="admin-button" onClick={() => history.push(`/admin/cp/impacts/${props.impact.id}/update`)}> Edit impact </button>

				{ !deleting &&  
					<button className="admin-button" onClick={() => setDeleting(true)}> Delete impact </button>
				}

				{ deleting && <>
					<button className="admin-button" onClick={props.deleteImpact}> Confirm </button>
					<button className="admin-button" onClick={() => setDeleting(false)}> Cancel </button>
				</> }
			</div>
			<br/>
		</div> 
	)

}

export default AdminImpact