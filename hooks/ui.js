const { create } = require('zustand')

export const useChatUi = create(set => ({
  isChatUiVisible: false,
  showChat: () => set(state => ({ isChatUiVisible: true })),
  hideChat: () => set(state => ({ isChatUiVisible: false })),
  toggleChat: () => set(state => ({ isChatUiVisible: !state.isChatUiVisible }))
}))
