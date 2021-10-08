import react from 'react'
import { useHistory } from 'react-router-dom'

let AdminNeed = props => {

	let history = useHistory()
	let [ deleting, setDeleting ] = react.useState(false)


	return (
		<div className={`${props.need.major && 'major'} px2 py1 my2 display-flex flex-column text-left`}> 
			<div> <strong>Name:</strong> {props.need.name} </div>
			<div> 
				<strong>Major:</strong> {props.need.major ? "yes" : "no"} &nbsp;
				<strong>Approved:</strong> {props.need.approved ? "yes" : "no"}
			</div>
			<div className="display-flex"> 
				<strong>Expired for:&nbsp;</strong> 
				{ props.need.time_expired
					? <div className="red">
						Days: {props.need.time_expired.days > 0 ? props.need.time_expired.days : "0"}&nbsp;
						Hours: {props.need.time_expired.hours > 0 ? props.need.time_expired.hours : "0"}&nbsp; 
						Minutes: {props.need.time_expired.minutes > 0 ? props.need.time_expired.minutes : "0"}
					</div>
					: <div className="blue bold"> Not expired </div>
				}
			</div>
			<div>
				<button className="admin-button" onClick={() => history.push(`/org/${props.need.organization_id}/needs/${props.need.id}`)}> View need </button>
				<button className="admin-button" onClick={() => history.push(`/org/${props.need.organization_id}/needs/${props.need.id}/update`)}> Edit need </button>
				<button className="admin-button" onClick={() => props.toggleNeedMajor(props.need.id, props.index)}> {props.need.major ? "Remove major" : "Set as major"} </button>
				<button className="admin-button" onClick={() => props.toggleNeedApproved(props.need.id, props.index)}> {props.need.approved ? "Remove approval" : "Approve need"} </button>

				{ deleting && <>
					<button className="admin-button" onClick={() => props.deleteNeed(props.need.id, props.index)}> Confirm </button>
					<button className="admin-button" onClick={() => setDeleting(false)}> Cancel </button>
				</> }

				{ !deleting &&  
					<button className="admin-button" onClick={() => setDeleting(true)}> Delete this need </button>
				}
			</div>
			<br/>
		</div> 
	)

}

export default AdminNeed