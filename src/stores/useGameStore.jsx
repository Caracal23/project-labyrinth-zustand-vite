import { create } from "zustand";

const APP_CONSTANT = "etna-martin-app";

export const useGameStore = create((set) => ({
  username: "JohnDoe",
  action: "move", // No other action allowed.
  actions: null,
  coordinates: null,
  count: 0,
  isStarted: false,
  labData: {},
  isLoading: false,

  increment: () => set((state) => ({ count: state.count + 1 })),
  setDirection: (newDirection) => set({ direction: newDirection }),
  setUserName: (newUsername) => set({ username: newUsername }),
  setIsStarted: (newValue) => set({ isStarted: newValue }),
  setLabData: (newLabData) => set({ labData: newLabData }),
  setIsLoading: (newState) => set({ isLoading: newState }),

  startGame: (username) => {
    const uniqueName = username + APP_CONSTANT;
    set({ isLoading: true });
    fetch("https://labyrinth.technigo.io/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({ username: uniqueName }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        set({ labData: data, coordinates: data.coordinates });
        set({ isLoading: false, isStarted: true });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  makeMove: (username, action, direction) => {
    set({ isLoading: true }),
      fetch("https://labyrinth.technigo.io/action", {
        method: "POST", // or 'PUT'
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          username: username + APP_CONSTANT,
          type: action,
          direction: direction,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          set({
            labData: data,
            isLoading: false,
            coordinates: data.coordinates,
            actions: data.actions,
            description: data.description,
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  },
}));
