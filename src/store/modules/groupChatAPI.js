import request from "../../Request/request"

const state = {
  }
  
  const mutations = {
  }
  
  const actions = {
    dataUserCurrent({commit}, data) {
      commit('DATA_USER_CURRENT', data)
    },
    login({ commit }, data)  {
        return new Promise ((resolve, reject) => {
            return request ({
                url: `/login`,
                method: 'post',
                data
            }).then( res => resolve(res))
            .catch( error => reject(error))
        })
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  
  