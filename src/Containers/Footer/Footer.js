import React, { Component } from 'react'
import { useHistory, Link } from 'react-router-dom' 

import './Footer.css'

let Footer = props => {

	let history = useHistory()

	return(
		<footer className="container-footer">  

			<div className="footer-cta main-column italic">
				We respectfully acknowledge the Traditional Custodians of the land where we live, work and learn. We pay our respects to all Aboriginal Community Elders and people past and present. We thank them for taking care of our country over countless generations.
			</div>

			<div className="divider divider-grey"/>

			<div className="footer-cta main-column">
				<div className="bold italic inline blue"> 
					Please spread the word by sharing with friends, family and business associates.
					We can do so much more together.&nbsp;&nbsp;
				</div>
				<div className="footer-social-icons inline">
					<a href="https://www.facebook.com/ahelpinghandcorangamite" target="_none"><i className="blue fab fa-facebook font-40 mx1"></i></a>
					<a href="https://www.instagram.com/ahelpinghandcommunity/" target="_none"><i className="blue fab fa-instagram font-40 mx1"></i></a>
				</div>
			</div>

			<div className="divider divider-grey"/>

			<div className="footer-legals main-column">
				<div>
					<Link to="/terms-of-use">Terms Of Use</Link> | <Link to="/privacy-policy">Privacy Policy </Link> 
				</div>
				<div>
					© 2021 A Helping Hand
				</div>
			</div>

		</footer>
	)

}

export default Footer