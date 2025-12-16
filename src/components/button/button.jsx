import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonContainer = ({ children, className, ...props }) => {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
};

export const Button = styled(ButtonContainer)`
	font-size: 18px;
	height: 42px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 8px;
	border: 1px solid transparent;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	transition: border-color 0.25s;
	transition: transform 0.25s;
	width: ${({ width = '100%' }) => width};
	&:hover:not(:disabled) {
		border-color: #646cff;
		transform: scale(1.05);
	}
	&:active:not(:disabled) {
		transform: scale(0.95);
		color: #646cff;
	}
`;

Button.propTypes = {
	children: PropTypes.node.isRequired,
	width: PropTypes.string,
};
