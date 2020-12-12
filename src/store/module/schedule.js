/* eslint-disable camelcase */
import { getScheduleList, getData, getNoteList, getTagList, getScheduleItem } from '@/api/data'
import { deleteListItem, changeListItem } from '@/libs/util'
export default {
  state: {
    scheduleList: [],
    pinScheduleList: [],
    nopinScheduleList: [],
    deleteScheduleList: [],
    // note
    noteList: [],
    pinNoteList: [],
    // tag
    tagList: []
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
    setNoteList (state, list) {
      state.noteList = list
    },
    setPinNoteList (state, list) {
      state.pinNoteList = list
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
    changeScheduleListItem (state, { oldItem, newItem, type }) {
      const f = changeListItem(state.scheduleList, { oldItem, newItem, type })
      return { f, newItem }
    },
    changePinScheduleListItem (state, { oldItem, newItem, type }) {
      const f = changeListItem(state.pinScheduleList, { oldItem, newItem, type })
      if (newItem.pin_flag === false && f === true) {
        this.deletePinScheduleListItem(state.pinScheduleList, newItem)
      }
    },
    // 删除
    deleteScheduleListItem (state, item) {
      deleteListItem(state.scheduleList, item)
    },
    deletePinScheduleListItem (state, item) {
      deleteListItem(state.pinScheduleList, item)
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
    changeScheduleItem ({ state, commit }, { data, oldItem }) {
      return new Promise((resolve, reject) => {
        getScheduleItem(data)
          .then(res => {
            const data = res.data
            commit('changeScheduleListItem', { oldItem, newItem: data.data, type: 'schedule_id' })
            if (state.scheduleList.map(e => e['schedule_id']).indexOf(oldItem['schedule_id']) !== -1 && data.data.pin_flag === 'true') {
              commit('addPinScheduleListItem', data.data)
            }
            if (data.data.pin_flag === 'true') {
              commit('changePinScheduleListItem', { oldItem, newItem: data.data, type: 'schedule_id' })
            }
            if (state.pinScheduleList.map(e => e['schedule_id']).indexOf(oldItem['schedule_id']) !== -1 && data.data.pin_flag === 'false') {
              commit('deletePinScheduleListItem', data.data)
            }
            resolve()
          }).catch(err => {
            reject(err)
          })
      })
    },
    getNoteList ({ commit }, { user_id, tag_id, status_flag }) {
      return new Promise((resolve, reject) => {
        getNoteList({ user_id, tag_id, status_flag })
          .then(res => {
            const data = res.data
            if (status_flag === '') {
              commit('setNoteList', data.data)
            } else if (status_flag === 'pin') {
              commit('setPinNoteList', data.data)
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
