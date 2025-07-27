import { Bounce, toast } from "react-toastify";

export const onSubmitLogin = ({ data: userdata, apidata: data, navigate }) => {
  let UserID = null;
  let userName = "";
  let password = "";
  data.map((user) => {
    if (user.email == userdata.email) {
      UserID = user.id;
      userName = user.username;
      password = user.password;
    }
  });
  if (UserID == null) {
    toast.warn("email is not registered", {
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
  } else if (password != userdata.password) {
    toast.warn("the password is incorrect", {
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
  } else {
    toast.success("Login successful.", {
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
      localStorage.setItem("isLoggedin", "True");
      localStorage.setItem("username", userName);
      localStorage.setItem("id", UserID);
      navigate("/");
      window.location.reload();
    }, 2000);
  }
};
