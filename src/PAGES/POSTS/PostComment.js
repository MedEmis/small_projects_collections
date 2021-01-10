import React from 'react'

export const PostComment = ({ postId, name, email, body }) => {
	return (
		<div className="post-item__comments_item ">
			<div className="post-item__comments_item__section-wrapper ">
				<div className="post-item__comments_item__section_absolute">
					<div className="post-item__comments_item__name">{name}</div>
					<div className="post-item__comments_item__email">{email}</div>
					<div className="post-item__comments_item__postId">{postId}</div>
				</div>
				<div className="post-item__comments_item__section ">
					<div className="post-item__comments_item__text">{body}</div>
				</div>
			</div>
		</div>
	)
}