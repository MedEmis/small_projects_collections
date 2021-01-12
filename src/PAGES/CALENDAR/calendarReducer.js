


export const CALENDAR_ACTIONS = {
	SET_TODO_ITEM: "SET_TODO_ITEM",
	GET_TODO_ITEM: "GET_TODO_ITEM",
	DELETE_TODO_ITEM: "DELETE_TODO_ITEM",
	SET_CHOSEN_DATE: "SET_CHOSEN_DATE",
	SET_TIME: "SET_TIME",
	SET_DATE: "SET_DATE",
	TOGGLE_MODAL_FORM: "TOGGLE_MODAL_FORM"

}


const calendarInitialState = {
	monthArray: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	toDoItem: [],
	currentTime: null,
	currentDate: null,
	chosenDate: null,
	modalForm: false
}

export const calendarReducer = (state = calendarInitialState, action) => {
	switch (action.type) {
		case CALENDAR_ACTIONS.GET_TODO_ITEM:
			return {
				...state,
				toDoItem: [...state.toDoItem, action.payload]
			}
		case CALENDAR_ACTIONS.SET_TODO_ITEM:
			return {
				...state,
				toDoItem: [...state.toDoItem,].concat(action.payload)
			}
		case CALENDAR_ACTIONS.DELETE_TODO_ITEM:
			return {
				...state,
				toDoItem: [...state.toDoItem.filter(todo => todo.id !== action.payload)]
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
		case CALENDAR_ACTIONS.SET_CHOSEN_DATE:
			return {
				...state,
				chosenDate: action.payload
			}
		case CALENDAR_ACTIONS.TOGGLE_MODAL_FORM:
			return {
				...state,
				modalForm: !state.modalForm
			}
		default:
			return state
	}
}