import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard, Pagination, Search } from './components';
import { PAGINATION_LIMIT } from '../../constants';
import { debounce, getLastPage } from '../../utils';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [shouldSearch, setShouldSearch] = useState(false);
	const [searchPhrase, setSearchPhrase] = useState('');
	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPosts(posts);
				setLastPage(getLastPage(links));
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch]);

	const runDelaySearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		runDelaySearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div className="posts-and-search">
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{posts.length > 0 ? (
					<div className="card-container">
						{posts.map(
							({
								id,
								imageUrl,
								publishedAt,
								title,
								commentsCount,
							}) => (
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
				) : (
					<div className="no-posts">Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && posts.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	max-width: 300px;
	margin: 60px auto;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& .card-container {
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
		margin-bottom: 30px;
	}
`;
