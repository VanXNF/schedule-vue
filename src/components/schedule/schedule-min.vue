<template>
  <div class="ivu-sch-min">
    <template>
    <Card class="ivu-sch-min-card" :to="{name: 'change_schedule', params: {Schedule: pinSchedule}}">
      <p slot="title">
        <Icon type="md-calendar"></Icon>
          {{pinSchedule.schedule_name}}
        </p>
      <Progress :percent="90" :stroke-color="pinSchedule.bar_color" />
    </Card>
    </template>
  </div>
</template>
<script>
import './schedule-min.less'
export default {
  name: 'ScheduleMin',
  props: {
    pinSchedule: ''
  },
  data () {
    return {
      options: {
        pathColors: ['white', 'rgb(90, 146, 173)']
      }
    }
  },
  computed: {
    percentValue () {
      // return Math.ceil(
      //   (parseInt(pinSchedule.cur_point)  - parseInt(pinSchedule.start_point )) / (parseInt(pinSchedule.end_point) - parseInt(pinSchedule.start_point ))) * 100
    // return Math.ceil(
    //   ((parseInt(pinSchedule.cur_point)) - (parseInt(pinSchedule.start_point))) / ((parseInt(pinSchedule.end_point)) - (parseInt(pinSchedule.start_point)))
    // ) * 100
      return 90
    }
  }
}
</script>
<style lang="less">

</style>
