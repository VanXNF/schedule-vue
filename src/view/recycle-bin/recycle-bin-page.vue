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
import NotePin from '../../components/note/note-pin.vue'
import schedulePin from '../../components/schedule/schedule-pin.vue'
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
    for (let i = 0; i < this.$store.state.app.scheduleList.length; i++) {
      const e = this.$store.state.app.noteList[i]
      this.scheduleList.push(e)
    }
    for (let i = 0; i < this.$store.state.app.noteList.length; i++) {
      const e = this.$store.state.app.noteList[i]
      this.noteList.push(e)
    }
  }
}
</script>
