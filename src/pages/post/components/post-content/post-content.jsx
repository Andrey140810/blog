import styled from 'styled-components';
import { H2, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useNavigate } from 'react-router-dom';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				publishedAt={publishedAt}
				question="Удалить пост?"
				iconButton={
					<Icon
						id="fa-pencil-square-o"
						margin="0 0 0 10px"
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 20px 20px 0;
	}
	& .post-text {
		text-align: left;
		font-size: 18px;
		white-space: pre-line;
	}
	& H2 {
		text-align: left;
		margin-bottom: 5px;
	}
`;
