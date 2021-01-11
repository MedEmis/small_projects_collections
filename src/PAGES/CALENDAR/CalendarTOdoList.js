import React from 'react'

export const CalendarTOdoList = ({ items }) => {
	//console.log((items[0]))
	return (
		<div className="calendar__todo-wrapper">
			<ul className="calendar__todo-list">
				{
					items.map((item,index) => item
						? <li className="calendar__todo-list_item" key={index}>
							<span className="calendar__todo-list_item__time">{`${item.time}`} -- </span>
							<span className="calendar__todo-list_item__event"> {`${item.event}`}</span>
						</li>
						: null
					)
				}
			</ul>
		</div>
	)
}

