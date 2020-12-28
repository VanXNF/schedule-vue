<template>
  <Table :columns="columns" :data="userList">
    <template slot-scope="{ row }" slot="id">
      <!-- <Input type="text" v-model="editName" v-if="editIndex === index" /> -->
      <span >{{ row.id }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="account">
      <Input type="text" v-model="editAccount" v-if="editIndex === index" />
      <span v-else>{{ row.account }}</span>
    </template>

    <template slot-scope="{ row, index }" slot="key">
      <Input type="text" v-model="editKey" v-if="editIndex === index" />
      <span v-else>{{ row.key }}</span>
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
export default {
  name: 'AdminTable',
  props () {
    return {
      userList: []
    }
  },
  data () {
    return {
      columns: [
        {
          title: 'id',
          slot: 'id'
        },
        {
          title: '用户名',
          slot: 'account'
        },
        {
          title: '密码',
          slot: 'key'
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
      editAccount: '', // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editKey: '', // 第二列输入框
      editScheduleNum: '', // 第三列输入框
      editNoteNum: '' // 第四列输入框
    }
  },
  methods: {
    handleEdit (row, index) {
      this.editAccount = row.account
      this.editKey = row.key
      this.editScheduleNum = row.schedule_num
      this.editNoteNum = row.note_num
      this.editIndex = index
    },
    handleSave (index) {
      this.data[index].account = this.editAccount
      this.data[index].key = this.editKey
      this.data[index].schedule_num = this.editScheduleNum
      this.data[index].note_num = this.editNoteNum
      this.editIndex = -1
    }
  }
}
</script>
