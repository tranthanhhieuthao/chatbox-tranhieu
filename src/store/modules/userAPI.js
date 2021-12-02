
import request from "../../Request/request"

const state = {
}

const mutations = {
}

const actions = {
    // eslint-disable-next-line no-empty-pattern
    addFriend({ }, data) {
        return new Promise((resolve, reject) => {
            return request({
                url: `/addFriend?userLogin=${data.userLogin}&userFriend=${data.userFriend}`,
                method: 'get'
            }).then(res => resolve(res))
                .catch(error => reject(error))
        })
    },
    // eslint-disable-next-line no-empty-pattern
    friends({ }, data) {
        return new Promise((resolve, reject) => {
            return request({
                url: `/friends?username=${data.username}&page=${data.page}&size=${data.size}`,
                method: 'get'
            }).then(res => resolve(res))
                .catch(error => reject(error))
        })
    },
    // eslint-disable-next-line no-empty-pattern
    searchFriend({ }, data) {
        return new Promise((resolve, reject) => {
            return request({
                url: `/searchFriend?usernameLogin=${data.usernameLogin}&username=${data.username}&page=${data.page}&size=${data.size}`,
                method: 'get'
            }).then(res => resolve(res))
                .catch(error => reject(error))
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
