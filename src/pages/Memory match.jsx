import React, { useState } from "react";
import App from "../components/Memory game/App";
import Level2 from "../components/Memory game/Level2";
import Level3 from "../components/Memory game/Level3";
import Sidebar from "../components/sidebar/sidebar";
import ChatPage from "../pages/chatPage"

export default function Memory() {
  const [difficulty, setDifficulty] = useState("");
  const [buttonColor, setButtonColor] = useState("white");
  const [buttonColor1, setButtonColor1] = useState("white");
  const [buttonColor2, setButtonColor2] = useState("white");


  function Easy() {
    setButtonColor("green");
    setButtonColor1("white");
    setButtonColor2("white");
    setDifficulty("Easy");
  }

  function Medium() {
    setButtonColor("white");
    setButtonColor1("yellow");
    setButtonColor2("white");
    setDifficulty("Medium");
  }

  function Hard() {
    setButtonColor("white");
    setButtonColor1("white");
    setButtonColor2("red");
    setDifficulty("Hard");
  }

  return (
    <>
      <div className="relative z-10 bg-purple-200 opacity-80" style={{ height: '100vh' }}>

        <div className="difficulty flex relative z-30 justify-center" style={{ display: "flex", justifyContent: "center" }}>
          <Sidebar />
          {/* <ChatPage /> */}
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>

              <button class="bg-transparent hover:bg-purple-700 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded" onClick={Easy}>
                Easy
              </button>
              <button class="bg-transparent hover:bg-purple-700 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded" onClick={Medium}>
                Medium
              </button>
              <button class="bg-transparent hover:bg-purple-700 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded" onClick={Hard}>
                Hard
              </button>
            </div>
            {(() => {
              switch (difficulty) {
                case "Easy":
                  return <App />;
                case "Medium":
                  return <Level2 />;
                case "Hard":
                  return <Level3 />;
                default:
                  return null;
              }
            })()}
          </div>
        </div>
        {/* <div style={{wi}}>

      </div> */}
      </div>
    </>
  );
}
