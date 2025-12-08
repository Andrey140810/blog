import styled from 'styled-components';
import { H2, Icon } from '../../../../components';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const onEditPost = () => {};

	const onRemovePost = () => {};

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<div className="special-panel">
				<div className="date-panel">
					<Icon id="fa-calendar-o" />
					{publishedAt}
				</div>

				<div className="buttons-panel">
					<Icon
						id="fa-pencil-square-o"
						margin="0 0 0 10px"
						onClick={onEditPost}
					/>
					<Icon
						id="fa-trash-o"
						margin="0 0 0 10px"
						onClick={onRemovePost}
					/>
				</div>
			</div>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 20px 0;
	}
	& .special-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		font-size: 18px;
	}
	& .post-text {
		text-align: left;
		font-size: 18px;
	}
	& H2 {
		text-align: left;
		margin-bottom: 5px;
	}
	& .buttons-panel {
		display: flex;
		gap: 10px;
	}
	& .date-panel {
		display: flex;
		align-items: center;
		gap: 10px;
	}
`;
