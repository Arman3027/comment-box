import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { useAddNewUserMutation, useGetUsersQuery } from "../../services/Server";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const Register = () => {
  const navigate = useNavigate();
  const { data: apidata } = useGetUsersQuery();
  const [AddUser] = useAddNewUserMutation();
  const schema = z.object({
    username: z
      .string()
      .min(3, "username should be more than 3 character")
      .max(15, "username is too large"),
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
  async function onSubmitRegister({ data: userdata, apidata: data }) {
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
      toast.info("please login.", {
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
      try {
        await AddUser(userdata);
        navigate("/login");
      } catch (error) {
        console.log(error);
      } finally {
        window.location.reload();
      }
    }
  }

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
      <div className="w-64 sm:w-80 h-fit bg-neutral-800 rounded-xl flex flex-col justify-between items-center">
        <h1 className="text-textColor p-5 text-[24px] sm:text-[26px] font-semibold cursor-default">
          REGISTER
        </h1>
        <form
          onSubmit={handleSubmit((data) => {
            onSubmitRegister({ data, apidata });
          })}
          className="w-full h-full flex flex-col justify-center items-center gap-5 sm:gap-6 py-3 sm:py-4 px-5 sm:px-[30px]"
        >
          <div className="flex flex-col justify-center items-center w-full gap-1">
            <input
              className="w-full  h-8 bg-neutral-900 outline-0 border-0 px-4 text-sm text-textColor rounded-2xl"
              {...register("username")}
              placeholder="username"
              style={{
                border: errors.username ? "2px red solid" : "",
                boxShadow: errors.username
                  ? "0px 0px 3px red"
                  : "0px 0px 7px black",
              }}
            />
            <p className="text-xs sm:text-sm text-red-500 font-medium text-nowrap">
              {errors.username?.message}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center w-full gap-1">
            <input
              className="w-full h-8 bg-neutral-900 outline-0 border-0 px-4 text-sm text-textColor rounded-2xl"
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
              className="w-full h-8 bg-neutral-900 outline-0 border-0 px-4 text-sm text-textColor rounded-2xl shadow-sm/60"
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
            className=" bg-neutral-900 py-1.5 w-full rounded-md font-semibold text-textColor cursor-pointer"
            type="submit"
          >
            Register
          </button>
          <p className="text-sm text-textColor/80 leading-[180%]  cursor-default">
            already have an account ?{" "}
            <Link
              className="underline text-textColor/90  cursor-pointer"
              to={"/login"}
            >
              login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
