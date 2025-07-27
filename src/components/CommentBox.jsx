import { useState } from "react";
import { Link } from "react-router-dom";
import { HandleSendComment } from "../utilities/handleSendComment";
import { useAddNewCommentMutation } from "../services/Server";

export const CommentBox = ({ data }) => {
  const [isloggedin, setloggedin] = useState(
    localStorage.getItem("isLoggedin")
  );
  const [text, setText] = useState("");
  const [AddComment] = useAddNewCommentMutation();
  return (
    <div className="flex flex-col justify-center items-center gap-1">
      <div>
        <textarea
          className="bg-white p-1.5 outline-2 outline-neutral-700 rounded-sm text-sm w-64 sm:w-[430px] h-24 sm:h-[120px] resize-none"
          placeholder="write your comment ..."
          name="comment"
          id="comment"
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
        ></textarea>
      </div>
      <div>
        {isloggedin ? (
          <button
            onClick={() => {
              HandleSendComment({ text, AddComment, data });
            }}
            className="rounded-md bg-neutral-800 py-1.5 shadow-sm/50 px-5 font-semibold text-white cursor-pointer"
          >
            send
          </button>
        ) : (
          <button className="rounded-md bg-neutral-800 py-1.5 shadow-sm/50 px-5 font-semibold text-white cursor-pointer">
            <Link to={"/login"}>login</Link>
          </button>
        )}
      </div>
    </div>
  );
};
