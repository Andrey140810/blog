export const getLastPage = (links) => {
	const result = links.match(/^.+page=(\d{1,4})&_limit=9>; rel="last"$/);

	return Number(result[1]);
};
