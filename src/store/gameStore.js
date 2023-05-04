import { create } from "zustand";

const gameStore = create((set) => ({
    ifGame: false,
    setIfGame: (newGame) => set({ ifGame: newGame }),

    selectedGame: "",
    setSelecteGame: (NewSelectedGame) => set({ selectedGame: NewSelectedGame }),

    buttonClicked: false,
    setbuttonClicked: (NewbuttonClicked) => set({ buttonClicked: NewbuttonClicked }),

    showEmojiPicker: false,
    setShowEmojiPicker: (newPicker) => set({ showEmojiPicker: newPicker })
}))

export default gameStore