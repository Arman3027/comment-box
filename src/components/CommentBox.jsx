import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAddNewCommentMutation } from "../services/Server";
import { Loading } from "./Icons/loading";

export const CommentBox = ({ data, refetch }) => {
  const textareaRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isloggedin, setloggedin] = useState(
    localStorage.getItem("isLoggedin")
  );
  const [text, setText] = useState("");
  const [AddComment] = useAddNewCommentMutation();
  async function HandleSendComment() {
    if (textareaRef.current.value == "") {
      return;
    }
    setIsLoading(true);
    textareaRef.current.value = "";
    let username = localStorage.getItem("username");
    let newComment = {
      username: username,
      body: text,
    };
    try {
      await AddComment(newComment);
      await refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div>
        <textarea
          className="bg-neutral-800 p-1.5 outline-2 outline-neutral-900 shadow-md/30 rounded-sm text-textColor text-sm w-64 sm:w-[430px] h-24 sm:h-[120px] resize-none"
          placeholder="write your comment ..."
          name="comment"
          id="comment"
          ref={textareaRef}
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
        ></textarea>
      </div>
      <div>
        {isloggedin ? (
          <button
            onClick={() => {
              HandleSendComment();
            }}
            className="w-20 h-9 rounded-md bg-neutral-800 shadow-md/30 p-1 font-semibold text-textColor cursor-pointer"
          >
            {isLoading ? <Loading size={"100%"} /> : "send"}
          </button>
        ) : (
          <button className="w-20 h-9 rounded-md bg-neutral-800 shadow-md/30 p-1 font-semibold text-textColor cursor-pointer">
            <Link to={"/login"}>login</Link>
          </button>
        )}
      </div>
    </div>
  );
};
