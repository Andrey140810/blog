import { transformPost } from '../transformers';

export const getPost = async (postId) =>
	fetch(`http://localhost:3000/posts/${postId}`)
		.then((loadedUsers) => loadedUsers.json())
		.then((loadedUsers) => loadedUsers && transformPost(loadedUsers));
