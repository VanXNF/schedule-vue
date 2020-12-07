<template>
  <div>
    <div>
      <Card class="ivu-c-note-card">
        <div>
        <Input placeholder="请输入标题" />
        </div>
        <div>
          <todo-list/>
        </div>
        <div>
          <Input v-model="value17" maxlength="100" show-word-limit type="textarea" class="ivu-c-note-card-remarks" />
        </div>
        <div>
          <div class="ivu-note-card-1">
            <p>
              修改时间
            </p>
            <p style="margin-top: 3px">
              2012-3235
            </p>
          </div>
          <div class="ivu-note-card-btn">

            <add-tag @getTags="handleAddTag"></add-tag>
            <Button icon="md-backspace" type="text" size="small"></Button>
            <Button icon="md-checkmark" type="text" size="small"></Button>
          </div>
          <div class="ivu-note-card-tag-div-1">
              <Tag v-for="(item, i) in pickTags" :key="i" :name="item" closable @on-close="handleClose">{{item.tag_title}}</Tag>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>
<script>
import TodoList from './todo-list.vue'

import AddTag from '../tag/add-tag.vue'
export default {
  name: 'ChangeNote',
  props: {
    is_pick: false,
    pinNote: {}
  },
  data () {
    return {
      modal: false,
      noteList: [
        'adssdsd',
        'ds',
        'fgbv'
      ],
      checkBoxList: [
        false, false, false
      ],
      pickTags: []
    }
  },
  components: {
    TodoList,
    AddTag
  },
  methods: {
    handleAddTag (tags) {
      console.log(tags)
      this.pickTags = tags
    },
    handleClose (event, name) {
      const index = this.pickTags.indexOf(name)
      this.pickTags.splice(index, 1)
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
</style>
