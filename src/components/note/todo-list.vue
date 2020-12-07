<template>
  <div>
    <div>
      <ul>
        <p v-for="(item, i ) in todoList" :key="i" class="ivu-c-note-card-li">
          <!-- <Checkbox v-model="single"/> -->
          <Icon type="ios-square-outline" />
          <span>{{item}}</span>
          <Button  :disabled="is_disabled" type="text" icon="md-close" @click="removeTodo(item)" size="small"></Button>
        </p>
      </ul>
      <div>
        <p>清单</p>
        <Button  :disabled="is_pick" type="text" icon="md-add" @click="modal = true" size="small"></Button>
      </div>

      <Modal
        v-model="modal"
        title="新建todo"
        @on-ok="ok('formItem')"
        @on-cancel="cancel">
        <Form ref="formItem" :model="formItem" :rules="ruleInline" :label-width="80">
          <FormItem prop="todoTitle">
            <Input v-model="formItem.todoTitle"/>
          </FormItem>
        </Form>
      </Modal>
    </div>
  </div>
</template>
<script>

export default {
  name: 'TodoList',
  props: {
    is_pick: false,
    todoItems: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      is_disabled: false,
      is_show: true,
      todoList: [],
      modal: false,
      formItem: {
        todoTitle: ''
      },
      ruleInline: {
        todoTitle: [
          { required: true, message: 'Todo不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleAdd () {

    },
    ok (name) {
      this.$refs[name].validate(
        vali => {
          if (vali) {
            // const todo = { index: this.todoList.length, todo: this.formItem.todoTitle }
            // this.todoList.push(todo)
            // // 传递给note card
            // this.$emit('add-todo', todo)
            this.todoList.push(this.formItem.todoTitle)
            this.$emit('add-todo', this.formItem.todoTitle)
            this.formItem.todoTitle = ''
          } else {
            this.$Message.error('Todo内容不能为空')
          }
        }
      )
    },
    cancel () {
      this.formItem.todoTitle = ''
    },
    removeTodo (item) {
      const index = this.todoList.indexOf(item)
      this.todoList.splice(index, 1)
      this.$emit('remove-todo', item)
    }
  },
  mounted () {
    // get todolist
    if (this.is_pick) {
      this.is_disabled = true
      for (let i = 0; i < this.todoItems.length; i++) {
        const e = this.todoItems[i]
        this.todoList.push(e)
      }
    }

    // this.todoList = this.todo_list
  },
  watch: {
    is_pick () {
      this.is_disabled = this.is_pick
    }
  }
}
</script>
<style lang="less" >
.ivu-c-note-card-todolist-btn{
  margin-top: 10px;
  right: 0;
}
</style>
