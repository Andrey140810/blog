import styled from 'styled-components';
import { Icon } from '../../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import {
	CLOSE_MODAL,
	openModal,
	removeCommentAsync,
} from '../../../../../action';
import { useServerRequest } from '../../../../../hooks';
import { checkAccess } from '../../../../../utils';
import { ROLE } from '../../../../../constants';
import { selectUserRole } from '../../../../../selectors';
import PropTypes from 'prop-types';

const CommentContainer = ({
	className,
	id,
	postId,
	author,
	content,
	publishedAt,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onRemoveComment = (id) => {
		dispatch(
			openModal({
				question: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, id, postId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = checkAccess(
		[ROLE.ADMIN, ROLE.MODERATOR],
		userRole,
	);

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
			{isAdminOrModerator && (
				<Icon
					id="fa-trash-o"
					margin="0 0 0 10px"
					onClick={() => onRemoveComment(id)}
				/>
			)}
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
		width: 532px;
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

Comment.propTypes = {
	id: PropTypes.number.isRequired,
	postId: PropTypes.string.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
