import react from 'react'
import { useParams, useHistory } from 'react-router-dom'
import NeedLink from './NeedLink'
import usePagination from '../Misc/usePagination'
import useWindowDimensions from '../Misc/useWindowDimensions'

const CurrentNeedsRegionCategory = props => {

	let history = useHistory()
	let { region, category } = useParams()
	let [ needs, setNeeds ] = react.useState(props.needs.filter((need) => { return need.category == category }))
	// let { page, setPage, pages } = usePagination(5, needs)
	let { width, height } = useWindowDimensions()
	let [ textContent, setTextContent ] = react.useState("")

	let categories = {
		"educational": { name: "Educational", icon: "fas fa-graduation-cap", color: "green"},
		"living": { name: "Living", icon: "fas fa-home", color: "blue"},
		"sports-and-social": { name:"Sports and Social", icon: "fas fa-volleyball-ball", color: "orange"},
		"parenting-and-baby": { name: "Parenting/Baby", icon: "fas fa-baby-carriage", color: "yellow"},
		"job-help-or-mentoring": { name: "Job Help or Mentoring", icon: "fas fa-briefcase", color: "pink"}
	}

	let facebookPage = {
		corangamite: "https://www.facebook.com/ahelpinghandcorangamite/",
		geelong: "https://www.facebook.com/ahelpinghandgeelong/",
		warrnambool: "https://www.facebook.com/ahelpinghandwarrnambool/"
	}

	react.useEffect(() => {
		/* Filter needs based on category */
		setNeeds(props.needs.filter((need) => { return need.category == category }))

		/* Swap text content based on category */
		switch (category) {
			case "educational":
			case "living":
			case "parenting-and-baby":
				setTextContent(
					<>
						Thank you for considering to help a person or family in your community who is experiencing a tough time. 
						Even the smallest act of kindness can have a positive impact on someone’s day, week or life. We appreciate your contribution.
						<br/><br/>
						Our local agencies have worked hard to identify needs in your community. Please spread the word by sharing with friends, family and business associates. We can do so much more together.
					</>
				)
			break
			case "sports-and-social":
				setTextContent(
					<>
						Thank you for considering to help a family in your community that is experiencing a tough time. 
						Many families cannot afford for their children to participate in local sports.  
		 				<br/><br/>
						Research has shown that even one positive connection to the community can change a person’s life. This makes a child’s ability to participate in their local sporting clubs and other social activities crucial in building a child’s esteem, sense of belonging and worthiness. 
					</>
				)
			break
			case "job-help-or-mentoring":
				setTextContent(
					<>
						Can you provide a work or life experience? 
						<br/><br/>
						Thank you for seeing how you might be able to provide an opportunity for someone in our local community to realise their potential. 
						It only takes one positive connection, one opportunity to change a life. Many of our local community members haven’t had the opportunities and role models that we can sometimes take for granted. 
						<br/><br/>
						Any opportunity to find another path, a passion, a reason to get up in the morning would be a truly significant contribution to another person’s life. 
					</>
				)
			break
		}


	}, [category])

	return (
		<div className={`display-flex flex-column ctr-color fill ctr-${categories[category].color}`}>
			
			<div className={`region-category-icon ${category} display-flex justify-center align-items-center`}> 
				<i className={`${categories[category].icon}`}></i> 
			</div>
			<h1 className={`region-category-header header-2 capitalize ${categories[category].color}`}> {region} {categories[category].name} Needs</h1>

			<div className="medium needs-blurb">
				{textContent}
			</div>
			<br/>
			<div className={`display-flex justify-space-between flex-wrap`}>
				{ !!needs.length &&
					needs.map((need) => {
						return ( 
							<NeedLink key={need.id} need={need} color={categories[category].color}/>
						)
					})
				}
				{ !needs.length && 
					<div className="text-center flex">
						<div className="header-3 blue"> 
							We have just begun and we will soon begin listing needs of vulnerable locals.  
							Please ‘like’ your local  A Helping Hand <a className="header-3 blue" target="_none" href={facebookPage[region]}> Facebook page</a> or visit us again soon to find out how you can make a real difference to a person’s life who may live around the corner
						</div> 
					</div>
				}
			</div>

{/*			<div> 
				{ !!pages.length && 
					pages.map((_, i) => {
						return <button 
						key={i + "123123asd"}
						onClick={() => setPage(i)}
						disabled={i == page}> 
							{i + 1} 
						</button>
					})
				} 
			</div>

			{ !pages.length && 
				<div className="header-3"> No needs right now </div>
			}*/}

			<br/>
			<div className="text-center">
				<button 
				className="btn btn-black"
				onClick={(e) => { e.preventDefault(); history.goBack() }}> Back </button>
			</div>
		</div>
	)

}

export default CurrentNeedsRegionCategory