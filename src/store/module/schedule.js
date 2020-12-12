/* eslint-disable camelcase */
import { getScheduleList, getData, getNoteList, getTagList, getScheduleItem } from '@/api/data'
import { deleteListItem, changeListItem } from '@/libs/util'
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
    // 请求后台，获取list，并设置
    setScheduleList (state, list) {
      state.scheduleList = list
    },
    setPinScheduleList (state, list) {
      state.pinScheduleList = list
    },
    setTagList (state, list) {
      state.tagList = list
    },

    // add
    addScheduleListItem (state, item) {
      state.scheduleList.push(item)
    },
    addPinScheduleListItem (state, item) {
      state.pinScheduleList.push(item)
    },
    // change
    changeScheduleListItem (state, { oldItem, newItem }) {
      changeListItem(state.scheduleList, { oldItem, newItem })
    },
    changePinScheduleListItem (state, { oldItem, newItem }) {
      changeListItem(state.pinScheduleList, { oldItem, newItem })
    },
    // 删除
    deleteScheduleListItem (state, item) {
      deleteListItem(state.scheduleList, item)
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
    },
    getScheduleItem ({ commit }, data) {
      return new Promise((resolve, reject) => {
        getScheduleItem(data)
          .then(res => {
            const data = res.data
            commit('addScheduleListItem', data.data)
            if (data.data.pin_flag === 'true') {
              commit('addPinScheduleListItem', data.data)
            }
            resolve()
          }).catch(err => {
            reject(err)
          })
      })
    },
    changeScheduleItem ({ commit }, { data, oldItem }) {
      return new Promise((resolve, reject) => {
        getScheduleItem(data)
          .then(res => {
            const data = res.data
            commit('changeScheduleListItem', { oldItem, newItem: data.data })
            // if (data.data.pin_flag === 'true') {
            //   commit('changePinScheduleListItem', { oldItem, newItem: data.data })
            // }
            resolve()
          }).catch(err => {
            reject(err)
          })
      })
    }
  }
}
