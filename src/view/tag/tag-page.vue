<template>
  <div>
    <div>
      <Button type="primary" @click="modal = true" :to="{name: 'change_tag'}">修改标签</Button>
    </div>
    <div>
    <Tabs :value="0" >
        <TabPane v-for="(item, i) in tagList" :key="i" :label="item.tag_title" :name="i">
          <note-pin :pin-list="noteListByTag[item.tag_id]"/>
        </TabPane>
    </Tabs>
    </div>
  </div>
</template>
<script>
import ChangeTag from '_c/tag/change-tag.vue'
import NotePin from '../../components/note/note-pin.vue'
// import { getNoteListByTagId, getData } from '@/api/data'
export default {
  name: 'TagPage',
  data () {
    return {
      tagList: [],
      noteListByTag: {}
    }
  },
  components: {
    ChangeTag,
    NotePin
  },
  mounted () {
    this.tagList = this.$store.state.app.tagList
    this.noteListByTag = {}
    for (let i = 0; i < this.tagList.length; i++) {
      const e = this.tagList[i]
      this.noteListByTag[e.tag_id] = []
      // getNoteListByTagId({
      //   user_id: this.$store.state.user.userId,
      //   tag_id: e.tag_id,
      //   status_flag: ''
      // })
      //   .then(
      //     res => getData(res)
      //   )
      //   .then(
      //     res => {
      //       if (res.code === 'OK') {
      //         this.noteListByTag[e.tag_title] = res.data
      //       }
      //     }
      //   )
    }
    // noteListByTag = {tag_1: pinlist}
    for (let i = 0; i < this.$store.state.app.noteList.length; i++) {
      const e = this.$store.state.app.noteList[i]
      this.noteListByTag[e.tag_id].push(e)
    }
  }
}
</script>
