
const state = {
  dataUserCurrent: "",
  dataGroupChatCurrent: {}
}

const mutations = {
  DATA_USER_CURRENT: (state, data) => {
    state.dataUserCurrent = data
  },
  DATA_GROUP_CHAT_CURRENT: (state, data) => {
    state.dataGroupChatCurrent = data
  }
}

const actions = {
  dataUserCurrent({commit}, data) {
    commit('DATA_USER_CURRENT', data)
  },
  dataGroupChatCurrent({commit}, data) {
    commit('DATA_GROUP_CHAT_CURRENT', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

