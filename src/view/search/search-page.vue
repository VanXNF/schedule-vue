<template>
  <div>
    <div>
      <div>
        <p>
          日程
        </p>
        <div>
          <schedule-pin :pin-list="scheduleList"/>

        </div>
      </div>
      <Divider></Divider>
      <div>
        <p>
          记事
        </p>
        <div>

          <note-pin :pin-list="noteList"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import notePin from '../../components/note/note-pin.vue'
import SchedulePin from '../../components/schedule/schedule-pin.vue'
export default {
  components: { notePin, SchedulePin },
  name: 'SeachPage',
  data () {
    return {
      searchResult: {},
      scheduleList: [],
      noteList: []
    }
  },
  mounted () {
    this.searchResult = this.$store.state.app.searchResult
    if (this.searchResult['schedule_data']) {
      for (let i = 0; i < this.searchResult['schedule_data'].length; i++) {
        const e = this.searchResult['schedule_data'][i]
        this.scheduleList.push(e)
      }
    }
    if (this.searchResult['note_data']) {
      for (let i = 0; i < this.searchResult['note_data'].length; i++) {
        const e = this.searchResult['note_data'][i]
        this.noteList.push(e)
      }
    }
  }
}
</script>
