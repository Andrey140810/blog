import styled from 'styled-components';
import { Icon } from '../../../../components';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../../hooks';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../action';
// import { useNavigate } from 'react-router-dom';

const SpecialPanelContainer = ({
	className,
	publishedAt,
	iconButton,
	question,
}) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	// const navigate = useNavigate();

	const onRemovePost = (postId) => {
		dispatch(
			openModal({
				question: question,
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, postId));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="date-panel">
				<Icon id="fa-calendar-o" />
				{publishedAt}
			</div>

			<div className="buttons-panel">
				{iconButton}
				<Icon
					id="fa-trash-o"
					margin="0 0 0 10px"
					onClick={onRemovePost}
				/>
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 10px;
	font-size: 18px;

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
