import styled from 'styled-components';
import { Content, H2 } from '../../components';
import { UserRow } from './components';
import { TableRow } from './components';
import { useServerRequest } from '../../hooks';
import { useEffect, useState } from 'react';
import { ROLE } from '../../constants';
import { checkAccess } from '../../utils';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUsers, setShouldUpdateUsers] = useState(false);
	const userRole = useSelector(selectUserRole);

	const requestServer = useServerRequest();

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		Promise.all([
			requestServer('fetchUsers'),
			requestServer('fetchRoles'),
		]).then(([usersRes, rolesRes]) => {
			if (usersRes.error || rolesRes.error) {
				setErrorMessage(usersRes.error || rolesRes.error);
				return;
			}

			setUsers(usersRes.res);
			setRoles(rolesRes.res);
		});
	}, [requestServer, shouldUpdateUsers, userRole]);

	const onRemoveUser = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}
		requestServer('removeUser', userId).then(() => {
			setShouldUpdateUsers(!shouldUpdateUsers);
		});
	};

	return (
		<Content access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-colomn">Логин</div>
						<div className="registered-at-colomn">
							Дата регистрации
						</div>
						<div className="role-colomn">Роль</div>
					</TableRow>
					{users.map(({ id, login, roleId, registeredAt }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onRemoveUser={() => onRemoveUser(id)}
						/>
					))}
				</div>
			</div>
		</Content>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: left;
	margin: 0 auto;
	width: 570px;
	font-size: 18px;
`;
