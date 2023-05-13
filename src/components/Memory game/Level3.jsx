import { useEffect, useState } from 'react';
import './Level3.css';
import SingleCard from '../SingleCard';
import modalStore from '../../store/modalStore';
import Modal from './modal'
import LossModal from "./lossModal"

import axios from 'axios';
import { userUrl } from '../../api/api';

// array of card images
const cardImages = [
    { "src": "https://res.cloudinary.com/dxdwykgvy/image/upload/v1679291622/helmet-1-removebg-preview_yl258t.jpg", matched: false },
    { "src": "https://res.cloudinary.com/dxdwykgvy/image/upload/v1679291636/potion-1-removebg-preview_lob0qt.jpg", matched: false },
    { "src": "https://res.cloudinary.com/dxdwykgvy/image/upload/v1679291660/ring-1-removebg-preview_xkjpoy.jpg", matched: false },
    { "src": "https://res.cloudinary.com/dxdwykgvy/image/upload/v1679291669/scroll-1-removebg-preview_nsp5jv.jpg", matched: false },
    { "src": "https://res.cloudinary.com/dxdwykgvy/image/upload/v1679291787/shield-1-removebg-preview_skemhu.jpg", matched: false },
    { "src": "https://res.cloudinary.com/dxdwykgvy/image/upload/v1679291795/sword-1-removebg-preview_inxfpm.jpg", matched: false },
    { "src": "https://res.cloudinary.com/dxdwykgvy/image/upload/v1679291804/helmet-2-removebg-preview_hmlaov.jpg", matched: false },
    { "src": "https://res.cloudinary.com/dxdwykgvy/image/upload/v1679291811/potion-2-removebg-preview_cpm8nd.jpg", matched: false },
    { "src": "https://res.cloudinary.com/dxdwykgvy/image/upload/v1679291819/ring-2-removebg-preview_tuxzc7.jpg", matched: false },
    { "src": "https://res.cloudinary.com/dxdwykgvy/image/upload/v1679291827/scroll-2-removebg-preview_fxiugd.jpg", matched: false },
    { "src": "https://res.cloudinary.com/dxdwykgvy/image/upload/v1679291836/shield-2-removebg-preview_smy8tg.jpg", matched: false },
    { "src": "https://res.cloudinary.com/dxdwykgvy/image/upload/v1679291846/sword-2-removebg-preview_oszfj7.jpg", matched: false }
  
]

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  let [complete, setComplete] = useState(0)
  const [userData, setUserData] = useState('')
  const { gameModal, setGameModal } = modalStore()
  const{lossModal,setLossModal}=modalStore()



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
    if (turns <= 21) {
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
  //   <div className="App1">
  //     {/* <h1>Magic Match</h1>
  //     <h5>A card memory game</h5> */}
  // <button class="bg-transparent hover:bg-white text-white font-semibold hover:text-purple-700 py-2 px-4 border border-white hover:border-transparent rounded" onClick={shuffleCards}>
  //         New Game
  //       </button>      <p>Turns: {turns}</p>
  //     <div className="card-grid">
  //       {cards.map((card) => (
  //         <SingleCard
  //           key={card.id}
  //           card={card}
  //           handleChoice={handleChoice}
  //           cardFlipped={card === choiceOne || card === choiceTwo || card.matched}
  //           disabled={disabled}
  //         />
  //       ))}
  //     </div>
  //   </div>

  <>

  {/* <Toaster
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
    }} /> */}

  <div className="App2">
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
