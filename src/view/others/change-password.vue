
<template>
    <div style="width:350px;margin: 0 auto;">

    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="原密码" prop="oldpasswd">
            <Input type="password" v-model="formCustom.oldpasswd"></Input>
        </FormItem>
        <FormItem label="新密码" prop="passwd">
            <Input type="password" v-model="formCustom.passwd"></Input>
        </FormItem>
        <FormItem label="再次输入密码" prop="passwdCheck">
            <Input type="password" v-model="formCustom.passwdCheck"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">确认</Button>
            <!-- <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button> -->
        </FormItem>
    </Form>
    </div>
</template>
<script>
import { changePassword, getData } from '@/api/data'
export default {
  name: 'ChangePassword',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }

    return {
      formCustom: {
        passwd: '',
        passwdCheck: '',
        oldpasswd: ''
      },
      ruleCustom: {
        passwd: [
          { validator: validatePass, trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度最低为6位', trigger: 'blur' },
          { required: true, message: '密码不能为空', trigger: 'change' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' },
          { type: 'string', min: 6, message: '密码长度最低为6位', trigger: 'blur' },
          { required: true, message: '密码不能为空', trigger: 'change' }
        ],
        oldpasswd: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log('das')
          changePassword({
            user_id: this.$store.state.user.userId,
            old_key: this.formCustom.oldpasswd,
            new_key: this.formCustom.passwd
          })
            .then(
              res => getData(res)
            )
            .then(
              res => {
                if (res.code === 'OK') {
                  this.$Message.success(res.message)
                  this.$router.push({
                    name: 'home'
                  })
                }
              }
            )
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
