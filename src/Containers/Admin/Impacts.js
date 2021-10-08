import react from 'react'
import { Switch, Route, useParams, useHistory } from 'react-router-dom'
import UpdateImpacts from '../../Components/Forms/Admin/UpdateImpacts'
import UpdateImpact from '../../Components/Forms/Admin/UpdateImpact'
import server from '../../server/functions'
import useIsMounted from 'ismounted'


let Wot = () => {
	return ( <div> Hello </div> )
}

let Impacts = props => {

	let isMounted = useIsMounted()
	let history = useHistory()

	let [ impacts, setImpacts ] = react.useState([])
	let [ serverError, setServerError ] = react.useState('')
	let [ loaded, setLoaded ] = react.useState(false)


	let getResource = () => {
		setServerError("")
		setLoaded(false)
		server.adminGetImpacts()
		.then(res => {
			if (!isMounted.current) return
			setImpacts(res.data.impacts)
			setLoaded(true)
		})
		.catch(err => {
			if (!isMounted.current) return
			console.log(err)
			setServerError(err.response ? err.response.data.message : err.message)
		})
	}

	let refresh = () => {
		getResource()
	}

	react.useEffect(() => {
		getResource()
	}, [])

	return (
		<>	
			<Wot/>

			
			{ !loaded && <div> Loading... </div> }
			{ !!serverError && <>
				<div> {serverError} </div>
				<button onClick={refresh}> Try again </button>
				</> 
			}
			
			{ loaded && !serverError &&  
				<Switch>
					<Route path="/admin/cp/impacts/:impactid/update">
						<UpdateImpact refresh={refresh} impacts={impacts}/>
					</Route>

					<Route path="/admin/cp/impacts/">
						<UpdateImpacts refresh={refresh} impacts={impacts}/>
					</Route>
				</Switch>		
			}

		</>
	)
}

export default Impacts;