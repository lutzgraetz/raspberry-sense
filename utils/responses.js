const generic = (status = null, message = '') => {
	return { error: true, message: message || 's', status }
}

module.exports = {
	generic: generic(500, ''),
	notFound: generic(404, ''),
	notAllowed: generic(401, ''),
	missingData: generic(405, ''),
	error: (status = 500, message = null) => {
		return generic(status, message)
	},
	success: (data = null) => {
		return { success: true, data }
	},
}
