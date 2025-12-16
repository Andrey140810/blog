import { Icon } from '../../../components';
import styled from 'styled-components';
import { TableRow } from './table-row';
import { useState } from 'react';
import { useServerRequest } from '../../../hooks';
import PropTypes from 'prop-types';
import { PROP_TYPE } from '../../../constants';

const UserRowContainer = ({
	className,
	id,
	login,
	roleId: userRoleId,
	registeredAt,
	roles,
	onRemoveUser,
}) => {
	const [initialRoleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);
	const requestServer = useServerRequest();

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = (userId, newUserRoleId) => {
		requestServer('updateUserRole', userId, newUserRoleId).then(() => {
			setInitialRoleId(newUserRoleId);
		});
	};

	const isSaveButtonDisabled = selectedRoleId === initialRoleId;

	return (
		<div className={className}>
			<TableRow border>
				<div className="login-colomn">{login}</div>
				<div className="registered-at-colomn">{registeredAt}</div>
				<div className="role-colomn">
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Icon
						id="fa-floppy-o"
						margin="-5px 0 0 10px"
						disabled={isSaveButtonDisabled}
						onClick={() => onRoleSave(id, selectedRoleId)}
					/>
				</div>
			</TableRow>
			<Icon id="fa-trash-o" margin="0 0 0 10px" onClick={onRemoveUser} />
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	text-align: left;
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onRemoveUser: PropTypes.func.isRequired,
};
