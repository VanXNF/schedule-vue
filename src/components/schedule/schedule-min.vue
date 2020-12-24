<template>
  <div class="ivu-sch-min">
    <template>
    <Card class="ivu-sch-min-card" >
      <p slot="title">
        <Icon type="md-calendar"></Icon>
          {{pinSchedule.schedule_name}}
        </p>
      <Progress :percent="percentValue" :stroke-color="pinSchedule.bar_color" />
      <Button v-if="!is_recycle" type="text" :to="{name: 'change_schedule', params: {Schedule: pinSchedule}}" >详情</Button>
      <Button v-if="is_recycle" @click="restore">恢复</Button>
      <Button v-if="is_recycle" @click="del">删除</Button>
    </Card>
    </template>
  </div>
</template>
<script>
import './schedule-min.less'
import { restoreSchedule, getData, toRecycleBin } from '@/api/data'
export default {
  name: 'ScheduleMin',
  props: {
    pinSchedule: '',
    is_recycle: false
  },
  data () {
    return {
      options: {
        pathColors: ['white', 'rgb(90, 146, 173)']
      }
    }
  },
  methods: {
    restore () {
      restoreSchedule({
        user_id: this.$store.state.user.userId,
        schedule_id: this.pinSchedule.schedule_id
      }).then(
        res => getData(res)
      )
        .then(
          res => {
            if (res.code === 'OK') {
              this.$Message.success(res.message)
              this.$router.push({
                name: 'home'
              })
            } else {
              this.$Message.error(res.message)
            }
          }
        )
    },
    del () {
      const rb = {
        user_id: this.$store.state.user.userId,
        schedule_id: this.pinSchedule.schedule_id,
        recycle_bin: false
      }
      toRecycleBin(rb)
        .then(
          res => getData(res)
        ).then(
          res => {
            if (res.code === 'OK') {
              this.$Message.success(res.message)
              this.deleteScheduleListItem(this.pickSchedule)
              this.$router.push({
                name: 'recycle_bin'
              })
            } else {
              this.$Message.error(res.message)
            }
          }
        )
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
