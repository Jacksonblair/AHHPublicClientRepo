import react from 'react'
import ResourceWrapper from '../../Misc/ResourceWrapper.js'
import FormWrapper from '../../Misc/FormWrapper.js'
import useFormValidation from '../../Validation/useFormValidation'
import useIsMounted from 'ismounted'
import server from '../../../server/functions'

let UpdateSupporters = props => {

	let INITIAL_STATE = {
		supporters: []
	}

	const isMounted = useIsMounted()
	let [ supporters, setSupporters ] = react.useState([])
	let [ newSupporter, setNewSupporter ] = react.useState('')
	let [ serverError, setServerError ] = react.useState('')

	let getResource = async (callback) => {
		try {
			let result = await server.getSupporters()
			if (!isMounted.current) return
			setSupporters(result.data.supporters[0].list.split(','))
			callback()
		} catch(err) {
			if (!isMounted.current) return 
			callback()
			setServerError(err.response ? err.response.data.message : err.message)
		}
	}

	let submit = async (callback) => {
		try {
			await server.adminUpdateSupporters(supporters)
			if (!isMounted.current) return
		} catch(err) {
			if (!isMounted.current) return
			console.log(err)
			setServerError(err.response ? err.response.data.message : err.message)
		}
	}

	let removeSupporter = async (i) => {
		try {
			setNewSupporter('')
			if (!isMounted.current) return
			await server.adminDeleteSupporter(supporters[i])
			let _supporters = [...supporters]
			_supporters.splice(i, 1)
			setSupporters(_supporters)
		} catch(err) {
			if (!isMounted.current) return
			console.log(err)
			setServerError(err.response ? err.response.data.message : err.message)
		}	
	}

	let addSupporter = async () => {
		try {
			let _supporter = newSupporter
			setNewSupporter('')
			await server.adminAddSupporter(_supporter)
			if (!isMounted.current) return
			let _supporters = [...supporters]
			_supporters.push(_supporter)
			setSupporters(_supporters)
		} catch(err) {
			if (!isMounted.current) return
			console.log(err)
			setServerError(err.response ? err.response.data.message : err.message)
		}	
	}

	return (
		<>
			<div className="header-3 mb3"> Updating supporters </div>
			<ResourceWrapper
			condition={true} 
			getResource={getResource}>
				<FormWrapper error={serverError}>
					<div className="display-flex text-left flex-column mx3">

						{ 
							supporters.map((supporter, i) => {
								return (
									<div key={supporter + i} className="capitalize my1">
										<button className="admin-button" onClick={() => removeSupporter(i)}> Remove </button>&nbsp;&nbsp;
										{supporter}
									</div>
								) 
							})	
						}

						<label className="mt3"> Add new </label>
						<input value={newSupporter} onChange={(e) => setNewSupporter(e.target.value)} placeholder="New supporter"/> 
						<button className="admin-button mb2" onClick={(e) => { addSupporter() } }> Add </button>
					</div>
				</FormWrapper>
			</ResourceWrapper>
		</>
	)

}

export default UpdateSupporters