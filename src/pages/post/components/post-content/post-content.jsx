import styled from 'styled-components';
import { H2, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';

const PostContentContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			{isAdmin && (
				<SpecialPanel
					id={id}
					publishedAt={publishedAt}
					iconButton={
						<Icon
							id="fa-pencil-square-o"
							margin="0 0 0 10px"
							onClick={() => navigate(`/post/${id}/edit`)}
						/>
					}
				/>
			)}
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
