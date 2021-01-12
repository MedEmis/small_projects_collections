import React, { useEffect, useReducer, memo } from 'react'
import { CALENDAR_ACTIONS, calendarReducer } from './calendarReducer';
import { Loader } from '../Loader';
import { CalendarTOdoList } from './CalendarTOdoList';
import { CalendarView } from './CalendarView';
import { API } from './../../API';
import { PopUpforTime } from './PopupForTime';
import "./calendar.scss"

const MonthButton = ({ name }) => <button className="calendar__buttonList_item">{name}</button>

const CalendarBox = () => {
	const [state, dispatch] = useReducer(calendarReducer)

	const getTodos = () => {
		API.getToDos().then(response => dispatch({ type: CALENDAR_ACTIONS.SET_TODO_ITEM, payload: response.data }))
	}
	const addTodos = (time, text) => {
		let date = state.chosenDate
		API.setToDos(time, date, text).then(response => dispatch({ type: CALENDAR_ACTIONS.SET_TODO_ITEM, payload: response.data }))
	}
	const deleteTodos = (id) => {
		//console.log("deleted")
		API.deleteToDos(id).then(response => dispatch({ type: CALENDAR_ACTIONS.DELETE_TODO_ITEM, payload: id }))
	}
	useEffect(() => {
		getTodos()
	}, [])
	useEffect(() => {//TIME
		const intervalId = setInterval(() => {  //assign interval to a variable to clear it
			dispatch({ type: CALENDAR_ACTIONS.SET_TIME })
			dispatch({ type: CALENDAR_ACTIONS.SET_DATE })
		}, 1000)
		return () => clearInterval(intervalId); //This is important
	}, []);


	return (
		<div className="calendar">
			<h1 className="calendar__title">Month List</h1>
			<div className="calendar__title_time-now">
				<span>{`Time now: ${state ? state.currentTime : "..."} Date now: ${state ? state.currentDate : "..."}`}</span>
			</div>
			<button className="calendar__title_add-todo"
				onClick={() => dispatch({ type: CALENDAR_ACTIONS.TOGGLE_MODAL_FORM })}>Add nev event</button>
			<div className="calendar__buttonList">
				{
					state
						? state.monthArray.map(item => <MonthButton name={item} key={item} />)
						: <Loader />
				}
			</div>
			<div className="calendar__sections">
				<div className="calendar__sections_todo">
					{state
						? <CalendarTOdoList items={state.toDoItem} toDelete={deleteTodos} />
						: <Loader />
					}
					{state
						? state.modalForm && <PopUpforTime getData={(time, text) => addTodos(time, text)} close={() => dispatch({ type: CALENDAR_ACTIONS.TOGGLE_MODAL_FORM })} />
						: null
					}
				</div>
				<div className="calendar__sections_view">
					<CalendarView getDataTime={date => dispatch({ type: CALENDAR_ACTIONS.SET_CHOSEN_DATE, payload: date })} />
				</div>
			</div>

		</div>
	)
}




export default memo(CalendarBox)