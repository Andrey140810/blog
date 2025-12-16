import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { server } from '../../bff';
import { useState } from 'react';
import styled from 'styled-components';
import { AuthFormError, Button, H2, Input } from '../../components';
import { Link, Navigate } from 'react-router-dom';
import { setUser } from '../../action';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { useResetForm } from '../../hooks/use-reset-form';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(
			/^\w+$/,
			'Неверно заполнен логин. Допускаются только буквы и цифры',
		)
		.min(3, 'Неверно заполнен логин. Минимум 3 символа')
		.max(15, 'Неверно заполнен логин. Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(
			/^[\w#%]+$/,
			'Неверно заполнен пароль. Пароль должен содержать буквы, цифры, # и %',
		)
		.min(6, 'Неверно заполнен пароль. Минимум 6 символа')
		.max(30, 'Неверно заполнен пароль. Максимум 30 символов'),
	confirmPassword: yup
		.string()
		.required('Подтвердите пароль')
		.oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const StyledLink = styled(Link)`
	text-align: center;
	text-decoration: underline;
	font-size: 18px;
	margin: 20px 0;
`;

const RegistraionContainer = ({ className }) => {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: '',
			password: '',
			confirmPassword: '',
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setserverError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		server.register(login, password).then(({ error, res }) => {
			if (error) {
				setserverError(`Ошибка запроса: ${error}`);
				return;
			}

			dispatch(setUser(res));
			sessionStorage.setItem('userData', JSON.stringify(res));
		});
	};

	const formError =
		errors.login?.message ||
		errors.password?.message ||
		errors.confirmPassword?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register('login', {
						onChange: () => setserverError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register('password', {
						onChange: () => setserverError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Подтвердите пароль"
					{...register('confirmPassword', {
						onChange: () => setserverError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
				<StyledLink to="/login">Авторизация</StyledLink>
			</form>
		</div>
	);
};

export const Registraion = styled(RegistraionContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 300px;
	}
`;
