import react from 'react'
import { useHistory } from 'react-router-dom'

function Registering(props) {

	let history = useHistory()

	return (
		<div className="display-flex justify-center">
			<div className="ctr-color ctr-blue">
				<h1 className="header-2 blue"> Give someone local <br/> A HELPING HAND </h1>
				<br className="desktop-only"/> 
				<br className="desktop-only"/> 
				<div className="ctr-6">
					<div className="header-3 blue"> Who can be an agency: </div> 
					<br/>
					<div className="medium">
						A Helping Hand is a resource for all registered community organisations who are able to list the needs of the people they are there to assist. These agencies could be welfare agencies, community health organisations, schools, doctor’s and police - anyone who can identify and assist vulnerable and struggling families and individuals in our communities.
					</div>
				</div>
				<br/>
				<div className="ctr-6">
					<div className="header-3 blue"> Agencies can only be within the Corangamite Shire, Geelong and Warrnambool in Victoria: </div> 
					<br/>
					<div className="medium">
						We hope to reach more communities very soon.
						Once you register as an Agency, you will be able to start listing the needs of those in your care.
	 				</div>
					<button className="btn btn-blue" onClick={(e) => { e.preventDefault(); history.push('/register')}}> Register Now </button>
				</div>
				<br/>
				<div className="ctr-6">
					<div className="header-3 blue"> Protecting vulnerable people: </div>
					<br/>
					<div className="medium">
						A Helping Hand is focused on making a positive impact within local communities. We take safety seriously and maintaining the dignity and privacy of all people is of paramount importance.
						A Helping Hand will not require or have any identifying information of any person we seek to help. It is an anonymous service with only the registered agencies having knowledge of the individuals or families they are requesting help for. The Agency will liaise directly with the donor/volunteer/business – whoever has offered to fulfil the need, ensuring the right protocols and legal requirements in child safety and protection are adhered to.
						<br/><br/>To ensure help reaches those who need it most, A Helping Hand will only list the needs of those in the care of registered community organisations and education providers. All community organisations who utilise A Helping Hand have agreed that they will be responsible for protecting those in their care and that any volunteers dealing with children or other vulnerable community members have the relevant qualifications and checks.
						<br/><br/>All registered organisations also agree that they will not take any funds for administration or other costs and commit to ensuring every cent given or other donation goes only to those in need.
					</div>
				</div>
			</div>
		</div>
	)

}

export default Registering