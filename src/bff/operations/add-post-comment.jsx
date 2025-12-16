import { addComment, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';

export const addPostComment = async (userSession, postId, userId, content) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await addComment(postId, userId, content);

	const post = await getPost(postId);

	const commentsWithProps = await getPostCommentsWithAuthor(postId);

	return {
		error: null,
		res: { ...post, comments: commentsWithProps },
	};
};
