<template>
    <div class='search-btn-con'>
      <Form ref="formItem" :model="formItem" :rules="ruleInline" :label-width="30">
          <FormItem prop="keyWord">
            <Input v-model="formItem.keyWord" search enter-button placeholder="请输入关键词" @on-search="handleClick('formItem')"/>
          </FormItem>
      </Form>

    </div>
</template>
<script>
import { getSearchResult, getData } from '@/api/data'
export default {
  name: 'Search',
  data () {
    return {
      formItem: {
        keyWord: ''
      },
      ruleInline: {
        keyWord: [
          { required: true, message: '关键词内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClick (name) {
      // API
      this.$refs[name].validate(
        vali => {
          if (vali) {
            getSearchResult(
              {
                user_id: this.$store.state.user.userId,
                key: this.formItem.keyWord
              }
            )
              .then(
                res => getData(res)
              )
              .then(
                res => {
                  if (res.code === 'OK') {
                    this.$store.state.app.searchResult = res.data
                    this.$router.push({
                      name: 'search'
                    })
                  }
                }
              )
          // async
          }
        })
    }
  }
}
</script>
<style lang="less">
.search-btn-con {
  height: 64px;
  line-height: 56px;
  padding-top: 15px;
}
</style>
