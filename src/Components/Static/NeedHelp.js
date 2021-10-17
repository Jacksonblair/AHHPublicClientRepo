import react from 'react'

let NeedHelp = props => {

	let [ copied, setCopied ] = react.useState([false])
	let addresses = [ "info@ahelpinghand.com.au"]

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
		<div className="display-flex justify-center">
			<div className="ctr-color ctr-yellow">
				<h1 className="header-2 yellow"> Do You Need Help? </h1> 
				<br className="desktop-only"/>
				<div className="ctr-2 bold">
					If you or your family need an extra helping hand, please reach out and ask for help.
					<br/><br/>
					All schools, healthcare or community organisations in the Corangamite Shire, Colac, and Warrnambool can register your needs.
					<br/><br/>
					Please be assured that maintaining the privacy of people is of paramount importance, and A Helping Hand will not receive names or identifying details of any person they hope to help through our local agencies.
					<br/><br/>
					We hope to reach many more communities soon. If you have any questions at all, please contact us at: <br/>
						<button 
						onClick={() => clickedCopy(0)} 
						className="btn-skinny btn-contact"> 
							{ copied[0] 
								? <> Copied to clipboard <i className="fas fa-check"/> </>
								: <> {addresses[0]} <i className="fas fa-copy"/></> } 
						</button>
				</div>
			</div>
		</div>
	)

}

export default NeedHelp