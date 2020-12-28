<template>
  <div>
    <div class="ivu-form-clas">
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
              :disabled="is_disabled"
              placeholder="日程名称"
              class="ivu-form-item-1"
              maxlength="20"
              show-word-limit="20"
            />
            <Checkbox
              v-model="formItem.pin_flag"
              :disabled="is_disabled"
              class="ivu-check-box"
            >
              <Icon
                type="md-pricetag"
                class="ivu-check-icon"
                :size="iconSize"
              />
            </Checkbox>
          </FormItem>
          <FormItem prop="points">
            <Form
              ref="points"
              :model="points"
              :rules="ruleInline"
              class="ivu-sch-form-2"
            >
              <FormItem
                prop="start_point"
                class="ivu-form-item-2"
              >
                <Input
                  v-model="points.start_point"
                  :disabled="is_disabled"
                  placeholder="开始"
                />
              </FormItem>
              <FormItem
                prop="cur_point"
                class="ivu-form-item-2"
              >
                <Input
                  v-model="points.cur_point"
                  placeholder="当前"
                  :disabled="is_disabled"
                />
              </FormItem>
              <FormItem
                prop="end_point"
                class="ivu-form-item-2"
              >
                <Input
                  v-model="points.end_point"
                  placeholder="结束"
                  :disabled="is_disabled"
                />
              </FormItem>
              <FormItem
                prop="point_unit"
                class="ivu-form-item-2"
              >
                <Input
                  v-model="points.point_unit"
                  placeholder="单位"
                  :disabled="is_disabled"
                />
              </FormItem>
            </Form>
          </FormItem>
          <FormItem class="ivu-sch-form-radio">
            <p>进度条颜色</p>
            <RadioGroup v-model="formItem.bar_color">
              <Radio
                label="#ff0000"
                :disabled="is_disabled"
              >
                <Icon
                  type="md-bookmark"
                  color="#ff0000"
                  :size="iconSize"
                />
              </Radio>
              <Radio
                label="#15c271"
                :disabled="is_disabled"
              >
                <Icon
                  type="md-bookmark"
                  color="#15c271"
                  :size="iconSize"
                />
              </Radio>
              <Radio
                label="#5a92ad"
                :disabled="is_disabled"
              >
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
              @click="handleSubmit('formItem', 'points')"
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
            <Modal
              v-model="modal"
              ok-text="是"
              cancel-text="否"
              @on-ok="del(true)"
              @on-cancel="del(false)"
            >
              <p>是否加入回收站</p>
            </Modal>
          </FormItem>
        </Form>
      </template>
    </div>
  </div>
</template>

<script>
import {
  createSchdule,
  getData,
  changeSchdule,
  toRecycleBin
} from '@/api/data'
import { mapMutations, mapActions } from 'vuex'
export default {
  name: 'ScheduleForm',
  data () {
    const getPostData = () => {
      return {
        user_id: this.$store.state.user.userId,
        schedule_name: this.formItem.schedule_name,
        start_point: this.points.start_point,
        cur_point: this.points.cur_point,
        end_point: this.points.end_point,
        point_unit: this.points.point_unit,
        bar_color: this.formItem.bar_color,
        pin_flag: this.formItem.pin_flag,
        delete_flag: true
      }
    }
    const validatePointUnit = (rule, value, callback) => {
      if (value === ' ') {
        callback(new Error('单位不能为空'))
      } else {
        callback()
      }
    }
    const validateNumber = (rule, value, callback) => {
      if (Number.isInteger(value)) {
        callback(new Error('请输入数字'))
      } else {
        callback()
      }
    }
    return {
      modal: false,
      validateNumber,
      getPostData,
      is_change: false,
      is_disabled: false,
      formItem: {
        schedule_name: '',
        bar_color: '#ff0000',
        pin_flag: false
      },
      points: {
        start_point: '',
        cur_point: '',
        end_point: '',
        point_unit: ''
      },
      ruleInline: {
        schedule_name: [
          { required: true, message: '请输入日程名称', trigger: 'blur' }
        ],
        start_point: [
          { required: true, message: '请输入开始值', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        cur_point: [
          { required: true, message: '请输入当前值', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        end_point: [
          { required: true, message: '请输入结束值', trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }

        ],
        point_unit: [
          { required: true, message: '请输入单位', trigger: 'blur' },
          { validator: validatePointUnit, trigger: 'blur' }
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
      this.points.start_point = this.pickSchedule.start_point
      this.points.cur_point = this.pickSchedule.cur_point
      this.points.end_point = this.pickSchedule.end_point
      this.points.point_unit = this.pickSchedule.point_unit
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
    handleSubmit (name1, name2) {
      Promise.all([
        this.$refs[name1].validate(),
        this.$refs[name2].validate()
      ]).then(res => {
        if (res[0] && res[1]) {
          const d = this.getPostData()
          if (!this.is_change) {
            createSchdule(d)
              .then(res => getData(res))
              .then(res => {
                if (res.code === 'OK') {
                  this.getScheduleItem({
                    user_id: this.$store.state.user.userId,
                    schedule_id: res.data
                  })
                  this.$Message.success(res.message)
                  this.$router.push({
                    name: 'schedule'
                  })
                } else {
                  this.$Message.error(res.message)
                }
              })
          } else {
            // 修改
            d.delete_flag = true
            d.schedule_id = this.pickSchedule.schedule_id
            changeSchdule(d)
              .then(res => getData(res))
              .then(res => {
                if (res.code === 'OK') {
                  this.changeScheduleItem({ data: {
                    user_id: this.$store.state.user.userId,
                    schedule_id: this.pickSchedule.schedule_id
                  },
                  oldItem: this.pickSchedule })
                  this.$Message.success(res.message)
                  this.$router.push({
                    name: 'schedule'
                  })
                } else {
                  this.$Message.error(res.message)
                }
              })
          }
        } else {
          this.$Message.error('Fail!')
        }
      })

      // if (i && j) {
      //     this.$Message.success('Success!');
      //       }
      //   else {
      //       this.$Message.error('Fail!');}
    },
    handleChange () {
      this.is_disabled = false
      this.is_change = true
    },
    handleDelete () { },
    del () {
      // const d = this.getPostData()
      // d.delete_flag = true
      // // 修改回收标记
      // // 修改和回收标记逻辑有问题
      // changeSchdule(d)
      //   .then(res => getData(res))
      //   .then(res => {
      //     const rb = {
      //       user_id: this.$store.state.user.userId,
      //       schedule_id: this.pickSchedule.schedule_id,
      //       recycle_bin: true
      //     }
      //     if (res.code === 'OK') {
      //       if (is) {
      //         toRecycleBin(rb)
      //           .then(res => getData(res))
      //           .then(res => {
      //             if (res.code === 'OK') {
      //               this.$Message.success(res.message)
      //               this.$router.go(-1)
      //             }
      //           })
      //       } else {
      //         rb.recycle_bin = false
      //         toRecycleBin(rb)
      //       }
      //       this.$router.go(-1)
      //     }
      //   })
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
              this.$router.push({
                name: 'schedule'
              })
            } else {
              this.$Message.error(res.message)
            }
          }
        )
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
