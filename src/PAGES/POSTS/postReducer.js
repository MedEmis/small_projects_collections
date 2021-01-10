
export const ACTIONS = {
	MORE_USER: "MORE_USER",
	LESS_USER: "LESS_USER",
	REMOVE_POST: "REMOVE_POST",
	GET_DATA: "GET_DATA",
	LOADING_ON: "LOADING_ON",
	LOADING_OFF: "LOADING_OFF",
}

const initialState = {
	usersData: [],
	numberOfUsers: 1,
	isLoading: false
}

export const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACTIONS.LOADING_ON:
			return {
				...state,
				isLoading: true
			}
		case ACTIONS.LOADING_OFF:
			return {
				...state,
				isLoading: false
			}
		case ACTIONS.MORE_USER:
			return {
				...state,
				numberOfUsers: ++state.numberOfUsers
			}
		case ACTIONS.LESS_USER:
			if (state.numberOfUsers > 0) {
				return {
					...state,
					numberOfUsers: --state.numberOfUsers
				}
			}
			break
		case ACTIONS.REMOVE_POST:
			return {
				...state,
				numberOfUsers: --state.numberOfUsers,
				usersData: [
					state.usersData[0] = state.usersData[0].filter(item => item.id !== action.payload),
					state.usersData[1]
				]
			}
		case ACTIONS.GET_DATA:
			return {
				...state,
				usersData: action.payload
			}
		default:
			return state
	}


}
