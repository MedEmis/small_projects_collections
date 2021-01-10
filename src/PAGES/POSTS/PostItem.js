import React from 'react'
import { PostComment } from './PostComment';
import { Loader } from './../Loader';


export const PostItem = ({ userId, postId, title, body, comments, loading, deleteItem }) => {



	return (
		<div className="post-item">
			{
				loading
					? <Loader/>
					: <>
						<div className="post-item__body">
							<div className="post-item__body_title">{title}
								<span className="post-item__body_title__delete" onClick={deleteItem}>delete post</span>
							</div>
							<div className="post-item__body_section-wrapper">
								<div className="post-item__body_section__id">
									<div className="post-item__body_logId">{`Post # ${postId}`}</div>
									<div className="post-item__body_userId">{`User Id # ${userId}`}</div>
								</div>
								<div className="post-item__body_section__text">
									<div className="post-item__body_text">{body}</div>
								</div>
							</div>
						</div>
						<div className="post-item__comments">
							{
								comments
									? comments.map((item, index) => <PostComment
										key={index}
										postId={item.postId}
										name={item.name}
										email={item.email}
										body={item.body}
									/>)
									: null
							}
						</div>
					</>
			}
		</div>
	)
}

