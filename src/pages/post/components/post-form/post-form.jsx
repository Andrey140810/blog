import styled from 'styled-components';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useRef } from 'react';
import { sanitizeContent } from '../../../../utils';
import { useDispatch } from 'react-redux';
import { savePostAsync } from '../../../../action';
import { useNavigate } from 'react-router-dom';
import { useServerRequest } from '../../../../hooks';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const imageRef = useRef(null);
	const titleRef = useRef(null);
	const contentRef = useRef(null);
	const requestServer = useServerRequest();

	const onSavePost = () => {
		const newImageUrl = imageRef.current.value;
		const newTitle = titleRef.current.value;
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: newImageUrl,
				title: newTitle,
				content: newContent,
			}),
		).then(() => {
			navigate(`/post/${id}`);
		});
	};

	return (
		<div className={className}>
			<Input
				ref={imageRef}
				defaultValue={imageUrl}
				placeholder="Изображение..."
			/>
			<Input
				ref={titleRef}
				defaultValue={title}
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
	}
`;
