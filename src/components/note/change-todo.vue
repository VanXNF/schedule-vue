<template>
  <div>
    <div>
      <ul>
        <p v-for="(item, i ) in noteList" :key="i" class="ivu-c-note-card-li">
          <!-- <Checkbox v-model="single"/> -->
          <Icon type="ios-square-outline" />
          <span>{{item}}</span>
        </p>
      </ul>
      <Button v-if="is_show" type="primary" class="ivu-c-note-card-todolist-btn" @click="modal = true">新建Todo</Button>
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
  name: 'ChangeTodo',

  data () {
    return {
      is_show: true,
      noteList: [],
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
            this.noteList = this.formItem.todoTitle.split('#')
            this.is_show = false
          } else {
            this.$Message.error('Todo内容不能为空')
          }
        }
      )
    },
    cancel () {
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
