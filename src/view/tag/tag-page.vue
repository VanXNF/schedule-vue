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
import { mapActions } from 'vuex'
// import { getNoteListByTagId, getData } from '@/api/data'
export default {
  name: 'TagPage',
  data () {
    return {

    }
  },
  methods: {
    ...mapActions([
      'getTagList'
    ])
  },
  components: {
    ChangeTag,
    NotePin
  },
  mounted () {
    this.getTagList(this.$store.state.user.userId)
  },
  computed: {
    tagList () {
      return this.$store.state.schedule.tagList
    },
    noteListByTag () {
      let noteListByTag = {}
      for (let i = 0; i < this.tagList.length; i++) {
        const e = this.tagList[i]
        noteListByTag[e.tag_id] = []
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
      for (let j = 0; j < this.$store.state.schedule.noteList.length; j++) {
        const ee = this.$store.state.schedule.noteList[j]
        if (ee.tag_id) {
          noteListByTag[ee.tag_id].push(ee)
        }
      }
      return noteListByTag
    }
  }
}
</script>
