import react from 'react'
import './ContactUs.css'

let ContactUs = props => {

	let [ copied, setCopied ] = react.useState([false, false])
	let addresses = [ "elise@ahelpinghand.com.au", "janneke@ahelpinghand.com.au"]

	let clickedCopy = (i) => {
		if (!copied[i]) {
			let _copied = [...copied]
			_copied[i] = !_copied[i]
			setCopied(_copied)	
		}
		copyToClipboard(addresses[i])
	}

	// https://stackoverflow.com/questions/33855641/copy-output-of-a-javascript-variable-to-the-clipboard
	function copyToClipboard(text) {
	    var dummy = document.createElement("textarea");
	    // to avoid breaking orgain page when copying more words
	    // cant copy when adding below this code
	    // dummy.style.display = 'none'
	    document.body.appendChild(dummy);
	    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
	    dummy.value = text;
	    dummy.select();
	    document.execCommand("copy");
	    document.body.removeChild(dummy);
	}

	return (
		<div className='display-flex justify-center'>
		<div className="ctr-color ctr-blue">
			<h1 className="header-2 blue"> Contact Us </h1> 
			<br className="desktop-only"/>
			<div className="ctr-2 text-center bold">
				You can like us on Facebook and follow us on 
				Instagram to send us a message, receive updates on our compaign and support us.
				<br/>
				<br/>
				<div className="display-flex justify-center"> 
					<a href="https://www.facebook.com/ahelpinghandcorangamite" target="_none">
						<i className="black social-icon fab fa-facebook"></i> 
					</a>
					&nbsp;&nbsp;&nbsp;
					<a href="https://www.instagram.com/ahelpinghandcommunity/" target="_none"> 
						<i className="black social-icon fab fa-instagram"></i>
					</a>
				</div>
				<br/>
				If you have a problem or would like to get any further information, please feel free to contact us via email:
				<br/>
				<button 
				onClick={() => clickedCopy(0)} 
				className="btn-skinny btn-contact"> 
					{ copied[0] 
						? <> Copied to clipboard <i className="fas fa-check"/> </>
						: <> {addresses[0]} <i className="fas fa-copy"/></> } 
				</button>
				<br/>or<br/>
				<button 
				onClick={() => clickedCopy(1)} 
				className="btn-skinny btn-contact"> 
					{ copied[1] 
						? <> Copied to clipboard <i className="fas fa-check"/> </>
						: <> {addresses[1]} <i className="fas fa-copy"/></> } 
				</button>
			</div>
		</div>
		</div>
	)

}

export default ContactUs