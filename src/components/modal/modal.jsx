import styled from 'styled-components';
import { Button } from '../button/button';
import { useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalQuestion,
} from '../../selectors';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const question = useSelector(selectModalQuestion);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) {
		return null;
	}

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="model-box">
				<h3>{question}</h3>
				<div className="buttons">
					<Button onClick={onConfirm}>Да</Button>
					<Button onClick={onCancel}>Отмена</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	position: fixed;
	z-index: 20;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;

	& .overlay {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}

	& .model-box {
		width: 300px;
		background-color: #fff;
		padding: 20px;
		text-align: center;
		position: relative;
		z-index: 30;
		border-radius: 5px;
		margin: auto;
	}

	& .buttons {
		display: flex;
		gap: 10px;
	}
`;
