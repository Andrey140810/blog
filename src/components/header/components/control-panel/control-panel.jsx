import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Link, useNavigate } from 'react-router-dom';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const StyledLink = styled(Link)`
	font-size: 18px;
	width: 100px;
	height: 42px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	border: 1px solid transparent;
	cursor: pointer;
	transition: border-color 0.25s;
	transition: transform 0.25s;
	&:hover {
		border-color: #646cff;
		transform: scale(1.05);
	}
	&:active {
		transform: scale(0.95);
		color: #646cff;
	}
`;

const StyledButton = styled.div`
	cursor: pointer;
`;

const ControPanelContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<RightAligned>
				<StyledLink to="/login">Войти</StyledLink>
			</RightAligned>
			<RightAligned>
				<StyledButton>
					<div onClick={() => navigate(-1)}>
						<Icon id="fa-backward" margin="10px 0 0 0" />
					</div>
				</StyledButton>
				<Link to="/post">
					<Icon id="fa-file-text-o" margin="10px 0 0 18px" />
				</Link>
				<Link to="/users">
					<Icon id="fa-users" margin="10px 0 0 18px" />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControPanelContainer)``;
