<template>
  <div>
    <div>
      <note-card></note-card>
    </div>
  </div>
</template>
<script>
import NoteCard from '_c/note/note-card.vue'
export default {
  name: 'CreateNote',
  components: {
    NoteCard
  }
}
</script>
