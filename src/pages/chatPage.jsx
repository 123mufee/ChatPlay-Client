import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../api/chatRoutes";
import ChatContainer from "../components/chat/ChatContainer";
import Contacts from "../components/chat/Contacts";
import Welcome from "../components/chat/Welcome";
import { chatUrl } from "../api/api";
import Sidebar from "../components/sidebar/sidebar";
import Memory from "./Memory match";
import TicTacToe from "./tictactoe/tictactoe";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { reduxbuttonClicked } from "../components/reduxstore/reducerslice";
import animationStore from "../store/animationStore";


export default function Chat() {
  const { buttonClicked } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [loader, setLoader] = useState(true)
  const { loading } = animationStore();
  const [game, setGame] = useState("");

  const test = {
    _id: localStorage.getItem('chatterId'),
    firstName: localStorage.getItem('chatter'),
    avatrImage: "none"
  }
  // const test = {
  //   _id: "642e3ec90a5b14813a26d4ea",
  //   firstName: "Fathima",
  //   avatrImage: "none"
  // }
  const [initailUser, setInitialUser] = useState(test)

  useEffect(() => {
    const token = { token: localStorage.getItem('userToken') }
    if (!localStorage.getItem('userToken')) {
      navigate("/login");
    }
    else {
      axios.post(`${chatUrl}userData`, token).then((response) => {
        setCurrentUser(response.data.data);
      })
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        axios.get(`${allUsersRoute}/${currentUser._id}`).then((response) => {
          setContacts(response.data);
        });
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    console.log(chat, 'why');
    dispatch(reduxbuttonClicked())
  };

  // useEffect(() => {
  //   const timer = () => {
  //     setTimeout(() => {
  //       setLoader(false)
  //     }, 2000);
  //   }
  //   timer()
  // }, [loading])

  useEffect(() => {
    const game = () => {
      setGame(localStorage.getItem("game"))

    }
    game()
  }, [])
  return (
    <div className="relative z-10 bg-purple-200 opacity-80">
    <Container>
      <Sidebar />

      <MainContent>
        {game === 'tic' && <TicTacToe />}
        {game === 'memory' && <Memory />}

        <ChatContainerWrapper>
          {currentChat === undefined ? (
            // <Welcome />
            <ChatContainer currentChat={initailUser} socket={socket} />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </ChatContainerWrapper>
      </MainContent>
    </Container>
    </div>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  overflow-y: scroll;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ChatContainerWrapper = styled.div`
  flex: 1;
`;

