import { useState } from "react";
import { useDeleteCommentMutation } from "../services/Server";
import { TrashSvg } from "./Icons/TrashSvg";
import { Loading } from "./Icons/loading";

export const CommentCard = ({ username, body, id, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [LogUsername, setLogUsername] = useState(
    localStorage.getItem("username")
  );
  const [deleteComment] = useDeleteCommentMutation();

  async function HandleDeleteComments() {
    setIsLoading(true);
    try {
      await deleteComment(id);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-72 sm:w-[500px] min-h-20 sm:min-h-24 flex flex-col gap-2 p-3 overflow-x-hidden border-1 border-neutral-900 bg-neutral-800 rounded-sm shadow-md/30">
      <div className="flex justify-start items-center w-full">
        <h1 className="text-textColor font-bold pl-1 w-full">{username}</h1>
        {LogUsername == username ? (
          <span onClick={HandleDeleteComments}>
            {isLoading ? <Loading size={"17px"} /> : <TrashSvg />}
          </span>
        ) : (
          ""
        )}
      </div>
      <p className="leading-[180%] text-sm sm:text-[16px] text-textColor pl-3">
        {body}
      </p>
    </div>
  );
};
