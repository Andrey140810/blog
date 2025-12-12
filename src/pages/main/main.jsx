import styled from 'styled-components';
import { Input } from '../../components';
import { useEffect, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { PostCard } from './components/post-card';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts').then((posts) => {
			if (posts.error) return;
			setPosts(posts.res);
		});
	}, [requestServer]);

	return (
		<div className={className}>
			<div className="main-container">
				<Input className="input-search" placeholder="Поиск..." />
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
			</div>
		</div>
	);
};

export const Main = styled(MainContainer)`
	& .main-container {
		max-width: 300px;
		margin: 60px auto;
	}

	& .input-search {
		margin-bottom: 60px;
	}

	& .card-container {
		display: grid;
		justify-content: center;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}
`;
