import { create } from "zustand";

const userProfileStore = create((set) => ({
  profilePage: "about",
  setUserProfile: (newUserProfile) => set({ profilePage: newUserProfile }),
  // OPTIONS
  // about  : userProfile
  // edit   : editPofile
  // history: viewSnippetHistory
  // peeps  : connection list
}));

export default userProfileStore;
