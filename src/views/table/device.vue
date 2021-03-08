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
    <el-table
      :data="devicelist"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" type="index" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="maddr" label="所属网关" />
      <el-table-column prop="saddr" label="物理地址" />
      <el-table-column prop="status" label="当前状态" />
      <el-table-column prop="temperature" label="当前温度/℃"/>
      <el-table-column prop="humidity" label="当前湿度/%RH" />

<!--      <el-table-column prop="on_off" label="开关" width="80" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <span v-if="scope.row.on_off==1" style="color:red;">关闭</span>-->
<!--          <span v-if="scope.row.on_off==2" style="color:green;">开启</span>-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column prop="batterycapacity" label="当前电量/%" />
      <el-table-column align="center" label="休眠时间/s"  width="100">
        <template slot-scope="{row}">
          <el-tag type="warning" effect="dark">  {{ row.sleep }}秒</el-tag>

        </template>
      </el-table-column>
      <el-table-column prop="errorcode" label="故障码" />
      <el-table-column prop="dtime" label="上报时间" />
    </el-table>
  </div>
</template>


<script>
  import { slaveList, mmslaveList} from '@/api/device'
  import { master } from '@/api/master'

  export default {
    data() {
      return {
        devicelist: [],
        masterlist: [],
        selmaddr:''
      }
    },
    mounted() { // 页面加载时默认加载的函数
      this.getgatewayList(),
        this.allmaster()

    },
    methods: {

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
      }
    }
  }
</script>

<style scoped>

</style>
