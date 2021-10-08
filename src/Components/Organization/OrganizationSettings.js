import react from 'react'
import ResourceWrapper from '../Misc/ResourceWrapper'
import server from '../../server/functions'
import { Link, withRouter } from 'react-router-dom'
import useIsMounted from 'ismounted'
import './OrganizationProfile.css'
import FormWrapper from '../Misc/FormWrapper'

const OrganizationSettings = props => {

	const isMounted = useIsMounted()

	return (
		<>
			hello
		</>
	)

}

export default withRouter(OrganizationSettings)