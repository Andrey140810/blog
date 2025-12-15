import { transformPost } from '../transformers';

export const getPost = async (postId) =>
	fetch(`http://localhost:3000/posts/${postId}`)
		.then((res) => {
			if (!res.ok) {
				return Promise.reject('Такая страница не существует');
			}
			return res;
		})
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && transformPost(loadedUsers));
