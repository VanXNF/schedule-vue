<template>
  <div class="ivu-sch-pin">
    <template v-for="item in pinList">
      <schedule-min :key="item.schedule_id" :pin-schedule="item" :is_recycle="is_recycle"/>
    </template>
  </div>
</template>
<script>
import ScheduleMin from './schedule-min.vue'
export default {
  name: 'SchedulePin',
  props: {
    pinList: {
      type: Array,
      default: () => []
    },
    is_recycle: false
  },
  components: {
    ScheduleMin
  }
}
</script>
