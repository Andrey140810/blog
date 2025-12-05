import {
	authorize,
	fetchRoles,
	fetchUsers,
	logout,
	register,
	removeUser,
	updateUserRole,
} from './operations';

export const server = {
	logout,
	authorize,
	register,
	fetchUsers,
	fetchRoles,
	updateUserRole,
	removeUser,
};
