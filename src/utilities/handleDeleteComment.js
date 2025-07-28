export const HandleDeleteComments = ({ deleteComment, id }) => {
  deleteComment(id).then(() => {
    window.location.reload();
  });
};
