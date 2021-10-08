import react from 'react'
import './Dropdown.css'
import { HashLink as Link } from 'react-router-hash-link';

let Dropdown = props => {

	let [ visibility, setVisibility ] = react.useState([0, 0, 0, 0]) 

	let pressedKey = (event, index) => {
		/* Charcode 13 is 'enter'*/
		event.stopPropagation()
		if (event.charCode == 13) {
			let arr = [...visibility]
			arr[index] = !arr[index]
			setVisibility(arr)	
		}
	}

	let clickedMenu = (event, index) => {
		event.stopPropagation()
		let arr = [0, 0, 0, 0]
		/* 
			If menu option is 0 (the containing option)
			- We hide or show the lot

			If its any other option
			- We toggle that specific index
			- And hide all other indexes that arent 0
		*/
		if (index == 0) {
			arr[0] = !visibility[0]
			setVisibility(arr)
		} else {
			arr[0] = 1
			arr[index] = !visibility[index]
			setVisibility(arr)
		}
	}

	let blurredMenu = (event, index) => {
		if (wasClickOutsideElement(event)) {
			setVisibility([0, 0, 0, 0])
		}	
	}

	let wasClickOutsideElement = (event) => {
	    if (!event.currentTarget.contains(event.relatedTarget)) {
	    	return true
	    }
	}

	return (

		<div className="mobile-dropdown-menu" 
		onKeyPress={(event) => pressedKey(event, 0)} 
		onClick={(event) => clickedMenu(event, 0)} 
		onBlur={(event) => blurredMenu(event, 0)} tabIndex={0}>
			<div className={`mobile-dropdown-menu-icon ${!!visibility[0] ? 'blue' : 'black'}`}> { props.icon } </div>
			{ !!visibility[0] && 
			<div className="sub-menus">
				{ props.menu.map((menu, i) => {
					if (menu.options && menu.options.length) {
						return (
							<div key={i + "menuop"}>
								<div 
								className="sub-menu display-flex align-items-center justify-space-between"
								tabIndex={0} 
								onKeyPress={(event) => pressedKey(event, i + 1)}
								onClick={(event) => clickedMenu(event, i + 1)}> 
									<div>{menu.name}</div>
									{ !!visibility[i + 1] 
										? <i className="fas fa-sort-up"></i>
										: <i className="fas fa-sort-down"></i>
									}
								</div>
								{ 
									!!visibility[i + 1] && menu.options.map((option, i) => {
										if (option.event) {
											return (
												<div className="option display-flex align-items-center"
												key={option.name}
												tabIndex={1}>
													{option.name.length > 30 ? option.name.substr(0, 35) + "..." : option.name}
												</div>
											)	
										} else {
											return (
												<Link className="option display-flex align-items-center" 
												key={option.name}
												to={option.target} 
												tabIndex={0}>
													{option.name.length > 30 ? option.name.substr(0, 35) + "..." : option.name}
												</Link>
											)			
										}
									})
								}
							</div>
						)
					} else {
						if (menu.event) {
							return (
								<div
								key={menu.name}
								className="sub-menu display-flex align-items-center justify-space-between"
								onClick={menu.event}> {menu.name} </div>
							)
						} else {
							return (
								<Link
								key={menu.name}
								className="sub-menu display-flex align-items-center justify-space-between"
								to={menu.target}> {menu.name} </Link>
							)					
						}
					}
				}) }
			</div>
			}
		</div>

	)

}

export default Dropdown