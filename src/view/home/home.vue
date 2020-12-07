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

import SchedulePin from '../../components/schedule/schedule-pin.vue'
import { getScheduleList, getData, getNoteList } from '@/api/data'
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
  mounted () {
    getScheduleList({
      user_id: this.$store.state.user.userId,
      status_flag: ''
    })
      .then(
        res => getData(res)
      )
      .then(
        res => {
          if (res.code === 'OK') {
            this.$store.state.app.scheduleList = res.data
            this.pinScheduleList = getSpecificScheduleOrNote(res.data, 'pin_flag', true)
          }
        }
      )
    getNoteList({
      user_id: this.$store.state.user.userId,
      note_id: 0,
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
            this.pinNoteList = getSpecificScheduleOrNote(res.data, 'pin_flag', true)
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
