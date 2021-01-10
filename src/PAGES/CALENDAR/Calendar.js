import React, { useEffect, useReducer, memo } from 'react'
import { CALENDAR_ACTIONS, calendarReducer } from './calendarReducer';
import { Loader } from '../Loader';
import { CalendarTOdoList } from './CalendarTOdoList';
import { CalendarView } from './CalendarView';
import "./calendar.scss"

const MonthButton = ({ name }) => <button className="calendar__buttonList_item">{name}</button>

const CalendarBox = () => {
	const [state, dispatch] = useReducer(calendarReducer)

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
			<div className="calendar__buttonList">
				{
					state
						? state.monthArray.map(item => <MonthButton name={item} key={item} />)
						: <Loader />
				}
			</div>
			<div className="calendar__sections">
				<div className="calendar__sections_todo">
					<CalendarTOdoList />
				</div>
				<div className="calendar__sections_view">
					<CalendarView />
				</div>
			</div>
		</div>
	)
}

export default memo(CalendarBox)