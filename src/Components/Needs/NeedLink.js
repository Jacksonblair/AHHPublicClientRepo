import react from 'react'
import { useHistory, useParams, Link } from 'react-router-dom'

let NeedLink = props => {

	let history = useHistory()

	return (

		<div className={`ctr-4 need ${props.need.major && 'major'} text-left bold display-flex flex-column`}> 
			{ !props.need.fulfilled && props.userId == props.need.organization_id &&
				<div>
					{props.need.approved ? <> <i className="fas fa-check green"/> Approved </> : <> <i className="fas fa-times red"/> Not yet approved </>} 
				</div>
			}
			{ props.need.fulfilled && <div className="blue text-center"><i className="fas fa-check"/>&nbsp; Fulfilled {props.need.fulfilled_at} </div>}
			
			<div className={`header-3 capitalize`}> {props.need.name} </div>
			<div className="flex"> { props.need.details.length < 150 
				? props.need.details 
				: ( 
					<> {props.need.details.substr(0, 150) + "..."}&nbsp;
					<Link to={`/org/${props.need.organization_id}/needs/${props.need.id}`}>see more</Link> </>
				)} 
			</div>

			<div className="text-center display-flex flex-column align-items-center">
				<button className={`btn btn-${props.color}`}
				onClick={() => history.push(`/org/${props.need.organization_id}/needs/${props.need.id}`)}> View need </button>
				{ props.userId == props.need.organization_id && !props.need.fulfilled &&
					<button className="btn btn-orange"
					onClick={() => history.push(`/org/${props.need.organization_id}/needs/${props.need.id}/set-fulfilled`)}> Need fulfilled </button>
				}
			</div>
		</div>
	)

}

export default NeedLink