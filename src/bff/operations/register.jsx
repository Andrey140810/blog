import { addUser, getUser } from '../api';
import { sessions } from '../sessions';
import { transformUser } from '../transformers';

export const register = async (regLogin, regPassword) => {
	const existedUser = await getUser(regLogin);

	if (existedUser) {
		return {
			error: 'Такой логин уже занят',
			res: null,
		};
	}

	const dbUser = await addUser(regLogin, regPassword);

	const newUser = transformUser(dbUser);

	return {
		error: null,
		res: {
			id: newUser.id,
			login: newUser.login,
			roleId: newUser.roleId,
			session: sessions.create(newUser),
		},
	};
};
