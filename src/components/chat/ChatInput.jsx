import React, { useState } from "react";
import { FaGamepad } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
import Slider from "../chat/slider";
import gameStore from "../../store/gameStore";
import { useDispatch, useSelector } from "react-redux";
import { reduxbuttonClicked, reduxifGame, reduxshowEmojiPicker } from "../../components/reduxstore/reducerslice";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();
  const { buttonClicked, showEmojiPicker } = useSelector((state) => state.auth);

  const { ifGame, setbuttonClicked, setShowEmojiPicker } = gameStore();
  const handleEmojiPickerhideShow = () => {
    dispatch(reduxshowEmojiPicker());
    dispatch(reduxbuttonClicked());
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };
  console.log(buttonClicked);

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className="grid items-center grid-cols-[5%,95%] bg-skyblue p-8 md:p-4 md:gap-4">
      <div className="flex items-center text-white gap-4">
        {/* <div className="relative">
          <FaGamepad onClick={handleEmojiPickerhideShow} className="text-yellow-400 text-3xl cursor-pointer" />
          {showEmojiPicker && ifGame === false && (
            <div
              style={{
                height: '450px',
                width: '350px',
                marginTop: '-510px',

              }}
            >

              <Slider />
              <div color="white">

              </div>
            </div>
          )}
        </div> */}
      </div>
      <form className="w-full flex items-center gap-8 bg-white bg-opacity-20 rounded-full" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          className="w-11/12 h-3/5 bg-transparent text-black outline-none text-lg px-4"
        />
        <button type="submit" className="p-2 rounded-full bg-purple-500 flex justify-center items-center">
          <IoMdSend className="text-white text-2xl" />
        </button>
      </form>
    </div>
  );
}
