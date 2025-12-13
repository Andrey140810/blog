import styled from 'styled-components';
import { Input } from '../../components';
import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard, Pagination } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { getLastPage } from '../../utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPosts(posts);
				setLastPage(getLastPage(links));
			},
		);
	}, [requestServer, page]);

	return (
		<div className={className}>
			<Input className="input-search" placeholder="Поиск..." />
			<div className="card-container">
				{posts.map(
					({ id, imageUrl, publishedAt, title, commentsCount }) => (
						<PostCard
							key={id}
							id={id}
							title={title}
							publishedAt={publishedAt}
							imageUrl={imageUrl}
							commentsCount={commentsCount}
						/>
					),
				)}
			</div>
			{lastPage > 1 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	max-width: 300px;
	margin: 60px auto;

	& .input-search {
		margin-bottom: 60px;
	}

	& .card-container {
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		margin-bottom: 30px;
	}
`;
