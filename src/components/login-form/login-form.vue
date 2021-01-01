<template>
  <Form ref="loginForm" :model="form" :rules="rulesItem" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" :to="{name: 'signup'}" long>注册</Button>
    </FormItem>
  </Form>
</template>
<script>
import PasswordValidator from 'password-validator'
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
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
            callback(new Error('密码必须含有字母和数字'))
          }
        }
      }
    }
    return {
      validatePassFormat,
      form: {
        userName: '',
        password: ''
      },
      rulesItem: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
          // { validator: validatePassFormat, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>
