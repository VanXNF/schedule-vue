<template>
  <div class="ivu-sch-min">
    <template>
    <Card class="ivu-sch-min-card" :to="{name: 'change_schedule', params: {Schedule: pinSchedule}}">
      <p slot="title">
        <Icon type="md-calendar"></Icon>
          {{pinSchedule.schedule_name}}
        </p>
      <Progress :percent="percentValue" :stroke-color="pinSchedule.bar_color" />
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
      if (this.pinSchedule.point_unit === ' ') {
        const s = new Date(this.pinSchedule.start_point)
        const c = new Date()
        const e = new Date(this.pinSchedule.end_point)
        const f = Math.floor((e - s) / (24 * 3600 * 1000))
        const ss = Math.floor((c - s) / (24 * 3600 * 1000))
        return Math.floor(ss / f * 100)
      } else {
        const s = parseFloat(this.pinSchedule.cur_point) - parseFloat(this.pinSchedule.start_point)
        const e = parseFloat(this.pinSchedule.end_point) - parseFloat(this.pinSchedule.start_point)
        return Math.floor(s / e * 100)
      }
    }
  }
}
</script>
<style lang="less">

</style>
