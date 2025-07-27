export const HandleSendComment = ({ text, AddComment, data }) => {
  let username = localStorage.getItem("username");
  console.log(data);
  let newComment = {
    id: String(data.length + 1),
    username: username,
    body: text,
  };
  AddComment(newComment);
};
