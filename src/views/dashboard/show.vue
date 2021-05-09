<template>
  <div class="app-container" align="center">

    <el-row style="margin-top:10px" gutter="428" >
      <!-- v-for循环显示出多个卡片，v-if根据数据类型判断是数据卡片还是开关拉片 -->
      <el-col :span="5" v-for="(data,index) in allmade" :key="data.maddr"
              :xs="24"
              :sm="24"
              :md="6"
              :lg="6"
              :xl="2" type="flex">
        <!-- 开关卡片 -->
        <el-card class="box-card">
          <div slot="header" class="clearfix" >
            <span>展柜：{{data.maddr}}</span>
          </div>
        <div v-for="o in data.slaveList" :key="o" class="text_item" style="margin:-8px 0">

          <el-row class="nelrow" align="middle" type="flex">
          <el-tag align="middle"> 地址：{{o.saddr}}</el-tag>&nbsp;&nbsp;&nbsp;&nbsp;

          <el-tag type="success"  effect="dark">
                 {{o.temperature }}℃
           </el-tag>&nbsp;&nbsp;&nbsp;&nbsp;

          <el-tag type="warning"  effect="plain">
           湿度：{{o.humidity}}RH%
        </el-tag>
          &nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;
          <el-progress  type="circle" :percentage="o.batterycapacity"  width="50"  >
          </el-progress>
          </el-row>
          </div>
<!--        </div>-->



          <el-row  >

          <div v-for="d in data.doorList" :key="d" class="text item" style="margin:5px 0">

            &nbsp;&nbsp; <span>门:{{d.door_address}}</span>&nbsp;&nbsp;
            <el-switch
              active-color="#13ce66"
              inactive-color="#dadde5"
              v-model="d.sw"
              @change=changedoor(data.maddr,d.door_address,d.sw)
            >
            </el-switch>
          </div>
          </el-row>

    <el-row align="center">
       <div v-for="l in data.lampList" :key="d" class="text item">
            <el-slider
              v-model="l.bright"
              vertical
              height="150px"
              @change="getlamp(data.maddr,l.lamp_address,l.bright)">
            </el-slider> <br>
            <span>灯:{{l.rid}}</span>&nbsp;&nbsp;&nbsp;
          </div>
    </el-row>

          <el-row align="center">
        <div v-for="r in data.relayList" :key="r" class="text item" style="margin:5px 0"> <!--    div的上下距离5，左右0-->
              &nbsp;&nbsp; <span>开关:{{r.relay_address}}</span>&nbsp;&nbsp;
              <el-switch
                v-model="r.sw"
                active-color="#E6A23C"
                @change="changeother(data.maddr,r.relay_address, r.sw)"
                inactive-color="#DCDFE6"
                :active-value="1"
                :inactive-value="0"
              ></el-switch>
              &nbsp;&nbsp;

            </div>
          </el-row>

    <el-row>


    </el-row>

        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {allmd} from '@/api/master'
  import {doorSwitch,deviceLamp,otherSwitch,findSwitch} from '@/api/device'

  export default {
    provide () {
      return {
        reload: this.reload
      }
    },
    data() {
      return {
        isRouterAlive: true,
        allmade:[],
        timer:null,
        door:null
      }
    },
    mounted() { // 页面加载时默认加载的函数
      this.getallmade()
    },
    methods: {
      changedoor (maddr,door_address,sw) {//询问门是否打开

        this.$confirm('此操作将打开/关闭门, 是否继续?', '提示', {

          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          doorSwitch(maddr,door_address,sw)
          //定时轮询
          this.timer = window.setInterval(() => {
            setTimeout(() => {
              this.getDoor(maddr,door_address)
              console.log("找到的开关 "+this.door.sw +"   "+sw)
              if (this.door.sw == sw && this.timer <=9000){
                  clearInterval(this.timer);
                if(sw){
                  this.$message.success('打开成功!')
                }else{
                  this.$message.success('关闭成功')
                }
                this.getallmade()
              }

              else {
                clearInterval(this.timer);
                if(sw){
                  this.$message.error('打开门失败!')
                }else{
                  this.$message.error('关闭门失败')
                }
                this.getallmade()
              }

            },0)
          },3000)


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消打开'
          });
        });
      },
      getlamp(maddr,lamp_address,lamp){
        console.log("鼠标松开后的值 "+ lamp+" "+ lamp_address + "设备地址 "+ maddr )
        deviceLamp(maddr,lamp_address,lamp)
      },
      changeother(maddr,relay_address,sw) {//询问门是否打开

        this.$confirm('此操作将打开/关闭门, 是否继续?', '提示', {

          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log("@@@门"+maddr+"  "+ relay_address + "  "+sw)

          otherSwitch(maddr,relay_address,sw)

          if(sw){
            this.$message.success('打开成功!')
          }else{
            this.$message.success('关闭成功')
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消打开'
          });
        });
      },


      async getallmade() {
        const { data } = await allmd()
        this.allmade = data
      },
      async getDoor(maddr,door_address) {
        const { data } = await findSwitch(maddr,door_address)
        this.door = data
       // console.log('请求到的门' + '  ' +data.sw + '  ' + data)
        // this.total = data.total
      },
    },

    beforeDestroy(){
      clearInterval(this.timer);
      this.timer = null;
    }


  }


</script>


<style>
  /*.text item{*/
  /*  font-size: 28px;*/
  /*  margin-bottom: 18px;*/
  /*}*/

  .text_item{
    font-size: 14px;
    /*margin-bottom: 18px;*/
  }
  .text_item .nelrow{
    height: 100%;
  }
  /*.item {*/
  /*  */
  /*}*/

  /*.text item circle{*/
  /*  margin-top: 20px;*/
  /*}*/

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 420px;
    height: 550px;
  }

  .el-row {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap
  }
  .card-panel-icon {
    float: left;
    font-size: 28px;
  }
</style>
