import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, settemperature] = useState('');
	const [weather, setweather] = useState('');
	const [error, setError] = useState(null);
	useEffect(() => {
		const getGeolocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords;

						fetch(
							`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=ru&appid=657dc6a96d71e54bf1b16c9270787da7`,
						)
							.then((res) => {
								if (!res.ok) {
									throw new Error(
										`HTTP error! status: ${res.status}`,
									);
								}
								return res.json();
							})
							.then(({ name, main, weather }) => {
								setCity(name);
								settemperature(Math.round(main.temp));
								setweather(weather[0].description);
								setError(null);
							})
							.catch((error) => {
								console.error(
									'Ошибка получения погоды:',
									error,
								);
								setError(
									'Не удалось получить данные о погоде.',
								);
							});
					},
					(error) => {
						console.error(
							'Ошибка получении геолокации:',
							error.message,
						);
						setError('Доступ к геолокации запрещен или недоступен');
					},
					{
						enableHighAccuracy: true,
						timeout: 10000,
						maximumAge: 60000,
					},
				);
			} else {
				console.error('Геолокация не поддерживается этим браузером');
				setError('Геолокация не поддерживатеся вашим браузером.');
			}
		};
		getGeolocation();
	}, []);

	return (
		<div className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>wed@developer.ru</div>
			</div>
			<div>
				{error && <div>Ошибка: {error}</div>}
				{city && (
					<>
						<div>
							{city},{' '}
							{new Date().toLocaleString('ru', {
								day: 'numeric',
								month: 'long',
							})}
						</div>
						<div>
							{temperature} градусов {weather}
						</div>
					</>
				)}
				{!city && !error && <div>Загрузка погоды</div>}
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-weight: bold;
	width: 1000px;
	height: 120px;
	padding: 20px 40px;
	box-shadow: 0px 0px 18px #000;
	background-color: #fff;
`;
