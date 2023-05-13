import { useEffect, useState } from "react";
import Cell from "../Cell/Cell";
import "./Main.css";
import { toast, Toaster } from "react-hot-toast"
import axios from "axios";
import { userUrl } from "../../../api/api";
import LossModal from "../../Memory game/lossModal";
import Modal from "../../Memory game/modal";
import modalStore from "../../../store/modalStore";

const Main = ({ socket, roomCode, setShowModal, setRoomCode, is2Player }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [canPlay, setCanPlay] = useState(true);
  const [isWaiting, setIsWaiting] = useState(false);
  const [player, setPlayer] = useState(true)
  const [roomCodeInput, setRoomCodeInput] = useState(null);
  const [didRoom, setDidRoom] = useState(false)
  const { gameModal, setGameModal, lossModal,setLossModal } = modalStore()


  // socket.on("updateGame", (id) => {
  //   console.log("use Effect", id);
  //   setBoard((data) => ({ ...data, [id]: "O" }));
  //   setIsWaiting(false);
  //   setCanPlay(true);
  // });
  console.log(board, 'boaaard');

  const data = {
    token: localStorage.getItem('userToken')
  }

  useEffect(() => {
    socket.on("updateGame", (id) => {
      console.log("use Effect", id);
      setBoard((data) => ({ ...data, [id]: "O" }));
      setIsWaiting(false);
      setCanPlay(true);
    });

    return () => socket.off("updateGame");
  });

  const handleCellClick = async (e) => {
    if (player) {
      const id = e.currentTarget.id;
      if (canPlay && board[id] == "") {
        setBoard((data) => ({ ...data, [id]: "X" }));
        setIsWaiting(true);
        socket.emit("play", { id, roomCode });
        setCanPlay(false);
      }

      if (
        (board[0] == "X" && board[1] == "X" && board[2] == "X") ||
        (board[3] == "X" && board[4] == "X" && board[5] == "X") ||
        (board[6] == "X" && board[7] == "X" && board[8] == "X") ||
        (board[0] == "X" && board[3] == "X" && board[6] == "X") ||
        (board[1] == "X" && board[4] == "X" && board[7] == "X") ||
        (board[2] == "X" && board[5] == "X" && board[8] == "X") ||
        (board[0] == "X" && board[4] == "X" && board[8] == "X") ||
        (board[2] == "X" && board[4] == "X" && board[6] == "X")
      ) {
        setBoard(["", "", "", "", "", "", "", "", ""]);
        toast.success("Player X wins!");
        setGameModal(true)
        await axios.get(`${userUrl}ticWon/${data.token}`);
      } else if (
        (board[0] == "O" && board[1] == "O" && board[2] == "O") ||
        (board[3] == "O" && board[4] == "O" && board[5] == "O") ||
        (board[6] == "O" && board[7] == "O" && board[8] == "O") ||
        (board[0] == "O" && board[3] == "O" && board[6] == "O") ||
        (board[1] == "O" && board[4] == "O" && board[7] == "O") ||
        (board[2] == "O" && board[5] == "O" && board[8] == "O") ||
        (board[0] == "O" && board[4] == "O" && board[8] == "O") ||
        (board[2] == "O" && board[4] == "O" && board[6] == "O")
      ) {
        setBoard(["", "", "", "", "", "", "", "", ""]);
        toast.success("Player O wins!");
        setLossModal(true)
        await axios.get(`${userUrl}ticLoss/${data.token}`);
      }
    }
  };

  const showModal = () => {
    setShowModal(true);
  };

  const setroom = (e) => {
    e.preventDefault()
    setRoomCode(roomCodeInput);
    setDidRoom(true)
  }


  return (
    <>
      <div className="tic">
        <Toaster />
        {
          gameModal === true && (
            <Modal />
          )
        }
         {
          lossModal === true && (
            <LossModal/>
          )
        }
        <main className="tictactoemain">
          {
            didRoom ? (
              <>
                {
                  is2Player ? (
                    <>
                      <section className="tictactoeeeee">
                        <Cell handleCellClick={handleCellClick} id={"0"} text={board[0]} />
                        <Cell handleCellClick={handleCellClick} id={"1"} text={board[1]} />
                        <Cell handleCellClick={handleCellClick} id={"2"} text={board[2]} />

                        <Cell handleCellClick={handleCellClick} id={"3"} text={board[3]} />
                        <Cell handleCellClick={handleCellClick} id={"4"} text={board[4]} />
                        <Cell handleCellClick={handleCellClick} id={"5"} text={board[5]} />

                        <Cell handleCellClick={handleCellClick} id={"6"} text={board[6]} />
                        <Cell handleCellClick={handleCellClick} id={"7"} text={board[7]} />
                        <Cell handleCellClick={handleCellClick} id={"8"} text={board[8]} />
                      </section>
                      {isWaiting && <div className="waiting-ui">Waiting for Opponent...</div>}
                    </>
                  ) : (
                    <a className="tictactoeeeee">Waiting for other player to join</a>
                  )
                }
              </>
            ) : (
              <><a className="tictactoeeeee text-red-500 ml-500"> Room Code</a><form onSubmit={setroom}>
                <input type="text" onChange={(e) => setRoomCodeInput(e.target.value)}
                  placeholder="Enter Room Code"></input>
              </form></>
            )
          }
        </main>
      </div>
    </>
  );
};

export default Main;
