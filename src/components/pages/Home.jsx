import { Link } from "react-router-dom";
import { useGetCommentsQuery } from "../../services/Server";
import { CommentBox } from "../CommentBox";
import { CommentCard } from "../CommentCard";
import { Loading } from "../Icons/loading";
import { useState } from "react";

export const Home = () => {
  const [isLoggedin, setLoggedin] = useState(
    localStorage.getItem("isLoggedin")
  );
  const { data, error, isLoading, refetch } = useGetCommentsQuery();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedin");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    window.location.reload();
  };

  if (isLoading) {
    return (
      <div className="w-dvw h-dvh bg-bgMain flex justify-center items-center">
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div>error</div>;
  }
  if (data) {
    return (
      <div className="w-full min-h-dvh h-full bg-bgMain flex flex-col items-center gap-5 p-5">
        <div className="w-full flex justify-end items-center">
          {isLoggedin ? (
            <button
              onClick={handleLogout}
              className="rounded-md bg-neutral-800 shadow-md/30 py-1.5 px-4.5 text-lg font-semibold text-textColor cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link to={"/login"}>
              <button className="rounded-md bg-neutral-800 shadow-md/30  py-1.5 px-4.5 text-lg font-semibold text-textColor cursor-pointer">
                Login
              </button>
            </Link>
          )}
        </div>
        {data.map((comment, index) => {
          return (
            <CommentCard
              username={comment.username}
              body={comment.body}
              id={comment.id}
              refetch={refetch}
              key={index}
            />
          );
        })}
        <CommentBox data={data} refetch={refetch} />
      </div>
    );
  }
};
