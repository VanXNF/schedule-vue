<template>
  <div class="ivu-note-min">
    <Card >
      <!-- // todo add tooltips -->
      <p slot="title" >
        <Icon type="ios-list"></Icon>
          <!-- {{noteTitle}} -->
          {{pinNote.note_title}}
      </p>
      <div class="p-div">
        <ul>
         <p v-for="(item, i ) in todoList" :key="i" class="ivu-c-note-card-li">
          <Checkbox v-model="item.is_check" @on-change="handleChange(item)" ></Checkbox>
          <span>{{item.todo_item_name}}</span>
          </p>
        </ul>
      </div>
      <div class="button-div">
        <Button v-if="!is_recycle" type="text" :to="{name: 'change_note', params: {pickNote: pinNote}}" >详情</Button>
        <Button v-if="is_recycle" @click="restore">恢复</Button>
        <Button v-if="is_recycle" @click="deleteR">删除</Button>
      </div>
    </Card>
  </div>
</template>
<script>
import { getData, restoreNote, changeNote, toRecycleBinNote } from '@/api/data'
export default {
  name: 'NoteMin',
  data () {
    return {
      cheack: false
    }
  },
  props: {
    pinNote: '',
    noteId: '',
    is_recycle: false
  },
  methods: {
    handleChange (item) {
      if (item.is_check) {
        const i = this.todoList.indexOf(item)
        // this.todoList.splice(i, 1)
        // const str = ''
        // let c = ''
        // for (let index = 0; index < this.todoList.length; index++) {
        //   const element = this.todoList[index];

        // }
        // deleteTodoItem({
        //   user_id: this.$store.state.user.userId,
        //   note_id: this.noteId,
        //   todo_id: this.pinNote.todo_id,
        //   todo_item_id: this.todoList[i].todo_item_id
        // })
        //   .then(
        //     res => getData(res)
        //   )
        //   .then(
        //     res => {
        //       if (res.code === 'OK') {
        //         this.$Message.success(res.message)
        //         this.todoList.splice(i, 1)
        //       }
        //     }
        //   )
        this.todoList.splice(i, 1)
        const d = {
          user_id: this.$store.state.user.userId,
          note_title: this.pinNote.note_title,
          remarks: this.pinNote.remarks,
          pin_flag: this.pinNote.pin_flag,
          tag_id: this.tagId,
          todo_list: this.conTodoList(this.todoList)
        }
        changeNote(d)
          .then(
            res => getData(res)
          ).then(
            res => {
              if (res.code === 'OK') {
                this.changeNoteItem({
                  data: {
                    user_id: this.$store.state.user.userId,
                    note_id: this.pickNote.note_id
                  },
                  oldItem: this.pickNote })
                this.$Message.success(res.message)
                // const index = this.$store.state.app.noteList.indexOf(this.note)
                // this.$store.state.app.noteList.splice(index, 1)
              } else this.$Message.error(res.message)
            }
          )
      }
    },
    restore () {
      restoreNote({
        user_id: this.$store.state.user.userId,
        note_id: this.pinNote.note_id
      }).then(
        res => getData(res)
      )
        .then(
          res => {
            if (res.code === 'OK') {
              this.$Message.success(res.message)
              this.$router.push({
                name: 'home'
              })
            } else {
              this.$Message.error(res.message)
            }
          }
        )
    },
    deleteR () {
      const rb = {
        user_id: this.$store.state.user.userId,
        note_id: this.pinNote.note_id,
        delete_flag: false
      }
      toRecycleBinNote(rb)
        .then(
          res => getData(res)
        )
        .then(
          res => {
            if (res.code) {
              this.$Message.success(res.message)
              this.deleteScheduleListItem(this.pickSchedule)
              this.$router.push({
                name: 'recycle_bin'
              })
            } else {
              this.$Message.error(res.message)
            }
          }
        )
    },
    mounted () {
    // todo get todo list by id
    // getNote({
    //   user_id: this.$store.state.user.userId,
    //   note_id: this.pinNote.note_id
    // })
    //   .then(
    //     res => getData(res)
    //   )
    //   .then(
    //     res => {
    //       if (res.code === 'OK') {
    //         this.todoList = res.data.todo_list
    //         for (let i = 0; i < this.todoList.length; i++) {
    //           this.todoList[i].is_check = false
    //         }
    //       }
    //     }
    //   )
    // this.todoList = this.pinNote.todo_list
    // for (let i = 0; i < this.todoList.length; i++) {
    //   this.todoList[i].is_check = false
    // }
    },
    computed: {
      todoList () {
        let obj = JSON.parse(JSON.stringify(this.pinNote.todo_list))
        // let obj = this.pinNote.todo_list.split('#')
        for (let i = 0; i < obj.length; i++) {
          obj[i].is_check = false
        }
        return obj
      }
    } }
}
</script>
<style lang="less" >
.ivu-note-min{
  width: 200px;
  height: 200px;
  float: left;
  margin-right: 10px;
  .ivu-card{
    background: yellow;
  }
  .button-div{
    margin-bottom: 5px;
  }
  .p-div{
    margin-bottom: 20px;
  }
  .ivu-c-note-card-li{
    margin-bottom: 10px;
  }
}

</style>
