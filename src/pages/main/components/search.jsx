import styled from 'styled-components';
import { Icon, Input } from '../../../components';
import PropTypes from 'prop-types';

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				value={searchPhrase}
				onChange={onChange}
				placeholder="Поиск"
			/>
			<Icon id="fa-search" margin="5px 2px 0 0" size="18px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	margin-bottom: 60px;
	display: flex;
	position: relative;

	& > div {
		position: absolute;
		right: 7px;
	}

	& input {
		padding: 10px 33px 10px 10px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
