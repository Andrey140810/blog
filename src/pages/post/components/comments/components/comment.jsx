import styled from 'styled-components';
import { Icon } from '../../../../../components';

const CommentContainer = ({ className, author, content, publishedAt }) => {
	const onRemoveComment = () => {};

	return (
		<div className={className}>
			<div className="comment-block">
				<div className="comment-info">
					<div className="author">
						<Icon
							id="fa-user-circle-o"
							margin="0 10px 0 0"
							size="17px"
						/>
						{author}
					</div>
					<div className="published-at">
						<Icon
							id="fa-calendar-o"
							margin="0 10px 0 0"
							size="17px"
						/>
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			<Icon
				id="fa-trash-o"
				margin="0 0 0 10px"
				onClick={onRemoveComment}
			/>
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	width: 100%;
	margin-bottom: 15px;

	& .comment-block {
		display: flex;
		flex-direction: column;
		border: 1px solid grey;
		width: 100%;
		min-height: 60px;
		padding: 5px;
	}

	& .comment-info {
		display: flex;
		justify-content: space-between;
		& i {
			cursor: auto;
		}
	}

	& .author {
		display: flex;
	}

	& .published-at {
		display: flex;
	}

	& .comment-text {
		text-align: left;
	}
`;
