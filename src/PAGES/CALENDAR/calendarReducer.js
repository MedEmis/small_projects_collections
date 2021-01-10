


export const CALENDAR_ACTIONS = {
	ADD_TODO_ITEM: "ADD_TODO_ITEM",
	SET_TIME: "SET_TIME",
	SET_DATE: "SET_DATE",

}

const calendarInitialState = {
	monthArray: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	toDoItem: [],
	currentTime: null,
	currentDate: null,
}

export const calendarReducer = (state = calendarInitialState, action) => {
	switch (action.type) {

		case CALENDAR_ACTIONS.ADD_TODO_ITEM:
			return {
				...state,
				toDoItem: [...state.toDoItem, action.payload]
			}
		case CALENDAR_ACTIONS.SET_TIME:
			return {
				...state,
				currentTime: new Date().toLocaleTimeString()
			}
		case CALENDAR_ACTIONS.SET_DATE:
			return {
				...state,
				currentDate: new Date().toLocaleDateString()
			}
		default:
			return state
	}
}