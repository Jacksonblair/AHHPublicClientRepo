import react from 'react'
import server from '../../server/functions'
import useIsMounted from 'ismounted'
import ResourceWrapper from '../Misc/ResourceWrapper'
import deakinLogo from '../../Assets/Images/deakinlogo.jpg'

function Supporters(props) {

	let [serverError, setServerError] = react.useState('')
	let [supporters, setSupporters] = react.useState([])
	let isMounted = useIsMounted()
	let [emailCopied, setEmailCopied] = react.useState([false, false, false])

	let addresses = [ "jackson.blair@live.com", "ymaeda@deakin.edu.au", "jport@live.com.au"]

	let clickedCopy = (i) => {
		console.log(i)
		if (emailCopied[i] == false) {
			let _emailCopied = [...emailCopied]
			_emailCopied[i] = !_emailCopied[i]
			setEmailCopied(_emailCopied)
		}
		copyToClipboard(addresses[i])
	}

	// https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
	function copyToClipboard(text) {
	    var dummy = document.createElement("textarea");
	    document.body.appendChild(dummy);
	    dummy.value = text;
	    dummy.select();
	    document.execCommand("copy");
	    document.body.removeChild(dummy);
	}

	let getResource = async (callback) => {
		try {
			let result = await server.getSupporters()
			if (!isMounted.current) return
			setSupporters(result.data.supporters[0].list.split(','))
			callback()
		} catch(err) {
			if (!isMounted.current) return 
			callback()
			setServerError(err.response ? err.response.data.message : err.message)
		}
	}

	return (
		<div className="display-flex justify-center">
			<div className="ctr-color ctr-blue">

				<h1 className="header-2 blue"> Special Thanks </h1> 
				<br className="desktop-only"/>
				<div className="ctr-2">
					<div>
						<img style={{"width":"260px"}}src={deakinLogo}/>
						<br/>
						<br/>
						To the Deakin University FreelancingHUB who has been an integral part of the development of A Helping Hand. Without their enormous commitment, enthusiasm and incredible talent, this platform would not have been possible.
						<br/>
						<br/>

						<strong>Jackson Blair</strong>, our web developer who coded the website and server. 
						<br/>
						&nbsp;<a target="_blank" className="special-thanks-icon" href="https://www.linkedin.com/in/jackson-blair-ba2542b1/"><i className="fab fa-linkedin"></i></a>
						&nbsp;<button className="special-thanks-icon" onClick={() => clickedCopy(0)}>
						{emailCopied[0] 
							? <div className="black bold" style={{"fontSize":"16px"}}> copied! </div>
							: <i className="fas fa-envelope-square"></i>
						}
						</button>
						&nbsp;<a target="_blank" className="special-thanks-icon" href="https://jacksonblair.dev"><i className="fas fa-link"></i></a>

						<br/>
						<br/>

						<strong>Yuki Maeda</strong>
						, our Marketing Consultant who volunteered to develop our social media strategy and user experience design elements beyond his work with DeakinTALENT FreelancingHUB.
						<br/>
						&nbsp;<a target="_blank" className="special-thanks-icon" href="https://www.linkedin.com/in/maedayuki/"><i className="fab fa-linkedin"></i></a>
						&nbsp;<button className="special-thanks-icon" onClick={() => clickedCopy(1)}>
							{emailCopied[1] 
								? <div className="black bold" style={{"fontSize":"16px"}}> copied! </div>
								: <i className="fas fa-envelope-square"></i>
							}
						</button>

						<br/>
						<br/>

						<strong>Janneke Port</strong>, our wonderful volunteer team leader and manager who has been instrumental in the entire development of A Helping Hand.
						<br/>
						&nbsp;<a target="_blank" className="special-thanks-icon" href="https://www.linkedin.com/in/jannekeport/"><i className="fab fa-linkedin"></i></a>
						&nbsp;<button className="special-thanks-icon" onClick={() => clickedCopy(2)}>
							{emailCopied[2] 
								? <div className="black bold" style={{"fontSize":"16px"}}> copied! </div>
								: <i className="fas fa-envelope-square"></i>
							}
						</button>

						<br/>
						<br/>
						<strong> Thank you! Together we are creating something that has the potential to change many lives. </strong>
					</div>
				</div>

				<br className="desktop-only"/>
				<br/>

				<div className="header-2 blue"> Supporters </div> 
				<br className="desktop-only"/>
				<div className="ctr-2">
					<ResourceWrapper
					condition={true} 
					getResource={getResource} 
					error={serverError}>
						<div className="bold">
						Thank you to the wonderful organisations and businesses who 
						have supported us and given A Helping Hand to those in our local community.
						</div><br/>
						{ supporters.map((supporter) => {
							return (
								<div key={"supporter" + supporter} className="my1 capitalize"> {supporter} </div>
							)
						}) }
					</ResourceWrapper>
				</div>	

			</div>
		</div>
	)

}

export default Supporters