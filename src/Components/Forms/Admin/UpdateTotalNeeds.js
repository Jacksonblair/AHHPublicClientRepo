import react from 'react'
import FormWrapper from '../../Misc/FormWrapper'
import ResourceWrapper from '../../Misc/ResourceWrapper'
import useFormValidation from '../../Validation/useFormValidation'
import useIsMounted from 'ismounted'
import server from '../../../server/functions'
import { useParams, useHistory } from 'react-router-dom'

let UpdateTotalNeeds = props => {

	let history = useHistory()
	const isMounted = useIsMounted()
	let [ currentCount, setCurrentCount ] = react.useState(0)

	let INITIAL_STATE = {
		amount: 0
	}

	let submit = async (callback) => {
		try {
			let result = await server.adjustTotalFulfilledNeeds(values.amount)
			if (!isMounted.current) return
			setCurrentCount(result.data.count)
			callback()
		} catch(err) {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		}
	}

	let getResource = async (callback) => {
		try {
			let result = await server.getTotalFulfilledNeeds()
			if (!isMounted.current)
			setValues({ amount: 0 })
			setCurrentCount(result.data.count)
			callback()
		} catch(err) {
			if (!isMounted.current) return
			setServerError(err.response ? err.response.data.message : err.message)
			callback()
		}
	}

	const [ serverError, setServerError ] = react.useState('')
	const { handleSubmit, 
		handleChange, 
		values, 
		setValues,
		errors, 
		isSubmitting,
		isSubmitted
	} = useFormValidation(INITIAL_STATE, () => true, submit)

	return (
		<>
			<div className="header-3 my3"> Updating total fulfilled needs </div>
			<ResourceWrapper
			condition={true} 
			getResource={getResource} 
			error={serverError}>
				<FormWrapper isSubmitting={isSubmitting}>
					<div className="header-2 blue mx3 mt2"> Current: {currentCount} </div>

					<div className="mx3 my3 text-center italic">
						<strong> Note: </strong> <br/>
						Add the number of needs you wish to adjust the total count by. <br/><br/>
						This is done because if we update the count based on the number we got from the database when this form loaded,
						it wont take into account any changes to the total count that occur in the meantime 
						(ie. if an agency marks a need as fulfilled)<br/><br/>	
						If you want to reduce the count, enter a negative number.
					</div>

		 			<form className="display-flex flex-column mx3" onSubmit={handleSubmit}>
						<label> Adjust count by </label>
						<input 
						name="amount" 
						onChange={handleChange}
						value={values.amount}
						type="text"/>
						<div className="my2">
							<button className="admin-button"> Update </button>
						</div>
					</form>

				</FormWrapper>
			</ResourceWrapper>
		</>
	)

}

export default UpdateTotalNeeds