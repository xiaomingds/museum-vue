<template>
  <el-row :gutter="40" class="panel-group"
          :data="datalist"
  >
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel"  @click="$router.push('/example/user')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="people" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            用户数量
          </div>
          <span style="font-size: 20px">{{datalist[0]}}</span><!--          <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />-->
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="$router.push('/getway/master')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="network" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            网关数量
          </div>
          <span style="font-size: 20px">{{datalist[1]}}</span>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel"  @click="$router.push('/getway/device')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="device" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            设备数量
          </div>
          <span style="font-size: 20px">{{datalist[2]}}</span>
        </div>
      </div>
    </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel"  @click="$router.push('/getway/regulation')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="devicew" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            设备报警
          </div>
          <span style="font-size: 20px">{{datalist[3]}}</span>
        </div>
      </div>
    </el-col>
  </el-row>


</template>

<script>
  import { indexList } from '@/api/device'

export default {
  data(){
    return{
      datalist: []
    }
  },
  mounted() { // 页面加载时默认加载的函数
    this.indexList()
  },
  methods:{
    // 异步好一些
    async indexList() {
      const { data } = await indexList(this.page, this.size)
      this.datalist = data
      console.log("得到的数据" + this.datalist[0])
    },
  }
}
</script>


<style lang="scss" scoped>
  .panel-group {
    margin-top: 18px;

    .card-panel-col {
      margin-bottom: 32px;
    }

    .card-panel {
      height: 108px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
      border-color: rgba(0, 0, 0, .05);

      &:hover {
        .card-panel-icon-wrapper {
          color: #fff;
        }

        .icon-people {
          background: #40c9c6;
        }

        .icon-message {
          background: #36a3f7;
        }

        .icon-money {
          background: #f4516c;
        }

        .icon-shopping {
          background: #34bfa3
        }
      }

      .icon-people {
        color: #40c9c6;
      }

      .icon-message {
        color: #36a3f7;
      }

      .icon-money {
        color: #f4516c;
      }

      .icon-shopping {
        color: #34bfa3
      }

      .card-panel-icon-wrapper {
        float: left;
        margin: 14px 0 0 14px;
        padding: 16px;
        transition: all 0.38s ease-out;
        border-radius: 6px;
      }

      .card-panel-icon {
        float: left;
        font-size: 48px;
      }

      .card-panel-description {
        float: right;
        font-weight: bold;
        margin: 26px;
        margin-left: 0px;

        .card-panel-text {
          line-height: 18px;
          color: rgba(0, 0, 0, 0.45);
          font-size: 16px;
          margin-bottom: 12px;
        }

        .card-panel-num {
          font-size: 20px;
        }
      }
    }
  }

  @media (max-width:550px) {
    .card-panel-description {
      display: none;
    }

    .card-panel-icon-wrapper {
      float: none !important;
      width: 100%;
      height: 100%;
      margin: 0 !important;

      .svg-icon {
        display: block;
        margin: 14px auto !important;
        float: none !important;
      }
    }
  }
</style>

