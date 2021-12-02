
const state = {
  dataUserCurrent: "",
  dataGroupChatCurrent: {},
  changeDataGroups: 0,
  checkMissMessage: false,
  roomSendMessage: {}
}

const mutations = {
  DATA_USER_CURRENT: (state, data) => {
    state.dataUserCurrent = data
  },
  DATA_GROUP_CHAT_CURRENT: (state, data) => {
    state.dataGroupChatCurrent = data
  },
  CHANGE_DATA_GROUPS: (state, data) => {
    state.changeDataGroups = data
  },
  CHECK_MISS_MESSAGE: (state, data) => {
    state.checkMissMessage = data
  },
  ROOM_SEND_MESSAGE: (state, data) => {
    state.roomSendMessage = data
  }
}

const actions = {
  dataUserCurrent({ commit }, data) {
    commit('DATA_USER_CURRENT', data)
  },
  dataGroupChatCurrent({ commit }, data) {
    commit('DATA_GROUP_CHAT_CURRENT', data)
  },
  changeDataGroups({ commit }, data) {
    commit('CHANGE_DATA_GROUPS', data)
  },
  checkMissMessage({ commit }, data) {
    commit('CHECK_MISS_MESSAGE', data)
  },
  roomSendMessage({ commit }, data) {
    commit('ROOM_SEND_MESSAGE', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

