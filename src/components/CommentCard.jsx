import { useState } from "react";
import { useDeleteCommentMutation } from "../services/Server";
import { TrashSvg } from "./TrashSvg";
import { Loading } from "./loading";

export const CommentCard = ({ username, body, id, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [LogUsername, setLogUsername] = useState(
    localStorage.getItem("username")
  );
  const [deleteComment] = useDeleteCommentMutation();

  const HandleDeleteComments = () => {
    setIsLoading(true);
    deleteComment(id)
      .then(() => {
        refetch();
      })
      .then(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-72 sm:w-[500px] min-h-20 sm:min-h-24 flex flex-col gap-2 p-3 overflow-x-hidden bg-white rounded-sm shadow-xl">
      <div className="flex justify-start items-center w-full">
        <h1 className="text-neutral-900 font-bold pl-1 w-full">{username}</h1>
        {LogUsername == username ? (
          <span onClick={HandleDeleteComments}>
            {isLoading ? <Loading size={"17px"} /> : <TrashSvg />}
          </span>
        ) : (
          ""
        )}
      </div>
      <p className="leading-[180%] text-sm sm:text-[16px] text-neutral-800 pl-3">
        {body}
      </p>
    </div>
  );
};
