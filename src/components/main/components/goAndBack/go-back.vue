<template>
  <div class="ivu-go-back">
    <Button type="primary" icon="md-arrow-back" @click="back"></Button>

    <Button type="primary" icon="md-arrow-round-forward" @click="go"></Button>

  </div>
</template>

<script>
export default {
  name: 'GoBack',
  methods: {
    go () {
      this.$router.go(1)
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" >
.ivu-go-back{
  position: absolute;
  right:500px;
}
</style>
