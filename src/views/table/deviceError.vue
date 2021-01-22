<template>
  <div class="app-container">

    <el-table
      :data="errorlist"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" type="index" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="故障类型" />
      <el-table-column prop="typeName" label="故障名称" />
      <el-table-column prop="code" label="状态码" />
      <el-table-column prop="describe" label="错误描述" />
    </el-table>
  </div>
</template>

<script>
import { deverror} from '@/api/device'
export default {
  data() {
      return {
        errorlist: []
      }
    },
  mounted() { // 页面加载时默认加载的函数
    this.getgatewayList()
  },
  methods: {

    // 异步好一些
    async getgatewayList() {
      const { data } = await deverror()
      this.errorlist = data
      // console.log('请求到的设备列表' + '  ' + data.total + '  ' + this.userList)
      // this.total = data.total
    }
  }
}
</script>

<style scoped>

</style>
