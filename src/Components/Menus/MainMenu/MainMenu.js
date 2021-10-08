import React from 'react'
import './MainMenu.css'
import {
	Link, useHistory
} from "react-router-dom";
import ahhlogo from '../../../Assets/Images/ahhlogo.png'
import MobileDropdown from './MobileDropdown'
import DesktopDropdown from './DesktopDropdown'
import server from '../../../server/functions'
import useWindowDimensions from '../../Misc/useWindowDimensions'
import ahhLogo from '../../../Assets/Images/ahhlogo.png'

const MainMenu = props => {

	let { width, height } = useWindowDimensions()
	let history = useHistory()

	let [ optionVisiblity, setOptionVisibility ] = React.useState([0, 0, 0, 0])
	let [ impacts, setImpacts ] = React.useState([])

	let getImpacts = async () => {
		let result = await server.getImpacts()
		setImpacts(result.data.impacts.splice(0, 3))
	}

	React.useEffect(() => {
		getImpacts()
	}, [])

	let blurredMenuOption = (event, index) => {
		if (wasClickOutsideElement(event)) {
			setOptionVisibility([0, 0, 0, 0])
		}
	}

	let clickedMenuOption = (event, index) => {
		event.stopPropagation()

		/* 
			If menu option is 0 (the containing option)
			- We hide or show the lot

			If its any other option
			- We toggle that specific index
			- And hide all other indexes that arent 0
		*/

		console.log(index)
		let arr = [0, 0, 0, 0]

		if (index == 0) {
			arr[0] = !optionVisiblity[0]
			setOptionVisibility(arr)
		} else {
			arr[0] = 1
			arr[index] = !optionVisiblity[index]
			setOptionVisibility(arr)
		}
	}

	let wasClickOutsideElement = (event) => {
	    if (!event.currentTarget.contains(event.relatedTarget)) {
	    	return true
	    }
	}

	let pressedEnter = (event, index) => {
		console.log(index)
		event.stopPropagation()
		if (event.charCode == 13) {
			let arr = [...optionVisiblity]
			arr[index] = !arr[index]
			setOptionVisibility(arr)	
		}
	}

	let onButtonClick = (event) => {
		event.stopPropagation()
		setOptionVisibility([0, 0, 0, 0])
		console.log("click button")
	}

	let onButtonPress = (event) => {
		event.stopPropagation()
		if (event.charCode = 13) {
			setOptionVisibility([0, 0, 0, 0])
			console.log("press button")
		}
	}

	let mobileMenu2 
	if (props.session) {
		if (props.jwt && props.jwt.role == "admin") {
			mobileMenu2 = [
				{ name: "Admin CP", target: "/admin/cp" },
				{ name: "Log Out", event: props.logout },
			]
		} else if (props.jwt && props.jwt.role == "org") {
			mobileMenu2 = [
				{ name: "Profile", target: `/org/${props.id}/profile` },
				{ name: "Log Out", event: props.logout },
			]
		}
	} else {
		mobileMenu2 = [
			{ name: "Register", target: "/register" },
			{ name: "Log In", target: "/login" }
		]
	}

	let mobileMenu1 = [
		{
			name: "About Us",
			options: [
				{ name: "Who Is A Helping Hand", target: "/About" },
				{ name: "Protecting Vulnerable People", target: "/About#protect" },
				{ name: "How AHH Began", target: "/About#began" },
				{ name: "How The Website Works", target: "/About#works" },
			]
		},
		{
			name: "Our Impacts",
			options: [ 
				{ name: "All Impacts", target: "/our-impacts" },
				...impacts.map((impact) => { return { name: impact.title, target: `/our-impacts/${impact.id}` } })
			]
		},
		{ name: "Contact Us", target: "/contact" },
		{ name: "Our Partners",
			options: [
				{ name: "Our Supporters", target: "/supporters" },
				{ name: "Testimonials", target: "/testimonials" },
			]
		}
	]

	let desktopMenu1 =  { 
		name: "About Us",
		options: [
			{ name: "Who Is A Helping Hand", target: "/About" },
			{ name: "Protecting Vulnerable People", target: "/About#protect" },
			{ name: "How AHH Began", target: "/About#began" },
			{ name: "How The Website Works", target: "/About#works" },
		] 
	}

	let desktopMenu2 =  { 
		name: "Our Impacts",
		options: [ 
			{ name: "All Impacts", target: "/our-impacts" },
			...impacts.map((impact) => { return { name: impact.title, target: `/our-impacts/${impact.id}` } })
		]
	}

	let desktopMenu3 =  { 
		name: "Contact Us",
		target: "/contact"
	}

	let desktopMenu4 =  { 
		name: "Our Partners",
		options: [
			{ name: "Our Supporters", target: "/supporters" },
			{ name: "Testimonials", target: "/testimonials" },
		]
	}

	return (
		<div className="main-column"> 
			<div className="component-main-menu display-flex justify-space-between align-items-center">
				{/* Mobile menu */}
				{ width < 500 && <>
					<MobileDropdown menu={mobileMenu1} icon={<i className="fas fa-bars"></i>}/>
					<Link className="mobile-ahhlogo display-flex align-items-center" to="/landing" style={{"backgroundImage":`url(${ahhlogo})`}}/>
					<MobileDropdown menu={mobileMenu2} icon={ props.session ? <i className="fas fa-user-circle"></i> : <i className="fas fa-sign-in-alt"></i>}/>
					</>
				}

				{/* Desktop menu*/}
				{
					width >= 500 && <>
						<Link className="mobile-ahhlogo display-flex align-items-center" 
						to="/landing" 
						style={{"backgroundImage":`url(${ahhlogo})`}}/>
						<DesktopDropdown menu={desktopMenu1}/>
						<DesktopDropdown menu={desktopMenu2}/>
						<DesktopDropdown menu={desktopMenu3}/>
						<DesktopDropdown menu={desktopMenu4}/>

						{ props.session && props.jwt && props.jwt.role != "admin" && <> 
							&nbsp;
							&nbsp;
							<Link className="menu-profile-icon" to={`/org/${props.id}/profile`}>
								<i className="fas fa-user-circle"></i> 
							</Link>
							<div> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; </div>
							<button onClick={props.logout} className="menu-logout-button"> Log Out </button>
							</>
						}
						{ props.session && props.jwt && props.jwt.role == "admin" && <>
							<Link className="btn btn-orange" to="/admin"> Admin CP </Link>
							<div> &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp; </div>
							<button onClick={props.logout} className="menu-logout-button"> Log Out </button>
						</>
						}
						{!props.session && <>
							<Link to="/register" className="btn btn-register"> Agency Register </Link>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
							<Link className="menu-logout-button" to="/login"> Log In </Link>
							</>
						}
					</>
				}

			</div>
		</div>	
	)
}

export default MainMenu