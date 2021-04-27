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
      <el-table-column prop="maddr" label="物理地址"    align="center"/>
      <el-table-column prop="status" label="设备状态"   align="center"/>
      <el-table-column prop="ipaddr" label="IP地址"   align="center"/>
      <el-table-column prop="ostatuscode" label="状态码"  align="center" />
      <el-table-column prop="ltime" label="最后一次上报时间"   align="center"/>
<!--      <el-table-column property="sw" label="网关开关" width="80px" align="center">-->
<!--        <template scope="scope">-->
<!--          <el-switch-->
<!--            active-color="#13ce66"-->
<!--            inactive-color="#dadde5"-->
<!--            v-model="scope.row.sw"-->
<!--            @change=changeSwitch(scope.row)-->
<!--          >-->
<!--          </el-switch>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="时钟同步" width="100"   align="center">
        <template slot-scope="scope">
<!--          <el-button type="info"  icon="refresh" size="mini" @click="retime(scope.row)" circle>清空</el-button>-->
          <el-button type="warning" icon="el-icon-refresh" @click="retime(scope.row)" circle></el-button>

        </template>
      </el-table-column>
      <el-table-column label="清空状态" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary"  size="mini" @click="rest(scope.row)">清空</el-button>
        </template>
      </el-table-column>
<!--      <el-table-column prop="status" label="状态" width="80" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span v-if="scope.row.status==0" style="color:red;">掉线</span>-->
<!--          <span v-if="scope.row.status==1" style="color:green;">运行中</span>-->
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
import { allMaster,masterRest,masterSwitch,masterTime} from '@/api/master'

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
      const { data } = await allMaster(this.page, this.size)
      this.allmaster = data.list
      console.log('请求到的设备列表' + '  ' + data.total + '  ' + this.userList)
      this.total = data.total
    },
    changeSwitch (row) {//询问门是否打开
      const maddr = row.maddr;
      let flag = row.sw //保存点击之后v-modeld的值(true，false)
        row.sw = !row.sw //保持switch点击前的状态
      this.$confirm('此操作将打开/关闭网关, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        masterSwitch(maddr,flag)
        if(flag){
          row.sw = true
          // 逻辑处理
          this.$message.success('打开成功!')
        }else{
          row.sw = false
          // 逻辑处理
          this.$message.success('关闭成功！')
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消打开'
        });
      });
    },
    rest(row){
      const maddr = row.maddr;
      this.$confirm('是否清空当前网关状态', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          masterRest(maddr)
        this.$message.success('清空成功!')


      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消清空'
        });
      });
    },
    retime(row){
      const maddr = row.maddr;
      this.$confirm('是否同步网关时钟', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        masterTime(maddr)
        this.$message.success('同步成功!')


      }).catch(() => {
        this.$message({
          type: 'info'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>
