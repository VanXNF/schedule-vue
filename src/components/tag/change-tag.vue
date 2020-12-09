<template>
  <div>
    <div>
        <Form ref="formItem" :model="formItem" :rules="ruleInline" :label-width="30">
          <FormItem prop="tagName">
            <Input v-model="formItem.tagName" style="width: auto;"/>
            <Button type="text" @click="ok('formItem')">新建标签</Button>
          </FormItem>
        </Form>
      <div>
        <div>
          <div v-for="(item, i) in changeTag" :key="i">
            <div v-if="item.is_show">
              <Icon type="md-pricetag" />
              <span>{{item.tag_title}}</span>
              <Button icon="md-create" type="text" size="small" @click="handleChange(item)" ></Button>
              <Button icon="md-backspace" type="text" size="small" @click="deleteItem(i)" ></Button>
            </div>
            <div v-if="!item.is_show" >
              <Input v-model="item.tag_title" style="width: auto;"/>
              <Button type="primary" @click="handleChangeTag(i)" size="large" >确定</Button>
              <Button type="primary" @click="handleCandle(i)" size="large" >返回</Button>

              <!-- <Icon type="md-return-left" /> -->
            </div>
          </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import { addTag, deleteTag, getData, changeTag } from '@/api/data'
export default {
  name: 'ChangeTag',
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
      ],
      changeTag: [],
      showList: []
    }
  },
  methods: {
    ok (name) {
      this.$refs[name].validate(
        vali => {
          if (vali) {
            addTag({
              user_id: this.$store.state.user.userId,
              tag_title: this.formItem.tagName
            })
              .then(
                res => getData(res)
              )
              .then(
                res => {
                  if (res.code === 'OK') {
                    this.$Message.success(res.message)
                    this.$router.go(-1)
                  }
                }
              )
          } else {
            this.$Message.error('标签名不能为空')
          }
        }
      )
    },
    cancel () {
    },
    okkk () {

    },
    handleChange (it) {
      this.changeTag[it.index].is_show = false
    },
    handleChangeTag (index) {
    // 验证
      this.changeTag[index].is_show = true
      changeTag({
        user_id: this.$store.state.user.userId,
        tag_id: this.changeTag[index].tag_id,
        tag_title: this.changeTag[index].tag_title
      }).then(
        res => getData(res)
      )
        .then(
          res => {
            if (res.code === 'OK') {
              this.$Message.success(res.message)
            }
          }
        )
    },
    deleteItem (it) {
      console.log(this.changeTag)
      deleteTag({
        user_id: this.$store.state.user.userId,
        tag_id: this.changeTag[it].tag_id
      })
        .then(
          res => getData(res)
        )
        .then(
          res => {
            if (res.code === 'OK') {
              this.$Message.success(res.message)
            }
          }
        )
      this.tagList.splice(it, 1)
      this.changeTag.splice(it, 1)
    },
    handleCandle (i) {
      this.changeTag[i].tag_title = this.tagList[i].tag_title
      this.changeTag[i].is_show = true
    }
  },
  mounted () {
    this.tagList = this.$store.state.app.tagList
    for (let i = 0; i < this.tagList.length; i++) {
      let o = { tag_id: this.tagList[i].tag_id, tag_title: this.tagList[i].tag_title, is_show: true, index: i }
      this.changeTag.push(o)
    }
  }

}
</script>
<style lang="less" >

</style>
