<template>


  <div class="app-container">

<!--    <el-table-->
<!--      :data="warningList"-->
<!--      border-->
<!--      fit-->
<!--      highlight-current-row-->
<!--    >-->
      <el-table
        :data="warningList"
        style="width: 100%"
        border
        :row-class-name="tableRowClassName">

      <el-table-column label="序号" type="index" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="maddr" label="所属网关" />
      <el-table-column prop="saddr" label="物理地址" />
      <el-table-column prop="status" label="当前状态" />
<!--      <el-table-column class-name="status-col" label="Status" width="110">-->
<!--        <template slot-scope="{row}">-->
<!--          <el-tag :type="row.temperature | statusFilter">-->
<!--            {{ row.temperature }}-->
<!--          </el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column prop="temperature" label="当前温度/℃" />


      <el-table-column prop="humidity" label="当前湿度/%RH" />



      <el-table-column prop="batterycapacity" label="当前电量/%" />
      <el-table-column prop="sleep" label="休眠时间/s" />
      <el-table-column prop="errorcode" label="故障码" />
      <el-table-column prop="dtime" label="上报时间" />
    </el-table>
  </div>
</template>
<script>
  import{ warningSlave} from '@/api/device'

  export default {
    data() {
      return {
        warningList: []
      }
    },
    mounted() { // 页面加载时默认加载的函数
      this.getWarningList()
    },
    methods:{
      tableRowClassName({row, rowIndex}) {
          return 'warning-row';
      },
      // 异步好一些
      async getWarningList() {
        const { data } = await warningSlave()
        this.warningList = data
        // console.log('请求到的设备列表' + '  ' + data.total + '  ' + this.userList)
        // this.total = data.total
      },

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
