export const HandleSendComment = ({ text, AddComment, data }) => {
  let username = localStorage.getItem("username");
  let newComment = {
    id: String(data.length + 1),
    username: username,
    body: text,
  };
  AddComment(newComment).then(() => {
    window.location.reload();
  });
};
