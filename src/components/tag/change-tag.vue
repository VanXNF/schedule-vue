<template>
  <div>
    <div>
        <Form ref="formItem" :model="formItem" :rules="ruleInline" :label-width="30">
          <FormItem prop="tagName">
            <Input v-model="formItem.tagName" style="width: auto;" maxlength="10" show-word-limit="10"/>
            <Button type="primary" @click="ok('formItem')">新建标签</Button>
          </FormItem>
        </Form>
      <div>
        <div class="ivu-tag-div1">
          <div v-for="(item, i) in changeTag" :key="i">
            <div v-if="item.is_show" class="ivu-tag-div2">
              <Icon type="md-pricetag" />
              <span>{{item.tag_title}}</span>
              <Button  type="primary" size="small" @click="handleChange(item)" >修改</Button>
              <Button  type="error" size="small" @click="deleteItem(i)" >删除</Button>
            </div>
            <div v-if="!item.is_show" class="ivu-tag-div2" >
              <Input v-model="item.tag_title" style="width: auto;"/>
              <Button type="primary" @click="handleChangeTag(i)" style="margin-right: 10px;" >确定</Button>
              <Button type="primary" @click="handleCandle(i)" >返回</Button>

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
                    this.$router.push({
                      name: 'home'
                    })
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
              this.$router.push({
                name: 'home'
              })
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
    this.tagList = this.$store.state.schedule.tagList
    for (let i = 0; i < this.tagList.length; i++) {
      let o = { tag_id: this.tagList[i].tag_id, tag_title: this.tagList[i].tag_title, is_show: true, index: i }
      this.changeTag.push(o)
    }
  }

}
</script>
<style lang="less" >

</style>
