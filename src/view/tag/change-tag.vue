<template>
  <div>
    <div>
      <change-tag/>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
import ChangeTag from '_c/tag/change-tag.vue'
export default {
  name: 'ChangeTagPage',
  data () {
    return {
      tagList: []
    }
  },
  components: {
    ChangeTag
  },
  mounted () {
    this.tagList = this.$store.state.app.tagList
  }
}
</script>
