import React from 'react'
import { Loader } from '../Loader'

export const CalendarTOdoList = ({ items, toDelete }) => {
	//console.log((items[0]))
	return (
		<div className="calendar__todo-wrapper">
			{
				items
					? <ol className="calendar__todo-list">
						{
							items.map((item, index) => item
								? <TodoItem item={item} index={index} toDelete={toDelete} key={index}/>
								: null
							)
						}
					</ol>
					: <Loader />
			}
		</div>
	)
}

const TodoItem = ({ item, index, toDelete }) => {
	return (
		<li value={item.id} className="calendar__todo-list_item" key={item.id}  >
			<div>
				<span className="calendar__todo-list_item__time">{`${item.date}`} at </span>
				<span className="calendar__todo-list_item__time">{`${item.time}`}</span>
				<span className="calendar__todo-list_item__delete" onClick={() => toDelete(item.id)} >❌</span>
			</div>
			<div>
				<span className="calendar__todo-list_item__event"> {`${item.event}`}</span>
			</div>
		</li>
	)
}