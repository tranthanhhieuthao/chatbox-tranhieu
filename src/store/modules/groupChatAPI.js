
import request from "../../Request/request"

const state = {
  }

  const mutations = {
  }

  const actions = {
      // eslint-disable-next-line no-empty-pattern
    login({},data)  {
        return new Promise ((resolve, reject) => {
            return request ({
                url: `/login`,
                method: 'post',
                data
            }).then( res => resolve(res))
            .catch( error => reject(error))
        })
    },
      // eslint-disable-next-line no-empty-pattern
    register({},data) {
      return new Promise ((resolve, reject) => {
        return request ({
          url: 'register',
          method: 'post',
          data
        }).then( res => resolve(res))
        .catch(er => reject(er))
      })
    },
      // eslint-disable-next-line no-empty-pattern
      createGroup({}, data) {
          return new Promise ((resolve, reject) => {
              return request ({
                  url: 'createGroup',
                  method: 'post',
                  data
              }).then( res => resolve(res))
                  .catch(er => reject(er))
          })
      },
      // eslint-disable-next-line no-empty-pattern
      groupsUser({}, username) {
          return new Promise ((resolve, reject) => {
              return request ({
                  url: `groups?username=${username}`,
                  method: 'get'
              }).then( res => resolve(res))
                  .catch(er => reject(er))
          })
      },
      // eslint-disable-next-line no-empty-pattern
      addUserIntoGroup({}, username) {
          return new Promise ((resolve, reject) => {
              return request ({
                  url: `groups?username=${username}`,
                  method: 'get'
              }).then( res => resolve(res))
                  .catch(er => reject(er))
          })
      },
      // eslint-disable-next-line no-empty-pattern
      usersInGroup({}, id) {
          return new Promise ((resolve, reject) => {
              return request ({
                  url: `usersInGroup?idGroup=${id}`,
                  method: 'get'
              }).then( res => resolve(res))
                  .catch(er => reject(er))
          })
      },
      // eslint-disable-next-line no-empty-pattern
      findUser({}, data) {
          return new Promise ((resolve, reject) => {
              return request ({
                  url: `searchUser?username=${data.username}&page=${data.page}&size=${data.size}`,
                  method: 'get'
              }).then( res => resolve(res))
                  .catch(er => reject(er))
          })
      },
      // eslint-disable-next-line no-empty-pattern
      commentsUser({}, data) {
        return new Promise ((resolve, reject) => {
            return request ({
                url: `comments?idGroup=${data.idGroup}&page=${data.page}&size=${data.size}`,
                method: 'get'
            }).then( res => resolve(res))
                .catch(er => reject(er))
        })
    }
  }

  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
