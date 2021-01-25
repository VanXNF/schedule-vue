<template>
    <div>
        <admin-table  :user-list="userList"/>
    </div>
</template>
<script>
import { getUserList, getData } from '@/api/data'
import AdminTable from '../../components/admin/table.vue'
export default {
  name: 'Admin',
  data () {
    return {
      userList: []
    }
  },
  components: {
    AdminTable
  },
  mounted () {
    getUserList({
      start_num: 0,
      end_num: 4
    })
      .then(
        res => getData(res)
      )
      .then(
        res => {
          if (res.code === 'OK') {
            this.userList = res.data
          } else {

          }
        }
      )
  }
}
</script>
