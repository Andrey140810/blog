import styled from 'styled-components';
import { useEffect } from 'react';
import { Comments, PostContent, PostForm } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost } from '../../selectors';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPost } from '../../action';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const post = useSelector(selectPost);
	const params = useParams();
	const isEditing = useMatch('/post/:id/edit');
	const requestServer = useServerRequest();

	useEffect(() => {
		dispatch(loadPost(requestServer, params.id));
	}, [requestServer, dispatch, params.id]);

	return (
		<div className={className}>
			{isEditing ? (
				<PostForm post={post} />
			) : (
				<>
					<PostContent post={post} />
					<Comments comments={post.comments} postId={post.id} />
				</>
			)}
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
