
const state = {
  dataUserCurrent: "",
  dataGroupChatCurrent: {},
  changeDataGroups: 0
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
  }
}

const actions = {
  dataUserCurrent({commit}, data) {
    commit('DATA_USER_CURRENT', data)
  },
  dataGroupChatCurrent({commit}, data) {
    commit('DATA_GROUP_CHAT_CURRENT', data)
  },
  changeDataGroups({commit}, data) {
    commit('CHANGE_DATA_GROUPS', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

