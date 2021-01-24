<template>
  <div class="app-container">
<div>
    <el-row>
      <el-col :span="1" class="grid">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          size="mini"
          round
          @click="addFlag=true,dialogVisible = true "
        >新增</el-button>

      </el-col>
    </el-row>
</div>
    <br>
    <el-table
      :data="userList"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" type="index" width="80px" align="center">
        <template slot-scope="scope">
          <span>{{ (page - 1) * size + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="userName" label="姓名" />
      <el-table-column prop="loginName" label="登录账号" />
      <el-table-column prop="userAddress" label="地址" />
      <el-table-column prop="userDate" label="创建日期" />

      <el-table-column label="编辑" width="100">
        <template slot-scope="scope">

          <el-button type="warning" icon="el-icon-edit" size="mini" @click="edituser(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
      <el-table-column label="删除" width="100">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deluser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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


    <el-dialog
      :title="addFlag?'新增用户':'修改用户'"
      style="text-align:left !important"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="80px">
           <el-form-item label="姓名" style="width:300px">
               <el-input v-model="user.userName" placeholder="请输入用户名" />
           </el-form-item>
           <el-form-item label="登录名" style="width:300px">
               <el-input v-model="user.loginName" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="地址" style="width:400px">
               <el-input v-model="user.userAddress" placeholder="请输入地址" />
          </el-form-item>
        <el-form-item label="登录密码" style="width:400px">
          <el-input v-model="user.userPassword" placeholder="请输入登录密码" />
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" @click="addFlag?saveuser():updateuser()">提交</el-button>
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提示"
      style="text-align:left !important"
      :visible.sync="dialog2Visible"
      :before-close="handleClose"
    >
      <span>你确定要删除此用户?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDel()">提交</el-button>
        <el-button type="primary" @click="dialog2Visible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList, findUserList, addUser, editUser, delUser } from '@/api/table'

export default {

  data() {
    return {
      dialogVisible: false,
      dialog2Visible: false,
      activeIndex2: '1',
      total: 0,
      size: 5,
      page: 1,
      userList: [],
      user: {},
      addFlag: true,
      curId: '' ,

      visible2:true
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
    this.getuserList()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    }, //判断渲染，true:暗文显示，false:明文显示
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
    async getuserList() {
      const { data } = await findUserList(this.page, this.size)
      this.userList = data.list
      console.log('请求到的用户列表' + '  ' + data.total + '  ' + this.userList)
      this.total = data.total
    },
    async saveuser() {
      const { data } = await addUser(this.user)
      console.log(data)
      this.dialogVisible = false
      this.user = {}
      this.getuserList()
    },
    async updateuser() {
      const { data } = await editUser(this.user)
      this.dialogVisible = false
      this.user = {}
      this.getuserList()
    },
    deluser(row) {
      this.addFlag = false
      this.dialog2Visible = true
      this.curId = row.userId
    },

    async handleDel() {
      const { data } = await delUser(this.curId)

      this.dialog2Visible = false
      this.getuserList()
    },

    edituser(row) {
      this.user = row
      this.dialogVisible = true
      this.addFlag = false
    }
  }
}
</script>
