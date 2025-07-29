import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useGetUsersQuery } from "../../services/Server";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const { data: apidata } = useGetUsersQuery();
  const schema = z.object({
    email: z.email("please enter your email"),
    password: z
      .string()
      .min(6, "password should be more than 6 character")
      .max(20, "password is too large"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmitLogin = ({ data: userdata, apidata: data }) => {
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
        autoClose: 1000,
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
      }, 1500);
    }
  };

  return (
    <div className="bg-bgMain w-dvw h-dvh flex justify-center items-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="w-64 sm:w-80 h-fit bg-neutral-800 rounded-xl flex flex-col justify-between items-center shadow-md/40">
        <h1 className="text-textColor p-5 text-[24px] sm:text-[26px] font-semibold cursor-default">
          LOGIN
        </h1>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmitLogin({ data, apidata });
          })}
          className="w-full h-full flex flex-col justify-center items-center gap-6 sm:gap-7 py-4 sm:py-5 px-5 sm:px-[30px]"
        >
          <div className="flex flex-col justify-center items-center w-full gap-1">
            <input
              className="w-full h-8 bg-neutral-900 outline-0 border-0 px-4 text-sm text-textColor rounded-2xl "
              {...register("email")}
              placeholder="email"
              style={{
                border: errors.email ? "2px red solid" : "",
                boxShadow: errors.email
                  ? "0px 0px 3px red"
                  : "0px 0px 7px black",
              }}
            />
            <p className="text-xs sm:text-sm text-red-500 font-medium text-nowrap">
              {errors.email?.message}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-full gap-1">
            <input
              className="w-full h-8 bg-neutral-900 outline-0 border-0 px-4 text-sm text-textColor rounded-2xl"
              {...register("password")}
              placeholder="password"
              type="password"
              style={{
                border: errors.password ? "2px red solid" : "",
                boxShadow: errors.password
                  ? "0px 0px 3px red"
                  : "0px 0px 7px black",
              }}
            />
            <p className="text-xs sm:text-sm text-red-500 font-medium text-nowrap">
              {errors.password?.message}
            </p>
          </div>
          <button
            className=" bg-bgMain py-1.5 w-full rounded-md font-semibold text-white cursor-pointer"
            type="submit"
          >
            Login
          </button>
          <p className="text-sm text-textColor/80 leading-[180%] cursor-default">
            don't have an account ?{" "}
            <Link
              className="underline text-textColor/90  cursor-pointer"
              to={"/register"}
            >
              register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
