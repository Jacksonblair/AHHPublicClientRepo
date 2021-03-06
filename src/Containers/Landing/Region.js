import react from 'react'
import { Link } from 'react-router-dom'
import './Region.css'

import ResourceWrapper from '../../Components/Misc/ResourceWrapper'
import server from '../../server/functions'
import useIsMounted from 'ismounted'
import useWindowDimensions from '../../Components/Misc/useWindowDimensions'

import logoWithValues from '../../Assets/Images/logoWithValue.png';
import landingImage1 from '../../Assets/Images/landing1.jpg'
import landingImage2 from '../../Assets/Images/landing2.jpg'
import landingImage3 from '../../Assets/Images/landing3.jpg'
import corangamiteIcon from '../../Assets/Images/corangamite.jpg'
import colacIcon from '../../Assets/Images/colac.jpg'
import warrnamboolIcon from '../../Assets/Images/warrnambool.jpg'

let Region = props => {

	let { width, height } = useWindowDimensions()
	let [ totalNeeds, setTotalNeeds ] = react.useState(null)
	let [ serverError, setServerError ] = react.useState(null)
	const isMounted = useIsMounted()

	let getResource = async (callback) => {
		try {
			let result = await server.getTotalFulfilledNeeds()
			if (!isMounted.current) return
			setTotalNeeds(result.data.count)		
			callback()
		} catch(err) {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		}
	}

	let reminder = {
		contact_name: "CTNAME",
		name: "Need NAME",
	}

	return (
		<>
			<div className="display-flex flex-column align-items-center">

				<div className="display-flex desktop-only">
					<h1 className="header-2 blue inline"> Can you help a local person in need? </h1>
				</div>				

				<div className="display-flex mobile-only">
					<div className="header-2 blue">Can you help a local person in need?</div>  
				</div>

				<br/>

{/*				<div className="header-3 call-to-action">
					<i className="fas fa-exclamation-triangle"></i>&nbsp;
					A Helping Hand is needed for our locals during Covid crisis
				</div>

				<br/>*/}

				<div className="region-buttons-container">
			
					<div className="display-flex align-items-center flex-column">
						<Link 
						to="/landing/warrnambool" 
						style={{"backgroundImage":`url(${warrnamboolIcon})`}} 
						className="region-button"/>
						<h2 className="header-3"> Warrnambool </h2>
					</div>
			
					<div className="display-flex align-items-center flex-column">
						<Link 
						to="/landing/corangamite" 
						style={{"backgroundImage":`url(${corangamiteIcon})`}} 
						className="region-button"/>
						<h2 className="header-3"> Corangamite Shire </h2>
					</div>

					<div className="display-flex align-items-center flex-column">
						<Link 
						to="/landing/colac" 
						style={{"backgroundImage":`url(${colacIcon})`}} 
						className="region-button"/>
						<h2 className="header-3"> Colac </h2>
					</div>

				</div>
			</div>
			<br/>
			<article>

				<section className="ctr-5 display-flex align-items-center justify-center">
					{ width >= 500 && 
						<img className="region-circle-image" style={{"borderRadius":"0px"}}src={logoWithValues}/>
					}
					<div>
						<div className="header-4"> 
							Total needs fulfilled since November 2020:
						</div>
						<ResourceWrapper
						error={serverError ? "Error" : ''}
						getResource={getResource}
						condition={true}>
							<div className="header-1 orange"> 
								{ totalNeeds }
							</div>
						</ResourceWrapper>
					</div>
				</section> 

				<br className="desktop-only"/>

				{ width >= 500 && 
					<section className="ctr-5 display-flex align-items-center justify-center">
						<img className="region-circle-image" src={landingImage1}/>
						<div style={{"width":"400px"}} className="header-4">
							<div> Connecting 
								<div className="orange inline"> locals </div> 
								in need with
								<div className="orange inline"> locals </div>
								who are able to lend a helping hand.
							</div>
						</div>
						<img className="region-circle-image" src={landingImage3}/>
					</section> 
				}

				<br className="desktop-only"/>

				<div className="ctr-5 display-flex align-items-center justify-center">
					{ width < 500 && 
						<section className="italic bold black">
							<div> "All the money in the world does not change lives. <div className="orange inline">People</div> change lives." <br/> </div>
							<div>- Elise Mckinnon</div>
						</section>
					}
					{ width >= 500 && <>
						<section className="header-4">
							<div> "All the money in the world does not change lives. <br/><div className="orange inline">People</div> change lives." <br/> </div>
						</section>
						<img className="region-circle-image" src={landingImage2}/>
						</>
					}
				</div>

				<br className="desktop-only"/>
			</article>
		</>
	)			

}

export default Region