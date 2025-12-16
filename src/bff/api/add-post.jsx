import { generateDate } from '../utils';

export const addPost = ({ imageUrl, content, title }) =>
	fetch('http://localhost:3000/posts', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			title,
			image_url: imageUrl,
			published_at: generateDate(),
			content,
		}),
	}).then((createdPost) => createdPost.json());
