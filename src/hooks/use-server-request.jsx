import { useSelector } from 'react-redux';
import { selectUserSession } from '../selectors';
import { server } from '../bff';
import { useCallback } from 'react';

export const useServerRequest = () => {
	const session = useSelector(selectUserSession);

	return useCallback(
		(operation, ...params) => {
			if (
				['register', 'authorize', 'fetchPost', 'fetchPosts'].includes(
					operation,
				)
			) {
				return server[operation](...params);
			}

			return server[operation](session, ...params);
		},
		[session],
	);
};
