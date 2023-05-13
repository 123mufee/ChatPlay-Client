import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from '../SingleCard';
import { toast, Toaster } from "react-hot-toast"
import memoryMatchStore from '../../store/memoryMatch';
import modalStore from '../../store/modalStore';
import Modal from './modal'
import LossModal from "./lossModal"

import axios from 'axios';
import { userUrl } from '../../api/api';
// import Modal from '../posts/modal';
// array of card images
const cardImages = [
  { "src": "https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/helmet-1.png", matched: false },
  { "src": "https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/potion-1.png", matched: false },
  { "src": "https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/ring-1.png", matched: false },
  { "src": "https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/scroll-1.png", matched: false },
  { "src": "https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/shield-1.png", matched: false },
  { "src": "https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/sword-1.png", matched: false }
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  let [complete, setComplete] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [won, setWon] = useState(false)
  const [userData, setUserData] = useState('')
  let [winRate, setWinRate] = useState()
  const [lossRate, setLossRate] = useState()
  // let winRate = 0

  const { gameModal, setGameModal } = modalStore()
  const{lossModal,setLossModal}=modalStore()


  // useEffect(() => {
  //   const container = document.getElementById('myContainer');
  //   container.style.backgroundColor = '#2563EB';
  //   // return () => {
  //   //   container.style.backgroundColor = ''; // cleanup function
  //   // }
  // }, []);

  // shuffle cards, duplicate cards to get set of 12, assign random ID to each
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]      // 2 lots of card images
      .sort(() => Math.random() - 0.5)                        // shuffled array
      .map((card) => ({ ...card, id: Math.random() }))        // add on random ID number to each card

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setComplete(0)
    setDisabled(false)
  }


  const data = {
    token: localStorage.getItem('userToken')
  }

  useEffect(() => {
    // console.log('hi?');
    const getDetails = () => {
      axios.post(`${userUrl}getDetails`, data).then((response) => {
        // console.log(response.data);
        setUserData(response.data.data)
      })
    }
    getDetails()
  }, [])

  useEffect(() => {
    const setStats = () => {
      setTimeout(() => {
        console.log(userData.gameHistory.memoryMatch);
        setWinRate(userData.gameHistory.memoryMatch.won)
        // winRate = userData.gameHistory.memoryMatch.won
        setLossRate(userData.gameHistory.memoryMatch.lost)
      }, 1000);
    }
    setStats()
  }, [userData])

  // handle a user choice, update choice one or two
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)        // if choiceOne is null (is false), update with setChoiceOne, else update choiceTwo with setChoiceTwo
  }
  // useEffect(() => {
  //   const didGameComplete = () => {
  //     if (complete === cards.length / 2 && complete !== 0) {
  //       toast.success("You Won");
  //       // setGameModal(true);
  //       setWon(true)
  //       console.log(winRate, 'before update');
  //       setWinRate(winRate + 1)
  //       console.log(winRate, 'after update');
  //       axios.get(`${userUrl}memoryWon/${winRate}/${data.token}`)
  //     }
  //   }
  //   didGameComplete()
  // }, [complete])

  const didGameComplete = () => {
    if (complete === cards.length / 2 && complete !== 0) {
      // toast.success("You Won");
      setGameModal(true)
      setWon(true);
      setWinRate(prevWinRate => {
        const updatedWinRate = prevWinRate + 1;
        axios.get(`${userUrl}memoryWon/${updatedWinRate}/${data.token}`);
        return updatedWinRate;
      });
    }
  };

  useEffect(() => {
    didGameComplete();
  }, [complete]);

  // useEffect(() => {
  //   if (complete === cards.length / 2 && complete !== 0) {
  //     setWon(!won)
  //   }
  // }, [gameModal])

  // useEffect(() => {
  //   console.log(winRate, 'before update');
  //   winRate++
  //   console.log(winRate, 'after update');
  // }, [disabled])

  // reset game automagically
  useEffect(() => {
    shuffleCards()
  }, [])

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              setComplete(complete + 1);
              return { ...card, matched: true }
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices and increase number of turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    if (turns <= 9) {
      setTurns(prevTurns => prevTurns + 1)
    } else {
      // toast.error("You Failed", {
      //   onClose: () => {
      //     setDisabled(true);
      //     setDisabled(false);
      //   }
      // });
      setLossModal(true)
      setLossRate(prevLossRate => {
        const updatedLossRate = prevLossRate + 1;
        axios.get(`${userUrl}memoryLoss/${updatedLossRate}/${data.token}`);
        return updatedLossRate;
      });
      // setGameModal(true);
      return;
    }
    setDisabled(false);
  }



  return (
    <>

      <Toaster
        toastOptions={{
          className: '',
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
            height: '100px',
            width: "500px",
            backgroundColor: 'pink'
          },
        }} />

      <div className="App">
        {/* <h1>Magic Match</h1>
      <h5>A card memory game</h5> */}
        {/* <button style={{color:'white'}} onClick={shuffleCards}>New Game</button> */}
        <button class="bg-transparent hover:bg-white text-black  font-semibold hover:text-purple-700 py-2 px-4 border border-black hover:border-transparent rounded" onClick={shuffleCards}>
          New Game
        </button>
        <p className='text-black '>Turns: {turns}</p>
        <div className="A1 card-grid">
          {cards.map((card) => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              cardFlipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
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
        {/* <Modal isOpen={isModalOpen} className="modal">
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal> */}

      </div>
    </>
  );
}

export default App;
