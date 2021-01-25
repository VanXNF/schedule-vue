import axios from '@/libs/api.request'

const baseUrl = '/api'
const scheduleUrl = baseUrl + '/schedule'
const tagUrl = baseUrl + '/tag'
const noteUrl = baseUrl + '/note'
const todoUrl = baseUrl + '/todo'
const adminUrl = baseUrl + '/admin'

export const changeUser = (d) => {
  return axios.request({
    url: adminUrl + '/user',
    method: 'put',
    data: d
  })
}

export const getUserList = (d) => {
  return axios.request({
    url: adminUrl + '/user/list',
    method: 'get',
    params: d
  })
}

export const restoreNote = (d) => {
  return axios.request({
    url: noteUrl + '/restore',
    method: 'put',
    data: d
  })
}

export const restoreSchedule = (d) => {
  return axios.request({
    url: scheduleUrl + '/restore',
    method: 'put',
    data: d
  })
}

export const getNoteItem = (p) => {
  return axios.request({
    url: noteUrl,
    method: 'get',
    params: p
  })
}

export const getScheduleItem = (p) => {
  return axios.request({
    url: scheduleUrl,
    method: 'get',
    params: p
  })
}

export const changeTag = (d) => {
  return axios.request({
    url: baseUrl + '/tag',
    method: 'put',
    data: d
  })
}

export const getNote = (d) => {
  return axios.request({
    url: noteUrl,
    method: 'get',
    params: d
  })
}

export const getNoteListByTagId = (d) => {
  return axios.request({
    url: noteUrl + '/list',
    method: 'get',
    params: d
  })
}

export const createNote = (d) => {
  return axios.request({
    url: noteUrl,
    method: 'post',
    data: d
  })
}

export const changeTodo = (d) => {
  return axios.request({
    url: todoUrl,
    method: 'put',
    data: d
  })
}

export const toRecycleBinNote = (d) => {
  return axios.request({
    url: noteUrl,
    method: 'delete',
    data: d
  })
}

export const changeNote = (d) => {
  return axios.request({
    url: noteUrl,
    method: 'put',
    data: d
  })
}

export const createTodo = (d) => {
  return axios.request({
    url: todoUrl,
    method: 'post',
    data: d
  })
}

export const deleteTodoItem = (d) => {
  return axios.request({
    url: todoUrl + '/item',
    method: 'delete',
    data: d
  })
}

export const getTodoList = (d) => {
  return axios.request({
    url: todoUrl,
    method: 'get',
    params: d
  })
}

export const getNoteList = (d) => {
  return axios.request({
    url: noteUrl + '/list',
    method: 'get',
    params: d
  })
}

export const changePassword = (d) => {
  return axios.request({
    url: baseUrl + '/user',
    method: 'put',
    data: d
  })
}

export const getSearchResult = (d) => {
  return axios.request({
    url: baseUrl + '/search',
    method: 'get',
    params: d
  })
}

export const deleteTag = (d) => {
  return axios.request({
    url: tagUrl,
    method: 'delete',
    data: d
  })
}

export const addTag = (d) => {
  return axios.request({
    url: tagUrl,
    method: 'post',
    data: d
  })
}

export const toRecycleBin = (d) => {
  return axios.request({
    url: scheduleUrl,
    method: 'delete',
    data: d
  })
}

export const changeSchdule = (d) => {
  return axios.request({
    url: scheduleUrl,
    method: 'put',
    data: d
  })
}

// export const tosignup = (d) => {
//   console.log(data)
//   return axios.request({
//     url: baseUrl + '/user/register',
//     data: d,
//     method: 'post'
//   })
// }

export const getTagList = (d) => {
  return axios.request({
    url: tagUrl + '/list',
    method: 'get',
    params: d
  })
}

export const getPinScheduleList = (p) => {
  return axios.request({
    url: scheduleUrl + '/list',
    method: 'get',
    params: p
  })
}

export const getScheduleList = (p) => {
  return axios.request({
    url: scheduleUrl + '/list',
    method: 'get',
    params: p
  })
}

export const createSchdule = (d) => {
  return axios.request({
    url: scheduleUrl,
    method: 'post',
    data: d
  })
}

export const getData = data => {
  return data.data
}

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}
