import styled from 'styled-components';
import { Icon } from '../../../../components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserId } from '../../../../selectors';
import { addCommentAsync } from '../../../../action';
import { useServerRequest } from '../../../../hooks';
import { Comment } from './components';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const dispatch = useDispatch();
	const userId = useSelector(selectUserId);
	const requestServer = useServerRequest();

	const onNewCommentAdd = (userId, postId, content) => {
		if (!content.trim()) return;
		dispatch(addCommentAsync(requestServer, postId, userId, content));
		setNewComment('');
	};

	return (
		<div className={className}>
			<div className="comment-area">
				<textarea
					value={newComment}
					placeholder="Комментарий..."
					onChange={({ target }) => setNewComment(target.value)}
				></textarea>
				<Icon
					id="fa-paper-plane-o"
					margin="0 0 0 10px"
					size="18px"
					onClick={() => onNewCommentAdd(userId, postId, newComment)}
				/>
			</div>
			<div className="comments-list">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	margin: 20px auto;
	width: 560px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15px;

	& textarea {
		height: 110px;
		width: 100%;
		resize: none;
		font-size: 18px;
		padding: 5px;
	}

	& .comment-area {
		display: flex;
		width: 100%;
	}

	& .comments-list {
		width: 100%;
	}
`;
