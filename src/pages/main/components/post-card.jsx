import styled from 'styled-components';
import { Icon } from '../../../components';
import { Link } from 'react-router-dom';

const PostCardContainer = ({
	className,
	id,
	imageUrl,
	publishedAt,
	title,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div>
					<h3 className="post-card-title">{title}</h3>
					<div className="post-card-info">
						<div className="post-card-text">
							<Icon id="fa-calendar-o" />
							{publishedAt}
						</div>
						<div className="post-card-text">
							<Icon id="fa-comment-o" />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	width: 282px;
	min-height: 210px;
	border: 1px solid grey;

	& .post-card-info {
		display: flex;
		justify-content: space-between;
		margin: 0 5px;
	}

	& .post-card-text {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	& .post-card-title {
		text-align: left;
		margin: 0 5px;
		font-weight: bold;
	}
`;
