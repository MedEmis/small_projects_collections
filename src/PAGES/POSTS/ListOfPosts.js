import React, { memo, useEffect, useReducer } from 'react'
import { PostItem } from './PostItem';
import { ACTIONS, postReducer } from './postReducer';
import { API } from '../../API';
import { Loader } from './../Loader';
import './postStyle.scss'
import useScrollPercentage from '../../HOOKS/useScrollPercentage';

export const ListOfPosts = memo(() => {
	const [state, dispatch] = useReducer(postReducer)
	const [scrollRef, scrollPercentage] = useScrollPercentage();
	const GetData = async () => {
		//dispatch({ type: ACTIONS.LOADING_ON })
		let posts = await API.getPosts()
		let comments = await API.getComments()
		dispatch({ type: ACTIONS.GET_DATA, payload: [posts.data, comments.data] })
		//dispatch({ type: ACTIONS.LOADING_OFF })
	}

	const grabAllCommentsForPost = (postId) => {
		return state.usersData[1].filter((comment) => comment.postId === postId)
	}
	const addPostsonScroll = (e) => {
		if ((scrollPercentage === 0 && e.deltaY > 0) || scrollPercentage > 95) {
			dispatch({ type: ACTIONS.MORE_USER })
		}
	}
	// const mapPostwithComments = (userPosts) => {
	// 	const postWithComments = userPosts.reduce((acc, post) => {
	// 		const allComments = grabAllCommentsForPost(post.id);
	// 		acc[post.id] = allComments;
	// 		return acc;
	// 	}, {});
	// }
	useEffect(() => {
		GetData()
	}, []);
	console.log(scrollPercentage)
	return (
		<div className="list-of-posts" ref={scrollRef}
			onWheel={(e) => addPostsonScroll(e)}>
			{
				state
					? <div className="list-of-posts__panel">
						<button className="list-of-posts__panel_button" onClick={
							state.numberOfUsers > 0
								? () => dispatch({ type: ACTIONS.LESS_USER })
								: null
						} >{state.numberOfUsers > 0 ? "Remove one" : "Nothing to remove"}</button>
						<button className="list-of-posts__panel_button" onClick={() => dispatch({ type: ACTIONS.MORE_USER })} >Add one</button>
						{(state && state.numberOfUsers > 0) && <div>number of posts {state.numberOfUsers}</div>}
						<h1 > {`scroll  ${scrollPercentage}%`} </h1>
					</div>
					: null
			}
			<div className="list-of-posts__wrapper">
				{state
					? state.usersData[0].slice(0, state.numberOfUsers).map(item =>
						item
							? <PostItem
								key={item.id}
								userId={item.userId}
								postId={item.id}
								title={item.title}
								body={item.body}
								loading={state.isLoading}
								comments={grabAllCommentsForPost(item.id)}
								deleteItem={() => dispatch({ type: ACTIONS.REMOVE_POST, payload: item.id })}
							/>
							: null
					)
					: <Loader />
				}
			</div>
		</div>

	)
})

