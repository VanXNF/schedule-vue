<template>
  <div>
    <div>
      <div>
        <p>
          回收日程
        </p>
        <div>
          <schedule-pin :pin-list="scheduleList" :is_recycle="true"/>
        </div>
      </div>
      <Divider></Divider>
      <div>
        <p>
          回收记事
        </p>
        <div>
          <note-pin :pin-list="noteList" :is_recycle="true"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NotePin from '../../components/note/note-pin.vue'
import schedulePin from '../../components/schedule/schedule-pin.vue'
import { getScheduleList, getData, getNoteList } from '@/api/data'
export default {
  components: { schedulePin, NotePin },
  name: 'RecycleBbinPage',
  data () {
    return {
      scheduleList: [],
      noteList: []
    }
  },
  mounted () {
    getScheduleList({
      user_id: this.$store.state.user.userId,
      status_flag: 'delete'
    })
      .then(
        res => getData(res)
      )
      .then(
        res => {
          if (res.code === 'OK') {
            this.scheduleList = res.data
          }
        })

    getNoteList({
      user_id: this.$store.state.user.userId,
      tag_id: 0,
      status_flag: 'delete'
    })
      .then(
        res => getData(res)
      )
      .then(
        res => {
          if (res.code === 'OK') {
            this.noteList = res.data
          }
        })
  }
}
</script>
