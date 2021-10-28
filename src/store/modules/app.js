
const state = {
  dataUserCurrent: {}
}

const mutations = {
  DATA_USER_CURRENT: (state, data) => {
    state.dataUserCurrent = data
  }
}

const actions = {
  dataUserCurrent({commit}, data) {
    commit('DATA_USER_CURRENT', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

