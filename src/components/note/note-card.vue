<template>
  <div>
    <div>
      <Card class="ivu-c-note-card">
        <div class="ivu-c-note-card-div11">
        <Form ref="formItem" :model="formItem" :rules="ruleInline" :label-width="80">
          <FormItem prop="noteTitle">
            <Input v-model="formItem.noteTitle" placeholder="请输入记事名称" :disabled="is_disabled" style="width: 250px;" maxlength="20" show-word-limit="20"/>
            <Checkbox
              v-model="note.pin_flag"
              :disabled="is_disabled"
              class="ivu-check-box"
              style="margin-left: 5px;"
        >
        <Icon
                type="md-pricetag"
                class="ivu-check-icon"
                :size="iconSize"
              />
        </Checkbox>
          </FormItem>
        </Form>
        </div>
        <div>
          <todo-list @add-todo="addTodo" @remove-todo="removeTodo" :is_pick="s_todo" :todo-items="todoList"  />
        <!-- v-if="todoListtodoList.length===note.todo_list.length" -->
        </div>
        <div>
          <Input v-model="note.remarks" maxlength="200" show-word-limit type="textarea" class="ivu-c-note-card-remarks" :disabled="is_disabled"/>
        </div>
        <div>
          <div class="ivu-note-card-1">
            <p v-show="is_pick">
              修改时间
            </p>
            <p v-show="is_pick" style="margin-top: 3px">
              {{modifyTime}}
            </p>
          </div>
          <div  class="ivu-note-card-btn">

            <add-tag @getTags="handleAddTag" :tag-id="note.tag_id" :is_disabled="is_disabled" :is_pick="s_todo"></add-tag>
            <!-- <Button icon="md-backspace" type="text" size="small"  v-if="!is_disabled" @click="handleDelete"></Button>
            <Button icon="md-checkmark" type="text" size="small"  v-if="!is_disabled" @click="handleSubmit"></Button>
            <Button icon="md-create" type="text" size="small"  v-if="is_disabled" @click="handleChange" ></Button> -->
            <Button  type="error"  v-if="!is_disabled && is_change" @click="handleDelete">删除</Button>
            <Button  type="primary"  v-if="!is_disabled" @click="handleSubmit('formItem')">确定</Button>
            <Button  type="primary"  v-if="is_disabled" @click="handleChange">修改</Button>

          </div>
          <!-- <div class="ivu-note-card-tag-div-1" >
              <Tag v-for="(item, i) in pickTags" :key="i" :disabled="is_disabled" :name="item" closable @on-close="handleClose">{{item.tag_title}}</Tag>
          </div> -->
          <div class="ivu-note-card-tag-div-1" >
              <Tag v-if="pickTag!==''" :disabled="is_disabled" :name="item" closable @on-close="handleClose">{{pickTag.tag_title}}</Tag>
          </div>
          <Modal
              v-model="modal"
              ok-text="是"
              cancel-text="否"
              @on-ok="handleDelete(true)"
              @on-cancel="handleDelete(false)"
            >
              <p>是否加入回收站</p>
            </Modal>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import TodoList from './todo-list.vue'
