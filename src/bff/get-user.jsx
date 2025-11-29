export const getUser = async (loginToFind) =>
	fetch(`http://localhost:3000/users?login=${loginToFind}`)
		.then((loadedUsers) => loadedUsers.json())
		.then(([loadedUsers]) => loadedUsers);
