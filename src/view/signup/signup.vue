<style lang="less">
  @import './signup.less';
</style>

<template>
  <div class="signup">
    <div class="signup-con">
      <Card icon="log-in" title="欢迎注册" :bordered="false" style="width:420px;margin: 0 auto;">
        <div class="form-con">
          <sign-up-form @sign-up="handleSubmit"></sign-up-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import SignUpForm from '_c/signup-form'
// import { mapActions } from 'vuex'
import { tosignup } from '@/api/user'
import { getData } from '@/api/data'
export default {
  name: 'SignUpName',
  components: {
    SignUpForm
  },
  methods: {
    handleSubmit ({ userName, password }) {
      tosignup({ userName, password })
        .then(
          res => getData(res)
        )
        .then(
          res => {
            if (res.code === 'OK') {
              this.$Message.success(res.message)
              this.$router.push(
                { name: 'login' }
              )
            } else {
              this.$Message.error(res.message)
            }
          }
        )
    }
  }
}
</script>

<style>

</style>
