import styled from 'styled-components';
import { Button, Icon } from '../../../../components';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ROLE } from '../../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectUserLogin,
	selectUserRole,
	selectUserSession,
} from '../../../../selectors';
import { logout } from '../../../../action';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const ControPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);
	const session = useSelector(selectUserSession);

	const handleClickLogout = () => {
		dispatch(logout(session));
		navigate('/login');
	};

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button>
						<Link to="/login">Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon
							id="fa-sign-out"
							margin="0 0 0 10px"
							onClick={handleClickLogout}
						/>
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon
					onClick={() => navigate(-1)}
					id="fa-backward"
					margin="10px 0 0 0"
				/>
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