import { mapMutations, mapActions } from 'vuex'
import AddTag from '../tag/add-tag.vue'
import { changeNote, getData, toRecycleBinNote, createNote } from '@/api/data'
export default {
  name: 'NoteCard',
  props: {
    pickNote: {},
    is_pick: false
  },
  data () {
    const conTodoList = todoList => {
      var str = ''
      var c = ''
      for (let i = 0; i < todoList.length; i++) {
        const element = todoList[i]
        str += (c + element + ',0')
        c = '#'
      }
      return str
    }

    const getPostData = () => {
      return {
        user_id: this.$store.state.user.userId,
        note_title: this.formItem.noteTitle,
        remarks: this.note.remarks,
        pin_flag: this.note.pin_flag,
        tag_id: this.tagId,
        todo_list: conTodoList(this.todoList)
      }
    }
    const getTagById = (id) => {
      for (let i = 0; i < this.$store.state.schedule.tagList.length; i++) {
        const e = this.$store.state.schedule.tagList[i]
        if (e.tag_id === id) {
          return e
        }
      }
    }

    return {
      getPostData,
      conTodoList,
      getTagById,
      is_disabled: false,
      is_change: false,
      modal: false,
      tagId: 0,
      pickTags: [],
      pickTag: '',
      formItem: {
        noteTitle: ''
      },
      ruleInline: {
        noteTitle: [
          { required: true, message: '记事名称不能为空', trigger: 'blur' }
        ]
      },
      note: {
        note_title: '',
        todo_id: '',
        remarks: '',
        tag_id: '',
        pin_flag: false,
        todo_list: []
      },
      todoList: [],
      s_todo: false
    }
  },
  components: {
    TodoList,
    AddTag
  },
  methods: {
    ...mapMutations([
      'deleteScheduleListItem'
    ]),
    ...mapActions([
      'getNoteItem',
      'changeNoteItem',
      'changeNoteItem'
    ]),
    handleAddTags (tags) {
      this.pickTags = []
      this.pickTags.push(tags)
    },
    handleAddTag (tag) {
      this.pickTag = tag
      this.tagId = tag.tag_id
    },
    // handleClose (event, name) {
    //   const index = this.pickTags.indexOf(name)
    //   this.pickTags.splice(index, 1)
    // },
    handleClose (event, name) {
      this.pickTag = ''
    },
    handleTodo (todoList) {
      this.todoList = todoList
    },
    addTodo (todo) {
      this.todoList.push(todo)
    },
    removeTodo (todo) {
      const index = this.todoList.indexOf(todo)
      this.todoList.splice(index, 1)
    },
    handleSubmit (name) {
      this.$refs[name].validate(
        vali => {
          if (vali) {
            const d = this.getPostData()
            if (!this.is_change) {
              createNote(d)
                .then(
                  res => getData(res)
                ).then(
                  res => {
                    if (res.code === 'OK') {
                      this.getNoteItem({
                        user_id: this.$store.state.user.userId,
                        note_id: res.data
                      })
                      this.$Message.success(res.message)
                      this.$router.push({
                        name: 'note'
                      })
                    } else this.$Message.error(res.message)
                  }
                )
            } else {
              d.note_id = this.note.note_id
              d.delete_flag = true
              d.modify_time = new Date()
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
                      this.$router.push({
                        name: 'note'
                      })
                      // const index = this.$store.state.app.noteList.indexOf(this.note)
                      // this.$store.state.app.noteList.splice(index, 1)
                    } else this.$Message.error(res.message)
                  }
                )
            }
          } else {
            // this.$Message.error('Todo内容不能为空')
          }
        }
      )

      // 先提交todolist
      // 再提交note
    },
    handleDelete () {
      // if (this.is_change) {
      //   const d = this.getPostData()
      //   d.note_id = this.note.note_id
      //   d.delete_flag = true
      //   // 修改回收标记
      //   // 修改和回收标记逻辑有问题
      //   changeNote(d)
      //     .then(res => getData(res))
      //     .then(res => {
      //       const rb = {
      //         user_id: this.$store.state.user.userId,
      //         note_id: this.note.note_id,
      //         recycle_bin: true
      //       }
      //       if (res.code === 'OK') {
      //         if (is) {
      //           toRecycleBinNote(rb)
      //             .then(res => getData(res))
      //             .then(res => {
      //               if (res.code === 'OK') {
      //                 this.$Message.success(res.message)
      //                 this.$router.go(-1)
      //               }
      //             })
      //         } else {
      //           rb.recycle_bin = false
      //           toRecycleBinNote(rb)
      //         }
      //         this.$router.go(-1)
      //       }
      //     })
      // } else {
      //   this.$router.go(-1)
      // }
      const rb = {
        user_id: this.$store.state.user.userId,
        note_id: this.note.note_id,
        delete_flag: true
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
                name: 'note'
              })
            } else {
              this.$Message.error(res.message)
            }
          }
        )
      const index = this.$store.state.app.noteList.indexOf(this.note)
      this.$store.state.app.noteList.splice(index, 1)
    },
    handleChange () {
      this.is_disabled = false
      this.is_change = true
      this.s_todo = false
    }
  },
  mounted () {
    // picknote > note
    if (this.is_pick) {
      this.note = this.pickNote
      this.formItem.noteTitle = this.pickNote.note_title
      this.is_disabled = true
      this.s_todo = true
      // if (this.note.todo_list instanceof Array) {
      //   for (let i = 0; i < this.note.todo_list.length; i++) {
      //     const e = this.note.todo_list[i]
      //     this.todoList.push(e.todo_item_name)
      //   }
      // } else {
      //   const todolist = this.note.todo_list.split('#')
      //   for (let i = 0; i < todolist.length; i++) {
      //     const e = todolist[i]
      //     const ee = e.splice(',')
      //     this.todoList.push(ee[0])
      //   }
      for (let i = 0; i < this.note.todo_list.length; i++) {
        const e = this.note.todo_list[i]
        this.todoList.push(e.todo_item_name)
      }

      this.pickTag = this.getTagById(this.note.tag_id)
      this.tagId = this.note.tag_id
    }
  },
  computed: {
    modifyTime () {
      return new Date(this.note.modify_time).toLocaleString()
    }
  }
}
</script>
<style lang="less">
.ivu-c-note-card{
  width: 400px;
  margin: 0 auto;
  padding-bottom: 40px;
}
.ivu-c-note-card-remarks{
  margin-top: 10px;
  margin-bottom: 10px;
  .ivu-input, .ivu-input-default{
    height: 80px;
  }
}
.ivu-c-note-card-li{
  margin-top: 5px;
}
.ivu-note-card-1,.ivu-note-card-btn{
  float: left;
}
.ivu-note-card-btn{
  position: absolute;
  right: 30px;
}
.ivu-note-card-1{
  font-size: 5px;
}
.ivu-note-card-tag-div-1{
  position: absolute;
  left: 85px;
}
// .ivu-c-note-card-div11{
//   float: left;
// }
</style>
