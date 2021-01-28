<template>


  <div class="app-container">
    <div>
      <el-select @change="typeChange" v-model="masterlist.maddr"  placeholder="请选择网关" >
        <el-option
          v-for="item in masterlist"
          :key="item.id"
          :label="item.maddr"
          :value="item.maddr">
        </el-option>
      </el-select>


      <el-button type="primary" icon="el-icon-search" @click="doFilter">搜索</el-button>
      <!--    <el-button type="primary" @click="openData">展示数据</el-button>-->
    </div>
    <br>
<!--    <el-table-->
<!--      :data="devicelist"-->
<!--      border-->
<!--      fit-->
<!--      highlight-current-row-->
<!--    >-->
      <el-table
        :data="devicelist"
        style="width: 100%"
        border
        :row-class-name="tableRowClassName">
      <el-table-column label="序号" type="index" width="50px" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="maddr" label="所属网关" width="50px"  />
      <el-table-column prop="saddr" label="物理地址" width="80px" />

        <el-table-column property="door" label="门开关" width="80px">
          <template scope="scope">
            <el-switch
              active-color="#13ce66"
              inactive-color="#dadde5"
              v-model="scope.row.door"
              @change=changeSwitch(scope.row)
            >
            </el-switch>
          </template>
        </el-table-column>

      <el-table-column prop="temperature_max" label="最高温度/℃" />
      <el-table-column prop="temperature_min" label="最低温度/℃" />
      <el-table-column prop="humidity_max" label="最大湿度/%RH" />
      <el-table-column prop="humidity_min" label="最小湿度/%RH" />

        <el-table-column prop="lamp" label="灯亮度" width="110px">
          <template slot-scope="scope">
            <el-slider v-model="scope.row.lamp"
                       :format-tooltip = "formatTooltip"
                       @change="getlamp">
            </el-slider>
          </template>
        </el-table-column>

        <el-table-column prop="batterycapacity_min" label="最小电量/%" width="100px"/>
      <el-table-column prop="sleep" label="休眠时间/s" />
<!--      <el-table-column label="编辑" width="100">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button  @click="editdevice(scope.row)" type="warning" icon="el-icon-edit" circle></el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <el-dialog
      title="修改环境信息"
      style="text-align:left !important"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="110px" >
        <el-form-item label="最高温度/℃"  style="width:300px">
          <el-input v-model="device.temperature_max" placeholder="请输入最高温度" />
        </el-form-item>
        <el-form-item label="最低温度/℃" style="width:300px">
          <el-input v-model="device.temperature_min" placeholder="请输入最低温度" />
        </el-form-item>
        <el-form-item label="最大湿度/%RH" style="width:400px">
          <el-input v-model="device.humidity_max" placeholder="请输入最大湿度" />
        </el-form-item>
        <el-form-item label="最小湿度/%RH" style="width:400px">
          <el-input v-model="device.humidity_min" placeholder="请输入最小湿度" />
        </el-form-item>
        <el-form-item label="最小电量/%" style="width:400px">
          <el-input v-model="device.batterycapacity_min" placeholder="请输入最小电量" />
        </el-form-item>

        <el-form-item label="休眠时间(秒)" style="width:400px">
          <el-input v-model="device.sleep" placeholder="请输入休眠时间" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="updatedevice()">提交</el-button>
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>

  </div>
</template>


<script>
  import { slaveList, mmslaveList,editDevice,deviceSwitch} from '@/api/device'
  import { master } from '@/api/master'

  export default {
    data() {
      return {
        devicelist: [],
        device: {},
        masterlist: [],
        selmaddr:'',
        addFlag: true,
        dialogVisible: false,
      }
    },
    mounted() { // 页面加载时默认加载的函数
      this.getgatewayList(),
        this.allmaster()

    },
    methods: {
      tableRowClassName({row, rowIndex}) {//表格隔行显示不同的颜色
        if (rowIndex %2 ===0) {
          return 'success-row';
        }
        return '';
      },
      changeSwitch (row) {//询问门是否打开
        const saddr = row.saddr;

        let flag = row.door //保存点击之后v-modeld的值(true，false)
        row.door = !row.door //保持switch点击前的状态
        this.$confirm('此操作将打开/关闭门, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deviceSwitch(saddr,flag)
          if(flag){
            row.door = true
            // 逻辑处理
            this.$message.success('打开成功!')
          }else{
            row.door = false
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
      formatTooltip(val){
        return val;
      },
      getlamp(){
          console.log("鼠标松开后的值 " + this.lamp)
      },
      // 异步好一些
      async getgatewayList() {
        const { data } = await slaveList()
        this.devicelist = data
        // console.log('请求到的设备列表' + '  ' + data.total + '  ' + this.userList)
        // this.total = data.total
      },
      //下拉菜单

      async allmaster() {
        const { data } = await master()
        this.masterlist = data

      },
      // 下拉菜单变化
      typeChange(data) {
        this.selmaddr=data

      },
      doFilter() {
        if (this.selmaddr == "") {
          $message.warning("查询条件不能为空！");
          return;
        }
        this.devicelist = []
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.mslaveList()
      },
      async mslaveList() {
        console.log("选中的网关"+  this.selmaddr);
        const { data } = await mmslaveList(this.selmaddr)
        this.devicelist = data
      },
      //编辑设备
      editdevice(row) {
        this.device = row
        this.dialogVisible = true
        this.addFlag = false
      },
      async updatedevice() {
        const { data } = await editDevice(this.device)
        this.dialogVisible = false
        this.user = {}
        this.getgatewayList()
      },
    }
  }
</script>

<style>
  .el-table .warning-row {
    background: #C0C4CC;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
