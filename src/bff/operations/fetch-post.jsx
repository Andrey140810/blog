import { getPost, getUsers } from '../api';
import { getComments } from '../api/get-comments';

export const fetchPost = async (postId) => {
	const post = await getPost(postId);

	const comments = await getComments(postId);

	const users = await getUsers();

	const commentsWithProps = comments.map((comment) => {
		const user = users.find(({ id }) => id === comment.authorId);

		return {
			...comment,
			author: user?.login,
		};
	});

	if (!post) {
		return {
			error: 'Статья не найдена',
			res: null,
		};
	}

	return {
		error: null,
		res: {
			...post,
			comments: commentsWithProps,
		},
	};
};
