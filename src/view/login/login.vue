<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import { getData } from '@/api/data'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        if (res.code === 'OK') {
          this.$Message.success(res.message)
          if (this.$store.state.user.userId === 0) {
            this.$router.push({
              name: 'admin'
            })
          } else {
            this.$router.push({
              name: this.$config.homeName
            })
          }
        } else this.$Message.error(res.message)
      })
    }
  }
}
</script>

<style>

</style>
