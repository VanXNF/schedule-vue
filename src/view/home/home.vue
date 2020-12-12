<template>
  <div class="ivu-home">
    <div>
      <p class="ivu-home-title-p">
        schedule
      </p>
    </div>
    <div>
      <schedule-pin :pin-list="pinScheduleList"/>
    </div>
    <Divider/>
    <div>
      <p class="ivu-home-title-p">
        note
      </p>
    </div>
    <div>
      <note-pin :pin-list="pinNoteList"/>
    </div>
  </div>
</template>
<script>

import { mapActions, mapMutations } from 'vuex'
import SchedulePin from '../../components/schedule/schedule-pin.vue'
import { getData, getNoteList, getTagList } from '@/api/data'
import { getSpecificScheduleOrNote } from '@/libs/util'
import NotePin from '../../components/note/note-pin.vue'

export default {
  name: 'home',
  data () {
    return {
      pinScheduleList: [],
      pinNoteList: []
    }
  },
  components: {
    SchedulePin,
    NotePin
  },
  methods: {
    ...mapMutations([
      'setTagList'
    ]),
    ...mapActions([
      'getScheduleList'
    ])
  },
  mounted () {
    this.getScheduleList({
      user_id: this.$store.state.user.userId,
      status_flag: ''
    })
    this.getScheduleList({
      user_id: this.$store.state.user.userId,
      status_flag: 'pin'
    }).then(
      res => {
        this.pinScheduleList = this.$store.state.schedule.pinScheduleList
      }
    )
    getNoteList({
      user_id: this.$store.state.user.userId,
      tag_id: 0,
      status_flag: ''
    })
      .then(
        res => getData(res)
      )
      .then(
        res => {
          if (res.code === 'OK') {
            this.$store.state.app.noteList = res.data
            // fix
            getNoteList({
              user_id: this.$store.state.user.userId,
              tag_id: 0,
              status_flag: 'pin'
            })
              .then(
                res => {
                  this.pinNoteList = res.data
                }
              )
          }
        }
      )
    getTagList({
      user_id: this.$store.state.user.userId
    }).then(
      res => getData(res)
    )
      .then(
        res => {
          if (res.code === 'OK') {
            this.setTagList(res.data)
          }
        }
      )
  }
  // computed: {
  //   updatePinScheduleList() {
  //     this.pinScheduleList = getSpecificScheduleOrNote()
  //   }
  // }
}
</script>
<style lang="less" >
.ivu-home{
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
.ivu-home-title-p{
  font-size: 25px;
}
}

</style>
