import styled from 'styled-components';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Comments, PostContent, PostForm } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost } from '../../selectors';
import { useMatch, useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPost, RESET_POST_DATA } from '../../action';
import { Content, Error } from '../../components';
import { ROLE } from '../../constants';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const post = useSelector(selectPost);
	const params = useParams();
	const isEditing = !!useMatch('/post/:id/edit');
	const isCreating = !!useMatch('/post');
	const [isLoading, setIsLoading] = useState(!isCreating);
	const [error, setError] = useState(null);
	const requestServer = useServerRequest();

	useLayoutEffect(() => {
		dispatch(RESET_POST_DATA);
	}, [dispatch, isCreating]);

	useEffect(() => {
		if (isCreating) {
			return;
		}

		dispatch(loadPost(requestServer, params.id)).then((postData) => {
			setError(postData.error);
			setIsLoading(false);
		});
	}, [requestServer, dispatch, params.id, isCreating]);

	if (isLoading) {
		return null;
	}

	return error ? (
		<Error error={error} />
	) : isCreating || isEditing ? (
		<Content access={[ROLE.ADMIN]} serverError={error}>
			<div className={className}>
				<PostForm post={post} key={post.id ?? 'new'} />
			</div>
		</Content>
	) : (
		<>
			<div className={className}>
				<PostContent post={post} />
				<Comments comments={post.comments} postId={post.id} />
			</div>
		</>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
