import Header from "../../components/tictactoe/Header/Header";
import Main from "../../components/tictactoe/Main/Main";
import Footer from "../../components/tictactoe/Footer/Footer";
import JoinRoomModal from "../../components/tictactoe/JoinRoomModal/JoinRoomModal";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:9899/");
// const socket = io.connect("https://chatplay-server4.onrender.com");

const TicTacToe = () => {
  const [showModal, setShowModal] = useState(false);
  const [roomCode, setRoomCode] = useState(null);
  const [is2Player, setIs2Player] = useState(false)

  // The following socket connection is responsible for joining a user to a specified room

  // useEffect(() => {
  //   console.log('Room Code', roomCode);
  //   if (roomCode) {
  //     socket.emit("joinRoom", roomCode);
  //   }
  // }, [roomCode]);

  useEffect(() => {
    console.log('Room Code', roomCode);
    if (roomCode) {
      socket.emit("joinRoom", roomCode);

      // Listen for the "roomStatus" event from the server
      socket.on("roomStatus", (isRoomFull) => {
        console.log("Room Status:", isRoomFull);
        setIs2Player(isRoomFull)
      });
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      socket.off("roomStatus");
    };
  }, [roomCode]);


  // useEffect(()=>{
  //   const test = localStorage.getItem('test')
  //   if(test) {
  //     setRoomCode(test)
  //   }
  // },[])

  return (
    <>
      {/* <JoinRoomModal
        showModal={showModal}
        setShowModal={setShowModal}
        setRoomCode={setRoomCode}
      /> */}
      {/* <Header /> */}
      <Main socket={socket} setRoomCode={setRoomCode}
        roomCode={roomCode} setShowModal={setShowModal} is2Player={is2Player}/>
      {/* <Footer setShowModal={setShowModal} /> */}
    </>
  );
};

export default TicTacToe;