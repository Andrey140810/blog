import styled from 'styled-components';
import { Logo, ControlPanel } from './components';

const Description = styled.div`
	font-size: 24px;
	font-weight: 400;
	font-style: italic;
	margin-top: -10px;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Description>
			Веб-технологии
			<br />
			Написание кода
			<br />
			Разбор ошибок
		</Description>
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	justify-content: space-between;
	position: fixed;
	top: 0;
	width: 1000px;
	height: 130px;
	padding: 20px 40px;
	box-shadow: 0px 0px 18px #000;
	background-color: #fff;
`;
