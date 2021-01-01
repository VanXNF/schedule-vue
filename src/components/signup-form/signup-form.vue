
<template>
    <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <FormItem label="用户名" prop="userName">
            <Input type="text" v-model="formCustom.userName" number></Input>
        </FormItem>
        <FormItem label="密码" prop="passwd">
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
</template>
<script>
import PasswordValidator from 'password-validator'
export default {
  name: 'SignUpForm',
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

    const validatePassFormat = (rule, value, callback) => {
      console.log(1)
      const schema = new PasswordValidator()
      console.log(2)
      schema
        .is().min(6)
        .is().max(20)
        .has().digits()
        .has().not().letters()
        .has().not().symbols()
      const res = schema.validate(value, { list: true })
      console.log(res)
      if (res.length === 0) {
        callback()
      } else {
        for (let i = 0; i < res.length; i++) {
          const e = res[i]
          if (e === 'min') {
            callback(new Error('密码长度最低为6位'))
          } else if (e === 'max') {
            callback(new Error('密码长度最高为20位'))
          } else {
            callback(new Error('密码只能使用数字'))
          }
        }
      }
    }

    return {
      formCustom: {
        passwd: '',
        passwdCheck: '',
        userName: ''
      },
      ruleCustom: {
        passwd: [
          { validator: validatePass, trigger: 'blur' },
          { validator: validatePassFormat, trigger: 'blur' },

          { type: 'string', min: 6, message: '密码长度最低为6位', trigger: 'blur' },
          { required: true, message: '密码不能为空', trigger: 'change' }
        ],
        passwdCheck: [
          { validator: validatePassCheck, trigger: 'blur' },
          // { type: 'string', min: 6, message: '密码长度最低为6位', trigger: 'blur' },
          { required: true, message: '密码不能为空', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$emit('sign-up', {
            userName: this.formCustom.userName,
            password: this.formCustom.passwd
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
