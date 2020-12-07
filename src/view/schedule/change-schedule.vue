<template>
  <div>
    <div v-if="schedule.point_unit === ' '">
      <schedule-form-time :pick-schedule="schedule" :is_pick="true"/>
    </div>
  <div v-else>
    <schedule-form  :pick-schedule="schedule" :is_pick="true"/>
  </div>
  </div>
</template>
<script>
import ScheduleForm from '../../components/schedule/schedule-form.vue'
import ScheduleFormTime from '../../components/schedule/schedule-form-time.vue'
export default {
  name: 'ChangeSchdule',
  data () {
    return {
      p: ''
    }
  },
  components: {
    ScheduleForm,
    ScheduleFormTime
  },
  mounted () {

  },
  computed: {
    schedule () {
      return this.$route.params.Schedule
    }
  }
}
</script>
