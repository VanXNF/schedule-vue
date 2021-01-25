<template>
  <Table :columns="columns" :data="userList">
    <template slot-scope="{ row }" slot="user_id">
      <!-- <Input type="text" v-model="editName" v-if="editIndex === index" /> -->
      <span >{{ row.user_id }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="user_name">
      <Input type="text" v-model="editUserName" v-if="editIndex === index" />
      <span v-else>{{ row.user_name }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="password">
      <Input type="text" v-model="editPassword" v-if="editIndex === index" />
      <span v-else>{{ row.password }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="schedule_num">
      <Input type="text" v-model="editScheduleNum" v-if="editIndex === index" />
      <span v-else>{{ row.schedule_num }}</span>
    </template>
    <template slot-scope="{ row, index }" slot="note_num">
      <Input type="text" v-model="editNoteNum" v-if="editIndex === index" />
      <span v-else>{{ row.note_num }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="action">
      <div v-if="editIndex === index">
        <Button @click="handleSave(index)">确定</Button>
        <Button @click="editIndex = -1">取消</Button>
      </div>
      <div v-else>
        <Button @click="handleEdit(row, index)">修改</Button>
      </div>
    </template>
  </Table>
</template>
<script>
import { changeUser, getData } from '@/api/data'
export default {
  name: 'AdminTable',
  props: {
    userList: []
  },
  data () {
    return {
      columns: [
        {
          title: 'id',
          slot: 'user_id'
        },
        {
          title: '用户名',
          slot: 'user_name'
        },
        {
          title: '密码',
          slot: 'password'
        },
        {
          title: '日程',
          slot: 'schedule_num'
        },
        {
          title: '记事',
          slot: 'note_num'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      editIndex: -1, // 当前聚焦的输入框的行数
      editUserName: '', // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editPassword: '', // 第二列输入框
      editScheduleNum: '', // 第三列输入框
      editNoteNum: '' // 第四列输入框
    }
  },
  methods: {
    handleEdit (row, index) {
      this.editUserName = row.user_name
      this.editPassword = row.password
      this.editScheduleNum = row.schedule_num
      this.editNoteNum = row.note_num
      this.editIndex = index
    },
    handleSave (index) {
      this.userList[index].user_name = this.editUserName
      this.userList[index].password = this.editPassword
      this.userList[index].schedule_num = this.editScheduleNum
      this.userList[index].note_num = this.editNoteNum
      this.editIndex = -1
      changeUser({
        user_id: this.userList[index].user_id,
        user_name: this.editUserName,
        password: this.editPassword,
        schedule_num: this.editScheduleNum,
        note_num: this.editNoteNum
      })
        .then(res => getData(res))
        .then(
          res => {
            if (res.code === 'OK') {
              this.$Message.success(res.message)
            } else {
              this.$Message.error(res.message)
            }
          }
        )
    }
  }
}
</script>
