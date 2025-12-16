import styled from 'styled-components';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useRef, useState } from 'react';
import { sanitizeContent } from '../../../../utils';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../../../../action';
import { useNavigate } from 'react-router-dom';
import { useServerRequest } from '../../../../hooks';
import { PROP_TYPE } from '../../../../constants';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl ?? '');
	const [titleValue, setTitleValue] = useState(title ?? '');
	const contentRef = useRef(null);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onSavePost = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => {
			navigate(`/post/${id}`);
		});
	};

	const onImageUrlValue = ({ target }) => setImageUrlValue(target.value);
	const onTitleValue = ({ target }) => setTitleValue(target.value);

	return (
		<div className={className}>
			<Input
				value={imageUrlValue}
				onChange={onImageUrlValue}
				placeholder="Изображение..."
			/>
			<Input
				value={titleValue}
				onChange={onTitleValue}
				placeholder="Заголовок..."
			/>
			<SpecialPanel
				id={id}
				publishedAt={publishedAt}
				iconButton={
					<Icon
						id="fa-floppy-o"
						margin="0 0 0 10px"
						onClick={onSavePost}
					/>
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& .post-text {
		text-align: left;
		font-size: 18px;
		white-space: pre-line;
		border: 1px solid grey;
		border-radius: 5px;
		min-height: 200px;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
