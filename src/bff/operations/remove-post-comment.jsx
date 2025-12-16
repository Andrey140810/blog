import { deleteComment, getPost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';
import { getPostCommentsWithAuthor } from '../utils';

export const removePostComment = async (userSession, id, postId) => {
	const accessRoles = [ROLE.ADMIN, ROLE.MODERATOR];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deleteComment(id);

	const post = await getPost(postId);

	const commentsWithProps = await getPostCommentsWithAuthor(postId);
	return {
		error: null,
		res: { ...post, comments: commentsWithProps },
	};
};
