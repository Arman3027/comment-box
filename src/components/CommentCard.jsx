import { useState } from "react";
import { useDeleteCommentMutation } from "../services/Server";
import { HandleDeleteComments } from "../utilities/handleDeleteComment";

export const CommentCard = ({ username, body, id }) => {
  const [LogUsername, setLogUsername] = useState(
    localStorage.getItem("username")
  );
  const [deleteComment] = useDeleteCommentMutation();
  return (
    <div className="w-72 sm:w-[500px] min-h-20 sm:min-h-24 flex flex-col gap-2 p-3 overflow-x-hidden bg-white rounded-sm shadow-xl">
      <div className="flex justify-start items-center w-full">
        <h1 className="text-neutral-900 font-bold pl-1 w-full">{username}</h1>
        {LogUsername == username ? (
          <svg
            onClick={() => {
              HandleDeleteComments({ deleteComment, id });
            }}
            className="cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            height="14"
            width="12"
            viewBox="0 0 448 512"
          >
            <path d="M136.7 5.9L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-8.7-26.1C306.9-7.2 294.7-16 280.9-16L167.1-16c-13.8 0-26 8.8-30.4 21.9zM416 144L32 144 53.1 467.1C54.7 492.4 75.7 512 101 512L347 512c25.3 0 46.3-19.6 47.9-44.9L416 144z" />
          </svg>
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
