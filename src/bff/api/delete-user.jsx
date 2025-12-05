export const deleteUser = (userId) =>
	fetch(`http://localhost:3000/users/${userId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			id: userId,
		}),
	});
