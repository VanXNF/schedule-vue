<template>
  <div>
    <div>
      <p class="ivu-sch-title-p">固定记事</p>
      <note-pin :pin-list="pinNoteList"/>

    </div>
        <Divider/>
    <div class="ivu-sch-page-date">
      <p class="ivu-sch-title-p">记事</p>

      <note-pin :pin-list="noteListByDate"/>
    </div>
  </div>
</template>
<script>

import NotePin from '../../components/note/note-pin.vue'
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'NotePage',
  data () {
    return {
    }
  },
  methods: {
    ...mapMutations([

    ]),
    ...mapActions([
      'getNoteList'
    ])
  },
  components: {
    NotePin
  },
  mounted () {
    this.getNoteList({
      user_id: this.$store.state.user.userId,
      tag_id: 0,
      status_flag: ''
    })
  },
  computed: {
    pinNoteList () {
      return this.$store.state.schedule.pinNoteList
    },
    noteListByDate () {
      let obj = JSON.parse(JSON.stringify(this.$store.state.schedule.noteList))
      obj.sort(
        (a, b) => {
          let aa = new Date(a.modify_time)
          let bb = new Date(b.modify_time)
          if (aa < bb) return -1
          if (aa > bb) return 1
          return 0
        }
      )
      return obj
    }
  }
}
</script>
<style lang="less" >
.ivu-sch-min {
  .ivu-sch-min-card{
    background-color: #D3D3D3;
    margin: 0 auto;
    margin-left: 70px;
    margin-top: 15px;
    margin-bottom: 15px;

  }
  float: left;
  width: 250px;
}
.ivu-sch-page-date{
  // background-color: #9ca8b8;
    .ivu-sch-min-card{
    background-color: rgb(223, 214, 215);
  }
  .ivu-sch-min{
    // background-color: #9ca8b8;
  }

}
.ivu-sch-title-p{
  font-size: 25px;
}
</style>
