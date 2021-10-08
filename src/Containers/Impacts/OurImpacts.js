import react from 'react'
import { useHistory, Switch, Route } from 'react-router-dom'
import ResourceWrapper from '../../Components/Misc/ResourceWrapper'
import server from '../../server/functions'
import useIsMounted from 'ismounted'
import Impact from '../../Components/Static/Impact'
import Impacts from '../../Components/Static/Impacts'
import ImpactsSidebar from '../../Components/Static/ImpactsSidebar'
import useWindowDimensions from '../../Components/Misc/useWindowDimensions'

function OurImpacts(props) {

	let [ impacts, setImpacts ] = react.useState([])
	let [ serverError, setServerError ] = react.useState('')
	let isMounted = useIsMounted()
	let history = useHistory()
	let { width, height } = useWindowDimensions()

	let getResource = (callback) => {
		server.getImpacts()
		.then(res => {
			if (!isMounted.current) return 
			setImpacts(res.data.impacts)
			callback()
		})
		.catch(err => {
			if (!isMounted.current) return
			callback()
			setServerError(err.response ? err.response.data.message : err.message)
		})
	}

	return (
		<ResourceWrapper
		condition={true} 
		getResource={getResource} 
		error={serverError}>
			<Switch>
				<Route path="/our-impacts/:impactid">
					<div className="display-flex">
						{ width >= 500 && <ImpactsSidebar impacts={impacts}/> }
						<div className="display-flex flex flex-column">
						<Impact impacts={impacts}/>
						</div>
					</div>
				</Route>
				<Route path="/our-impacts/">
					<Impacts impacts={impacts}/>
				</Route>
			</Switch>
		</ResourceWrapper>
	)

}

export default OurImpacts