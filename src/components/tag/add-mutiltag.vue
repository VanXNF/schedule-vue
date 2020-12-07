<template>
  <div>
    <div>
      <Button v-if="is_show" :disabled="is_pick"  size="small" @click="modal = true" icon="md-pricetag" type="text"></Button>
      <Modal
        v-model="modal"
        title="添加标签"
        @on-ok="handleAdd"
        @on-cancel="cancel">
        <Form ref="formItem" :model="formItem" :rules="ruleInline" :label-width="30">
          <FormItem prop="tagName">
            <Input v-model="formItem.tagName" style="width: auto;" />
            <Button type="text" @click="ok('formItem')">新建标签</Button>
          </FormItem>
        </Form>
      <div>
        <ul>
          <p v-for="(item, i ) in tagList" :key="i" class="ivu-c-note-card-li">
            <Checkbox :lable="item.tag_title" v-model="pickTag[i].tag_pick">
            <span>{{item.tag_title}}</span>
            </Checkbox>
          </p>
        </ul>
      </div>
      </Modal>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddTag',
  props: {
    is_pick: false
  },
  data () {
    return {
      pickTag: [],
      modal: false,
      formItem: {
        tagName: ''
      },
      is_show: true,
      ruleInline: {
        tagName: [
          { required: true, message: 'Tag名称不能为空', trigger: 'blur' }
        ]
      },
      tagList: [
      ]
    }
  },
  methods: {
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
    },
    handleAdd () {
      this.$emit('getTags', this.pickTags)
    }
  },
  mounted () {
    this.tagList = this.$store.state.app.tagList
    for (let i = 0; i < this.tagList.length; i++) {
      let o = { tag_title: this.tagList[i].tag_title, tag_pick: false }
      this.pickTag.push(o)
    }
  },
  computed: {
    pickTags () {
      let arr = []
      for (let i = 0; i < this.pickTag.length; i++) {
        if (this.pickTag[i].tag_pick === true) {
          arr.push(this.pickTag[i])
        }
      }
      return arr
    }
  }
}
</script>
<style lang="less" >
.ivu-tag-add-p{
  .ivu-checkbox-group{
    margin: 5px;
  font-size: 15px;
  }

}
</style>
