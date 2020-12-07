<template>
  <div>
    <div>
      <note-card :is_pick="true" :pick-note="note"></note-card>
    </div>
  </div>
</template>
<script>
import NoteCard from '_c/note/note-card.vue'
export default {
  name: 'ChangeNote',
  props: {
    pickNote: {}
  },
  components: {
    NoteCard
  },
  computed: {
    note () {
      return this.$route.params.pickNote
    }
  }
}
</script>
