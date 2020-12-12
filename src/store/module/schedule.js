/* eslint-disable camelcase */
import { getScheduleList, getData, getNoteList, getTagList } from '@/api/data'
import { deleteListItem } from '@/libs/util'
export default {
  state: {
    scheduleList: [],
    pinScheduleList: [],
    nopinScheduleList: [],
    deleteScheduleList: []
  },
  getters: {

  },
  mutations: {
    // 请求后台，并设置
    setScheduleList (state, list) {
      state.scheduleList = list
    },
    setPinScheduleList (state, list) {
      state.pinScheduleList = list
    },
    setTagList (state, list) {
      state.tagList = list
    },

    // 删除
    deleteScheduleListItem (state, item) {
      deleteListItem(state.scheduleList)
    }
  },
  actions: {
    getScheduleList ({ commit }, { user_id, status_flag }) {
      return new Promise((resolve, reject) => {
        getScheduleList({ user_id, status_flag })
          .then(res => {
            const data = res.data
            if (status_flag === '') {
              commit('setScheduleList', data.data)
            } else if (status_flag === 'pin') {
              commit('setPinScheduleList', data.data)
            } else if (status_flag === 'nopin') {

            } else if (status_flag === 'delete') {

            }
            resolve()
          }).catch(err => {
            reject(err)
          })
      })
    }
  }
}
