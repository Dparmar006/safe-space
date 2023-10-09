const { create } = require("zustand");

export const useChatUi = create((set) => ({
  isChatUiVisible: false,
  showChat: () => set((state) => ({ isChatUiVisible: true })),
  hideChat: () => set((state) => ({ isChatUiVisible: false })),
  toggleChat: () =>
    set((state) => ({ isChatUiVisible: !state.isChatUiVisible })),
}));

export const usePostCreateStatus = create((set) => ({
  isCreated: false,
  toggle: () => set((state) => ({ isCreated: !state.isCreated })),
}));
