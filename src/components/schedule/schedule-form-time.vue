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
            <RadioGroup>
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
              type="primary"
              class="ivu-sch-form-btn"
              @click="handleSubmit('formItem')"
            >创建</Button>
          </FormItem>
        </Form>
      </template>
    </div>

  </div>
</template>

<script>
import { createSchdule, getData } from '@/api/data'
export default {
  name: 'ScheduleFormTime',
  data () {
    return {
      is_change: false,
      is_disabled: false,
      formItem: {
        schedule_name: '',
        bar_color: 'red',
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
      this.formItem.pin_flag = this.pickSchedule.pin_flag
      this.formItem.end_point = this.pickSchedule.end_point
      this.is_disabled = true
    }
  },
  methods: {
    handleSubmit (name1) {
      Promise.all([this.$refs[name1].validate()])
        .then(
          res => {
            if (res[0]) {
              createSchdule(
                {
                  user_id: 1,
                  schedule_name: this.formItem.schedule_name,
                  start_point: new Date(),
                  cur_point: new Date(),
                  end_point: this.formItem.end_point,
                  point_unit: ' ',
                  bar_color: this.formItem.bar_color,
                  pin_flag: this.formItem.pin_flag
                }
              ).then(
                res => getData(res)
              ).then(
                res => {
                  if (res.code === 'OK') {
                    this.$Message.success('Success!')
                  }
                }
              )
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
