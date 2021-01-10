import React from 'react'
import { Link } from 'react-router-dom'
import CalendarBox from './CALENDAR/Calendar';
import { ListOfPosts } from './POSTS/ListOfPosts';

export const routes = [{
	path: 'Posts',
	component: ListOfPosts,
}, {
	path: 'Calendar',
	component: CalendarBox,
}, {
	path: 'empty1',
	component: null,
}, {
	path: 'empty2',
	component: null,
}, {
	path: 'empty3',
	component: null,
}]

export const Navigation = () => {

	return (
		<div className="navigation">
			<div className="navigation__button-list">
				{
					routes.map(item => (item
						? <LinkItem path={item.path} key={item.path} />
						: null
					))
				}
			</div>
		</div>
	)
}

const LinkItem = ({ path }) => {
	return <Link to={path} className="navigation__button-list_button" >{path}</Link>
}