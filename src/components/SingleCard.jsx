import './SingleCard.css'

export default function SingleCard({ card, handleChoice, cardFlipped, disabled }) {    // destructure card and handleChoice props from App

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card);
        }
    }

    return (
        <div className="card">
            <div className={cardFlipped ? "flipped" : ""}>
                <img className="front" src={card.src} alt="Card front" />
                <img
                    className="back"
                    src="https://i.pinimg.com/564x/ce/3e/35/ce3e3551f956e9e1e81bf447462e0ee3.jpg"
                    onClick={handleClick}
                    alt="Card back"
                />
            </div>
        </div>
    )
}
