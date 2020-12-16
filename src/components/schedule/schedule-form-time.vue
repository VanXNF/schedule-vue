<template>
  <div>
    <div class="ivu-form-time-clas">
      <template>
        <Form
          ref="formItem"
          :model="formItem"
          :rules="ruleInline"
          :label-width="80"
        >
          <FormItem prop="schedule_name">
            <Input
              v-model="formItem.schedule_name"
              placeholder="目标名称"
              class="ivu-form-item-1"
              :disabled="is_disabled"
            />
            <Checkbox
              v-model="formItem.pin_flag"
              class="ivu-check-box"
              :disabled="is_disabled"
            >
              <Icon
                type="md-pricetag"
                class="ivu-check-icon"
                :size="iconSize"
              />
            </Checkbox>
          </FormItem>
          <FormItem prop="end_point">
            <DatePicker
              v-model="formItem.end_point"
              type="date"
              placeholder="结束时间"
              style="width: 150px"
              :disabled="is_disabled"
            ></DatePicker>
          </FormItem>
          <FormItem class="ivu-sch-form-radio">
            <p>进度条颜色</p>
            <RadioGroup v-model="formItem.bar_color" >
              <Radio label="#ff0000" :disabled="is_disabled">
                <Icon
                  type="md-bookmark"
                  color="#ff0000"
                  :size="iconSize"
                />
              </Radio>
              <Radio label="#15c271" :disabled="is_disabled">
                <Icon
                  type="md-bookmark"
                  color="#15c271"
                  :size="iconSize"
                />
              </Radio>
              <Radio label="#5a92ad" :disabled="is_disabled">
                <Icon
                  type="md-bookmark"
                  color="#5a92ad"
                  :size="iconSize"
                />
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Button
              v-if="!is_disabled"
              type="primary"
              class="ivu-sch-form-btn"
              @click="handleSubmit('formItem')"
            >确定</Button>
            <Button
              v-if="is_disabled"
              type="primary"
              class="ivu-sch-form-btn"
              @click="handleChange"
            >修改</Button>
            <Button
              v-if="is_disabled"
              type="error"
              class="ivu-sch-form-btn"
              @click="del"
            >删除</Button>
          </FormItem>
        </Form>
      </template>
    </div>

  </div>
</template>

<script>
import { createSchdule, getData, changeSchdule, toRecycleBin } from '@/api/data'
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'ScheduleFormTime',
  data () {
    const getEndDate = (date) => {
      date.setDate(date.getDate() + 1)
      return date
    }
    return {
      getEndDate,
      is_change: false,
      is_disabled: false,
      formItem: {
        schedule_name: '',
        bar_color: '#ff0000',
        pin_flag: false,
        end_point: ''
      },
      ruleInline: {
        schedule_name: [
          { required: true, message: '请输入日程名称', trigger: 'blur' }
        ],
        end_point: [
          { type: 'date', required: true, message: '请选择结束时间', trigger: 'blur' }
        ]
      },
      iconSize: 20
    }
  },
  props: {
    pickSchedule: {},
    is_pick: {
      default: false
    }
  },
  mounted () {
    if (this.is_pick) {
      this.formItem.schedule_name = this.pickSchedule.schedule_name
      this.formItem.bar_color = this.pickSchedule.bar_color
      this.formItem.pin_flag = (this.pickSchedule.pin_flag === 'true')
      this.formItem.end_point = this.pickSchedule.end_point
      this.is_disabled = true
    }
  },

  methods: {
    ...mapMutations([
      'deleteScheduleListItem'
    ]),
    ...mapActions([
      'getScheduleItem',
      'changeScheduleItem'
    ]),
    del () {
      const rb = {
        user_id: this.$store.state.user.userId,
        schedule_id: this.pickSchedule.schedule_id,
        recycle_bin: true
      }
      toRecycleBin(rb)
        .then(
          res => getData(res)
        ).then(
          res => {
            if (res.code === 'OK') {
              this.$Message.success(res.message)
              this.deleteScheduleListItem(this.pickSchedule)
              this.$router.go(-1)
            } else {
              this.$Message.error(res.message)
            }
          }
        )
    },
    handleChange () {
      this.is_disabled = false
      this.is_change = true
    },
    handleSubmit (name1) {
      Promise.all([this.$refs[name1].validate()])
        .then(
          res => {
            if (res[0]) {
              if (!this.is_change) {
                createSchdule(
                  {
                    user_id: this.$store.state.user.userId,
                    schedule_name: this.formItem.schedule_name,
                    start_point: new Date(),
                    cur_point: new Date(),
                    end_point: this.getEndDate(this.formItem.end_point),
                    point_unit: ' ',
                    bar_color: this.formItem.bar_color,
                    pin_flag: this.formItem.pin_flag
                  }
                ).then(
                  res => getData(res)
                ).then(
                  res => {
                    if (res.code === 'OK') {
                      this.getScheduleItem({
                        user_id: this.$store.state.user.userId,
                        schedule_id: res.data
                      })
                      this.$Message.success(res.message)
                    } else {
                      this.$Message.error(res.message)
                    }
                  }
                )
              } else {
                changeSchdule({
                  user_id: this.$store.state.user.userId,
                  schedule_id: this.pickSchedule.schedule_id,
                  schedule_name: this.formItem.schedule_name,
                  start_point: this.pickSchedule.start_point,
                  cur_point: new Date(),
                  end_point: this.formItem.end_point,
                  point_unit: ' ',
                  bar_color: this.formItem.bar_color,
                  pin_flag: this.formItem.pin_flag,
                  delete_flag: false
                })
                  .then(
                    res => getData(res)
                  )
                  .then(res => {
                    if (res.code === 'OK') {
                      this.changeScheduleItem({ data: {
                        user_id: this.$store.state.user.userId,
                        schedule_id: this.pickSchedule.schedule_id
                      },
                      oldItem: this.pickSchedule })
                      this.$Message.success(res.message)
                      // todo add to
                    } else {
                      this.$Message.error(res.message)
                    }
                  })
              }
            } else {
              this.$Message.error('Fail!')
            }
          }
        )

      // if (i && j) {
      //     this.$Message.success('Success!');
      //       }
      //   else {
      //       this.$Message.error('Fail!');}
    }
  }
}
</script>
<style lang="less">
.ivu-check-box {
  margin-left: 5px;
}
.ivu-form-item-1 {
  width: 260px;
}
.ivu-form-item-2 {
  width: 80px;
  margin-right: 5px;
  float: left;
}

.ivu-sch-form-btn {
  margin-left: 300px;
}
.ivu-check-box,
.ivu-form-item-1,
.ivu-form-item-2,
.ivu-sch-form-radio {
}
</style>
