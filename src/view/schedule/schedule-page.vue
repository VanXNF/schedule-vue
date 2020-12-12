<template>
  <div>
    <div>
      <p class="ivu-sch-title-p">固定日程</p>
      <schedule-pin :pin-list="pinScheduleList"/>
    </div>
        <Divider/>
    <div class="ivu-sch-page-date">
      <p class="ivu-sch-title-p">日程</p>
      <schedule-pin :pin-list="scheduleListByDate"/>
    </div>
  </div>
</template>
<script>
import SchedulePin from '../../components/schedule/schedule-pin.vue'
import { getSpecificScheduleOrNote } from '@/libs/util'
import { mapActions } from 'vuex'
export default {
  name: 'schedule',
  data () {
    return {
      pinScheduleList: []
    }
  },
  methods: {
    ...mapActions([
      'getScheduleList'
    ])
  },
  components: {
    SchedulePin
  },
  mounted () {
    this.pinScheduleList = this.$store.state.schedule.pinScheduleList
    this.getScheduleList({
      user_id: this.$store.state.user.userId,
      status_flag: ''
    })
  },
  computed: {
    scheduleListByDate () {
      let obj = JSON.parse(JSON.stringify(this.$store.state.schedule.scheduleList))
      obj.sort(
        (a, b) => {
          let aa = new Date(a)
          let bb = new Date(b)
          if (aa < bb) return -1
          if (aa > bb) return 1
          return 0
        }
      )
      return obj
    }
  }
}
</script>
<style lang="less" >
.ivu-sch-min {
  .ivu-sch-min-card{
    background-color: #D3D3D3;
    margin: 0 auto;
    margin-left: 70px;
    margin-top: 15px;
    margin-bottom: 15px;

  }
  float: left;
  width: 250px;
}
.ivu-sch-page-date{
  // background-color: #9ca8b8;
    .ivu-sch-min-card{
    background-color: rgb(223, 214, 215);
  }
  .ivu-sch-min{
    // background-color: #9ca8b8;
  }

}
.ivu-sch-title-p{
  font-size: 25px;
}
</style>
