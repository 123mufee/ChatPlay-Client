import { useEffect, useState } from 'react';
import './Level3.css';
import SingleCard from '../SingleCard';

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

  // shuffle cards, duplicate cards to get set of 12, assign random ID to each
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]      // 2 lots of card images
      .sort(() => Math.random() - 0.5)                        // shuffled array
      .map((card) => ({ ...card, id: Math.random() }))        // add on random ID number to each card

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a user choice, update choice one or two
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)        // if choiceOne is null (is false), update with setChoiceOne, else update choiceTwo with setChoiceTwo
  }

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
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  return (
    <div className="App2">
      {/* <h1>Magic Match</h1>
      <h5>A card memory game</h5> */}
  <button class="bg-transparent hover:bg-white text-white font-semibold hover:text-purple-700 py-2 px-4 border border-white hover:border-transparent rounded" onClick={shuffleCards}>
          New Game
        </button>      <p>Turns: {turns}</p>
      <div className="card-grid">
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
    </div>
  );
}

export default App;
