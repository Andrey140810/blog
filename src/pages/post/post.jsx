import styled from 'styled-components';
import { useEffect } from 'react';
import { Comments, PostContent } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost } from '../../selectors';
import { useParams } from 'react-router-dom';
import { useServerRequest } from '../../hooks';
import { loadPost } from '../../action';

const PostContainer = ({ className }) => {
	const dispatch = useDispatch();
	const post = useSelector(selectPost);
	const params = useParams();
	const requestServer = useServerRequest();

	useEffect(() => {
		dispatch(loadPost(requestServer, params.id));
	}, [requestServer, dispatch, params.id]);

	return (
		<div className={className}>
			<PostContent post={post} />
			<Comments comments={post.comments} postId={post.id} />
		</div>
	);
};

export const Post = styled(PostContainer)`
	margin: 40px 0;
	padding: 0 80px;
`;
