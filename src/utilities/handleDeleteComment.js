export const HandleDeleteComments = ({ deleteComment, id }) => {
  deleteComment(id);
  window.location.reload();
};
