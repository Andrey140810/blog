import styled from 'styled-components';
import { Icon } from '../../../../components';
import { useDispatch } from 'react-redux';
import { useServerRequest } from '../../../../hooks';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../action';
import { useNavigate } from 'react-router-dom';

const SpecialPanelContainer = ({ className, id, publishedAt, iconButton }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onRemovePost = (id) => {
		dispatch(
			openModal({
				question: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() =>
						navigate('/'),
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="date-panel">
				{publishedAt && <Icon id="fa-calendar-o" />}
				{publishedAt}
			</div>

			<div className="buttons-panel">
				{iconButton}
				{publishedAt && (
					<Icon
						id="fa-trash-o"
						margin="0 0 0 10px"
						onClick={() => onRemovePost(id)}
					/>
				)}
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

		& i {
			cursor: auto;
		}
	}
`;
