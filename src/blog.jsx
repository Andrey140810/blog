import { Route, Routes } from 'react-router-dom';
import { Header, Footer, Modal } from './components';
import styled from 'styled-components';
import { Authorization, Post, Registraion, Users } from './pages';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './action';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 1000px;
	min-height: 100%;
	background-color: #fff;
	margin: auto;
`;

const Content = styled.div`
	text-align: center;
	padding: 130px 0;
`;

export function Blog() {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData');

		if (!currentUserDataJSON) return;

		const currentUserData = JSON.parse(currentUserDataJSON);

		dispatch(
			setUser({
				...currentUserData,
				roleId: Number(currentUserData.roleId),
			}),
		);
	}, [dispatch]);

	return (
		<AppColumn>
			<Header />
			<Content>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<Authorization />} />
					<Route path="/register" element={<Registraion />} />
					<Route path="/users" element={<Users />} />
					<Route path="/post" element={<div>Новая статья</div>} />
					<Route path="/post/:id" element={<Post />} />
					<Route path="*" element={<div>Ошибка</div>} />
				</Routes>
			</Content>
			<Footer />
			<Modal />
		</AppColumn>
	);
}
