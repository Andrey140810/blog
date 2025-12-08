import { server } from '../bff';
import { ACTION_TYPE } from './type';

export const logout = (session) => (dispatch) => {
	server
		.logout(session)
		.then(() => {
			dispatch({
				type: ACTION_TYPE.LOGOUT,
			});
		})
		.catch((error) => {
			console.error('Ошибка при выходе', error);
			dispatch({
				type: ACTION_TYPE.LOGOUT,
			});
		});
};
