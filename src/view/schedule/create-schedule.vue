<template>
  <div>
    <template>
    <Tabs value="name1">
        <TabPane label="日程" name="name1"><schedule-form-time/></TabPane>
        <TabPane label="自定义" name="name2"><schedule-form/></TabPane>
    </Tabs>
</template>

  </div>
</template>

<script>
import ScheduleForm from '../../components/schedule/schedule-form.vue'
import ScheduleFormTime from '../../components/schedule/schedule-form-time.vue'
export default {
  name: 'CreateSchedule',
  components: {
    ScheduleForm,
    ScheduleFormTime
  }
}
</script>
<style lang="less">
.ivu-form-clas, .ivu-form-time-clas{
  margin-left: 200px;
  background-color: rgb(236, 236, 234);
  margin-right: 270px;
  padding-bottom: 10px;
  padding-top: 30px;
}
.ivu-form-time-clas{
  padding-bottom: 100px;
}
</style>
