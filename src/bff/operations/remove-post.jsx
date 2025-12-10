import { deletePost } from '../api';
import { ROLE } from '../constants';
import { sessions } from '../sessions';

export const removePost = async (userSession, postId) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(userSession, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	await deletePost(postId);

	return {
		error: null,
		res: true,
	};
};
