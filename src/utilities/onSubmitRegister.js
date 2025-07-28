import { Bounce, toast } from "react-toastify";
export const onSubmitRegister = ({
  data: userdata,
  apidata: data,
  AddUser,
  navigate,
}) => {
  let uniqueUsername = true;
  let uniqueEmail = true;
  data.map((user) => {
    if (user.username == userdata.username) {
      uniqueUsername = false;
    }
    if (user.email == userdata.email) {
      uniqueEmail = false;
    }
  });
  if (!uniqueUsername) {
    toast.warn("Username already used.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
  if (!uniqueEmail) {
    toast.warn("email already used.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
  if (uniqueEmail && uniqueUsername) {
    toast.success("you registered. please login.", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    setTimeout(() => {
      AddUser(userdata);
      navigate("/login");
      window.location.reload();
    }, 2000);
  }
};
