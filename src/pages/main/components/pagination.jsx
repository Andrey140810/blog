import styled from 'styled-components';
import { Button } from '../../../components';
import PropTypes from 'prop-types';

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
	return (
		<div className={className}>
			<Button disabled={page === 1} onClick={() => setPage(1)}>
				В начало
			</Button>
			<Button disabled={page === 1} onClick={() => setPage(page - 1)}>
				Предыдущая
			</Button>
			<div className="current-page">{page}</div>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(page + 1)}
			>
				Следующая
			</Button>
			<Button
				disabled={page === lastPage}
				onClick={() => setPage(lastPage)}
			>
				В конец
			</Button>
		</div>
	);
};

export const Pagination = styled(PaginationContainer)`
	display: flex;
	justify-content: center;
	gap: 5px;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	bottom: 140px;

	& Button {
		font-size: 12px;
		white-space: nowrap;
	}

	& .current-page {
		border: 1px solid transparent;
		border-radius: 8px;
		background-color: #f9f9f9;
		width: 100%;
		height: 42px;
		display: flex;
		align-items: center;
		padding: 0 30px;
	}
`;

Pagination.propTypes = {
	page: PropTypes.number.isRequired,
	lastPage: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
};
