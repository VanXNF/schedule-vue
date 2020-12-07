<template>
  <div class="ivu-note-min">
    <Card >
      <!-- // todo add tooltips -->
      <p slot="title" >
        <Icon type="ios-list"></Icon>
          <!-- {{noteTitle}} -->
          {{pinNote.note_title}}
      </p>
      <div>
        <ul>
         <p v-for="(item, i ) in todoList" :key="i" class="ivu-c-note-card-li">
          <Checkbox v-model="item.is_check" @on-change="handleChange(item)"></Checkbox>
          <span>{{item.todo_item_name}}</span>
          </p>
        </ul>
      </div>
      <div>
        <Button type="text" icon="ios-menu" :to="{name: 'change_note', params: {pickNote: pinNote}}" ></Button>
      </div>
    </Card>
  </div>
</template>
<script>
import { getData, deleteTodoItem } from '@/api/data'
export default {
  name: 'NoteMin',
  data () {
    return {
      cheack: false
    }
  },
  props: {
    pinNote: '',
    todoList: [
    ],
    noteId: ''
  },
  methods: {
    handleChange (item) {
      if (item.is_check) {
        const i = this.todoList.indexOf(item)
        deleteTodoItem({
          user_id: this.$store.state.user.userId,
          note_id: this.noteId,
          todo_id: this.pinNote.todo_id,
          todo_item_id: this.todoList[i].todo_item_id
        }).then(
          res => getData(res)
        )
          .then(
            res => {
              if (res.code === 'OK') {
                this.$Message.success(res.message)
                this.todoList.splice(i, 1)
              }
            }
          )
      }
    }
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
    this.todoList = this.pinNote.todo_list
    for (let i = 0; i < this.todoList.length; i++) {
      this.todoList[i].is_check = false
    }
  }
}
</script>
<style lang="less" >
.ivu-note-min{
  witdh: 500px;
  margin: a auto;
  float: left;
  margin-right: 10px;
  .ivu-card{
    background: yellow;
  }
}

</style>
