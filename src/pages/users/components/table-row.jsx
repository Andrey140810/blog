import styled from 'styled-components';

const TableRowContainer = ({ children, className }) => (
	<div className={className}>{children}</div>
);

export const TableRow = styled(TableRowContainer)`
	display: flex;
	text-align: left;
	align-items: center;
	border: ${({ border }) => (border ? '1px solid grey' : 'none')};

	& > .div {
		padding: 0 10px;
	}

	& .login-colomn {
		width: 172px;
		margin-left: 15px;
	}

	& .registered-at-colomn {
		width: 213px;
	}

	& .role-colomn {
		width: 158px;
		display: flex;
		height: 25px;
	}
`;
