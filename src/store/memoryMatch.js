import { create } from "zustand";

const memoryMatchStore = create((set)=>({
    cards:[],
    setCards:(newCards)=>set({Cards:newCards}),

    turns:0,
    setTurns:(newTurns)=>set({turns:newTurns}),

    choiceOne:"",
    setChoiceOne:(newChoiceOne)=>set({choiceOne:newChoiceOne}),
 
    choiceTwo:"",
    setChoiceTwo:(newChoiceTwo)=>set({choiceTwo:newChoiceTwo}),

    disabled:"",
    setDisabled:(newdisabled)=>set({disabled:newdisabled}),

    complete:0,
    setComplete:(newcomplete)=>set({complete:newcomplete})
    

}))
export default memoryMatchStore