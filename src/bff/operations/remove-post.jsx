import { deleteComment, deletePost, getComments } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removePost = async (userSession, id) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deletePost(id);

	const comments = await getComments(id);

	await Promise.all(
		comments.map(({ id: commentId }) => deleteComment(commentId)),
	);

	return {
		error: null,
		res: true,
	};
};
