<template>
  <div class="app-container">

<!--    <el-table-->
<!--      :data="errorlist"-->
<!--      border-->
<!--      fit-->
<!--      highlight-current-row-->
<!--      :header-cell-style="{background:'#fff'}"-->
<!--      :row-class-name="tableRowClassName"-->
<!--    >-->

    <el-table
      :data="errorlist"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column label="序号"  width="80px" align="center">

        <template slot-scope="scope">
          <span>{{scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="故障类型"
        >
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="故障名称" >
      </el-table-column>
      <el-table-column
        prop="code"
        label="状态码" >
      </el-table-column>
      <el-table-column
        prop="describe"
        label="错误描述">
      </el-table-column>
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
    tableRowClassName({row, rowIndex}) {
      // if (rowIndex %2 === 0) {
      //   return 'warning-row';
      // } else
      if (rowIndex %2 !==0) {
        return 'success-row';
      }
      return '';
    },
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

<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
