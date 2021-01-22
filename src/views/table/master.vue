<template>
  <div class="app-container">

    <el-table
      :data="allmaster"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" type="index" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ (page - 1) * size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="maddr" label="物理地址" />
      <el-table-column prop="status" label="设备状态" />
      <el-table-column prop="ipaddr" label="IP地址" />
      <el-table-column prop="ostatuscode" label="状态码" />
      <el-table-column prop="ltime" label="最后一次上报时间" />
<!--      <el-table-column prop="status" label="状态" width="80" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span v-if="scope.row.status==0" style="color:red;">掉线</span>-->
<!--          <span v-if="scope.row.status==1" style="color:green;">运行中</span>-->
<!--        </template>-->
<!--      </el-table-column>-->


<!--      <el-table-column label="编辑" width="100">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edituser(scope.row)">编辑</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="删除" width="100">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deluser(scope.row)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>

    <el-pagination
      :current-page="page"
      :page-sizes="[5, 10, 20]"
      :page-size="size"
      style="float:right"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { alldevice } from '@/api/device'

export default {
  data() {
    return {
      dialogVisible: false,
      dialog2Visible: false,
      activeIndex2: '1',
      total: 0,
      size: 5,
      page: 1,
      allmaster: [],
      gateway: {},
      addFlag: true,
      curId: ''
    }
  },

  watch: {
    // 2.x版本的bug 以前用1.x发现没有 假如现在是第三页，只有一条数据了。将其删除，就没有第三页了。应该跳到第二页展示出5条数据。
    // 可是数据没有展示。原因是获取list的时候page参数没有改变。依然是3
    total() {
      if (this.total == (this.page - 1) * this.size && this.total != 0) {
        this.page -= 1
        this.getuserList()
      }
    }
  },
  mounted() { // 页面加载时默认加载的函数
    this.getgatewayList()
  },
  methods: {
    handleClose(done) {
      done()
    },
    handleSizeChange(val) {
      this.size = val
      this.getuserList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getuserList()
    },
    // 异步好一些
    async getgatewayList() {
      const { data } = await alldevice(this.page, this.size)
      this.allmaster = data.list
      console.log('请求到的设备列表' + '  ' + data.total + '  ' + this.userList)
      this.total = data.total
    }
  }
}
</script>

<style scoped>

</style>
