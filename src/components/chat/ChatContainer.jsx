import React, { useState, useEffect, useRef } from "react";
import './chat.css'
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Memory from "../../pages/Memory match";
import { sendMessageRoute, recieveMessageRoute } from "../../api/chatRoutes";
import { chatUrl } from "../../api/api";
import gameStore from "../../store/gameStore";
import Slider from "react-slick";
import TicTacToe from "../../pages/tictactoe/tictactoe";
import ImageSlider from "./slider";
import { useSelector } from "react-redux";
import animationStore from "../../store/animationStore";

export default function ChatContainer({ currentChat, socket }) {
  const { buttonClicked, selectedGame } = useSelector((state) => state.auth)

  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  // const currentUserData 
  const [data, setData] = useState("")
  const { setLoading } = animationStore()


  useEffect(() => {
    const getDetails = () => {
      const token = { token: localStorage.getItem('userToken') }
      axios.post(`${chatUrl}userData`, token).then((response) => {
        setData(response.data.data);
      })
    }
    getDetails()
  }, [])

  useEffect(() => {
    // console.log(data._id, 'data._IDDDDD');
    axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat._id,
    }).then((response) => {
      setMessages(response.data);
    })
  }, [currentChat, data]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        data._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  useEffect(() => {
    const intial = async () => {
      axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      }).then((response) => {
        setMessages(response.data);
        setLoading(false)
      })
    };
    intial();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="grid grid-rows-[10%,1fr,10%] gap-0.1rem overflow-hidden h-screen lg:w-1/2 lg:mx-auto">
      <div className="flex justify-between items-center h-full px-8">
        <div className="flex items-center gap-4 h-full">
          <div className="h-12">
            <img src={`data:image/svg+xml;base64,${currentChat.avatarImage}`} alt="" />
          </div>
          <div className="text-black">
            <h3>{currentChat.firstName}</h3>
          </div>
        </div>
      </div>
  
      <div className="p-4 flex flex-col gap-4 overflow-auto h-full">
        {messages.map((message) => {
          return (
            <div
              key={uuidv4()}
              ref={scrollRef}
              className={`flex items-center justify-${message.fromSelf ? 'end' : 'start'}`}
            >
              <div
                style={{ maxWidth: "40%" }}
                className={`p-4 text-lg rounded-xl text-gray-200 ${
                  message.fromSelf ? "bg-purple-600 self-end" : "bg-purple-800 self-start"
                }`}
              >
                <p>{message.message}</p>
              </div>
            </div>
          );
        })}
      </div>
  
      <Slider className="h-full" />
      <ChatInput handleSendMsg={handleSendMsg} className="h-full" />
    </div>
  );
  ;
}  