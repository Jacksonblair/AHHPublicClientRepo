import { axios } from '../App.js'
import react from 'react'

let Server = {
	/* Static pages */
	getImpacts: async () => {
		return axios.get('misc/impacts')
	},
	getSupporters: async () => {
		return axios.get('misc/supporters')
	},

	/* Organization */
	addOrganization: async (details) => {
		return axios.post('/auth/org/add', details)
	},
	updateOrganizationProfile: (orgId, details) => {
		return axios.put(`/org/${orgId}/profile`, details)
	},
	getOrganizationProfile: (orgId) => {
		return axios.get(`/org/${orgId}/profile`)
	},
	getOrganizationAbout: (orgId) => {
		return axios.get(`/org/${orgId}/about`)
	},
	updateOrganizationAbout: (orgId, about) => {
		return axios.put(`/org/${orgId}/about`, { about })
	},
	updateOrganizationImage: async (orgId, uuid) => {
		return axios.put(`/org/${orgId}/image`, { uuid })
	},
	deleteOrganization: (orgId) => {
		return axios.delete(`/org/${orgId}/`)
	},


	/* Needs */
	addNeed: async (orgId, details) => {
		return axios.post(`org/${orgId}/needs/add`, details)
	},
	updateNeed: async (orgId, needId, updatedNeed) => {
		return axios.put(`org/${orgId}/needs/${needId}/`, updatedNeed)
	},
	getNeeds: async (orgId) => {
		return axios.get(`org/${orgId}/needs/`)
	},
	getCurrentNeeds: async (region) => {
		return axios.get(`/current-needs/${region}`)
	},
	getMajorNeeds: async (region) => {
		return axios.get(`misc/major-needs/${region}`)
	},
	getNeed: async (orgId, needId) => {
		return axios.get(`org/${orgId}/needs/${needId}`)
	},
	deleteNeed: async (orgId, needId) => {
		return axios.delete(`org/${orgId}/needs/${needId}`)
	},
	setNeedFulfilled: async (orgId, needId) => {
		return axios.get(`org/${orgId}/needs/${needId}/set-fulfilled`)
	},
	fulfilNeed: async (orgId, needId, details) => {
		return axios.post(`org/${orgId}/needs/${needId}/fulfil`, details)
	},
	extendNeed: async (orgId, needId) => {
		return axios.get(`org/${orgId}/needs/${needId}/extend`)
	},	


	/* User auth */
	login: async(email, password) => {
		return axios.post('/auth/org/login', { email, password })
	},
	logout: () => {
		return axios.post('/auth/org/logout')
	},
	updatePassword: (orgId, currentPassword, newPassword) => {
		return axios.post(`/auth/org/${orgId}/update-password`, { currentPassword, newPassword })
	},
	changeEmail: (orgId, email) => {
		return axios.post(`/auth/org/${orgId}/change-email`, { email })
	},
	confirmUpdateEmail: (uuid) => {
		return axios.get(`/auth/confirm-update-email/${uuid}`)
	},

	/* For users who forgot password */
	resetPassword: (email) => {
		return axios.post(`/auth/reset-password`, { email })
	},
	completeResetPassword: (uuid, newPassword) => {
		return axios.post(`/auth/complete-reset-password/${uuid}`, { newPassword })
	},

	/* Get Total needs fulfilled count */
	getTotalFulfilledNeeds: () => {
		return axios.get('/misc/total-fulfilled-needs')
	},

	/* Adjust total needs fulfilled count */
	adjustTotalFulfilledNeeds: (amount) => {
		return axios.put('/misc/total-fulfilled-needs', { amount })
	},

	/* Facebook feed */
	getFacebookFeed: (region) => {
		return axios.get(`/facebook-feed/${region}`)
	},

	/*
		uploadImage sends a signed policy from the server,
		which the client can use to authenticate an upload
		directly to AWS S3.

		Uploading profile image flow:
		- Upload into browser
		- Get signed policy from server
		- Send request to s3

		What happens if image post fails?
		- I need to tell the server that it failed, so it doesnt add it to the database. 

		TODO: On server, add uuid for image to database as profile image url
		TODO: On server, add route to remove stored image if submission to s3 fails (pass in orgId and uuid)
	*/

	getSignedPolicy: async (orgId) => {
		// res.data.signed.fields in response
		return axios.get(`/aws/signed-policy/${orgId}`)
	},

	getSignedPolicies: async (number) => {
		return axios.get(`/aws/signed-policies/${number}`)
	},

	uploadImageToS3: async (policy, file) => {

		// console.log(policy)

		// res.data.signed.fields
		const data = {
			bucket: "ahelpinghandbucket",
			...policy.fields,
			'Content-type': file.type, 
			file: file 
		}

		let formData = new FormData()
		for (let field in data) {
			formData.append(field, data[field])
		}

		return axios({
			method: "post",
			url: `https://s3.ap-southeast-2.amazonaws.com/ahelpinghandbucket/`,
			data: formData,
			headers: { "Content-Type": "multipart/form-data" },
		})
	},

	uploadImagesToS3: async (policies, images) => {
		console.log(policies)
		console.log(images)

		for (let i = 0; i < policies.length; i++) {
			await Server.uploadImageToS3(policies[i], images[i].file )
		}
	},

	/* Admin functions */
	adminLogin: async (email, password) => {
		return axios.post('/admin/login', { email, password })
	},

	adminGetOrganizations: async () => {
		return axios.get('/admin/org')
	},

	adminGetNeeds: async () => {
		return axios.get('/admin/needs')
	},

	adminDeleteNeed: async (needId) => {
		return axios.delete(`/admin/needs/${needId}`)
	},

	adminToggleNeedMajor: async (needId) => {
		return axios.put(`/admin/needs/${needId}/toggle-major`)
	},

	adminToggleNeedApproved: async (needId) => {
		return axios.put(`/admin/needs/${needId}/toggle-approved`)
	},

	toggleOrgApproved: async (orgId) => {
		return axios.put(`/admin/org/${orgId}/toggle-approved`)
	},

	adminGetImpacts: async () => {
		return axios.get('/admin/impacts')
	},

	adminDeleteImpact: async (impactId) => {
		return axios.delete(`/admin/impacts/${impactId}`)
	},

	adminAddImpact: async (details) => {
		return axios.post('/admin/impacts/add', details)
	},

	adminUpdateImpact: async (impactId, details) => {
		return axios.put(`/admin/impacts/${impactId}`, details)
	},

	adminAddSupporter: async (supporter) => {
		return axios.post('/admin/supporters/add', { supporter })
	},
	adminDeleteSupporter: async (supporter) => {
		return axios.post('/admin/supporters/delete', { supporter })
	},


}


export default Server;