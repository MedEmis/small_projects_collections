import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CalendarBox from './CALENDAR/Calendar';
import { ListOfPosts } from './POSTS/ListOfPosts';

export const routes = [{
	path: 'Posts',
	component: ListOfPosts,
	text: "Does not have Redux or global state. Was user local useReducer. Getting data from jsonplaceholder. "
}, {
	path: 'Organizer',
	component: CalendarBox,
	text: "Does not have Redux or global state. Was user local useReducer. Getting data from jsonplaceholder server. "
}, {
	path: 'empty1',
	component: null,
	text: ""
}, {
	path: 'empty2',
	component: null,
	text: ""
}, {
	path: 'empty3',
	component: null,
	text: ""
}]



export const Navigation = () => {
	const [infoBlock, setInfo] = useState()
	const [path, setPath] = useState()
	useEffect(() => {
		routes.forEach(element => {
			if (window.location.pathname === "/" + element.path) {
				setInfo(prev => element.text)
			}
		});
	})
	return (
		<div className="navigation">
			<div className="navigation__info">INFO: {infoBlock}</div>
			<div className="navigation__button-list">
				{
					routes.map(item => (item
						? <LinkItem path={item.path} key={item.path} setPath={setPath} />
						: null
					))
				}
			</div>
		</div>
	)
}

const LinkItem = ({ path, setPath }) => {
	return <Link to={path} className="navigation__button-list_button" onClick={(path) => setPath(path)} >{path}</Link>
}