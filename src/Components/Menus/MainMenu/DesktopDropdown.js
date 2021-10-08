import react from 'react'
import './Dropdown.css'
import { HashLink as Link } from 'react-router-hash-link';

let DesktopDropdown = props => {

	let [ visible, setVisible ] = react.useState(false)

	let pressedKey = (event) => {
		/* Charcode 13 is 'enter'*/
		event.stopPropagation()
		if (event.charCode == 13) {
			setVisible(!visible)
		}
	}

	let clickedMenu = (event) => {
		event.stopPropagation()
		setVisible(!visible)
	}

	let blurredMenu = (event) => {
		if (wasClickOutsideElement(event)) {
			setVisible(false)
		}	
	}

	let wasClickOutsideElement = (event) => {
	    if (!event.currentTarget.contains(event.relatedTarget)) {
	    	return true
	    }
	}

	return (

		<div className="desktop-dropdown-menu" 
		onKeyPress={pressedKey} 
		onClick={clickedMenu} 
		onBlur={blurredMenu} tabIndex={0}>
			{ props.menu.options && <div className="bold"> {props.menu.name} &nbsp;<i className="fas fa-chevron-down"/> </div> }
			{ props.menu.target && <Link style={{"textDecoration":"none"}} className="black bold" to={props.menu.target}> {props.menu.name} </Link> }
			{ visible && props.menu.options && 
				<>
		 			<div className="options">
		 				{ props.menu.options.map((option, i) => {
							return (
								<Link key={"desktop-option" + i} className="option black text-left" to={option.target}> {option.name} </Link>
							)
						})
					}
					</div>
				</>
			}
		</div>

	)

}

export default DesktopDropdown