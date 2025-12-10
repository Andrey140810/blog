import { setPostData } from './set-post-data';

export const removePostAsync = (requestServer, postId) => (dispatch) => {
	requestServer('removePost', postId).then((postData) => {
		dispatch(setPostData(postData.res));
	});
};
