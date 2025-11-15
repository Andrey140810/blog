export const getUsers = () =>
	fetch('http://localhost:3000/users').then((loadUsers) => loadUsers.json());
