<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" @click="addVisible"
      >添加</el-button
    >
    <el-card>
      <el-table style="width: 100%" border stripe :data="tradeList">
        <el-table-column
          width="100"
          type="index"
          label="序号"
        ></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO">
          <template slot-scope="scope">
            <img
              :src="scope.row.logoUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-edit"
              @click="editTradeMark(scope.row)"
              >修改
            </el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-delete"
              @click="removeTradeMark(scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[3, 5, 10, 15]"
        :page-count="7"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加和修改弹窗 -->
    <el-dialog
      :title="isTitle"
      :visible.sync="tradeDialogVisible"
      width="50%"
      @close="handleDialog"
    >
      <el-form
        :model="tradeForm"
        label-width="100px"
        style="width: 70%"
        ref="tradeRef"
        :rules="tradeRules"
      >
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="tradeForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="tradeForm.logoUrl"
              :src="tradeForm.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="tradeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTradeForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqGetTradeList,
  reqTradeSaveOrUpdate,
  reqRemoveTradeMarkId,
} from "@/api/product/tradeMark";
export default {
  data() {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 3,
      },
      // 品牌列表
      tradeList: [],
      // 列表总条数
      total: 0,
      // 添加和修改弹窗
      tradeDialogVisible: false,
      // 添加品牌表单
      tradeForm: {
        tmName: "",
        logoUrl: "",
      },
      // 添加品牌表单验证
      tradeRules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          { min: 6, max: 15, message: "请输入6~15个字符", trigger: "blur" },
        ],
        logoUrl: [{ required: true, message: "请选择图片", trigger: "blur" }],
      },
    };
  },
  computed: {
    isTitle() {
      if (!this.tradeForm.id) {
        return "添加数据";
      } else {
        return "修改数据";
      }
    },
  },
  created() {
    // 获取品牌商品列表
    this.getTradeList();
  },
  methods: {
    // 获取品牌商品列表
    async getTradeList() {
      let { pageNum, pageSize } = this.queryInfo;
      let data = await reqGetTradeList(pageNum, pageSize);
      if (data.code === 200) {
        this.total = data.data.total;
        this.tradeList = data.data.records;
      } else {
        this.$message.error("获取失败");
      }
    },
    // 数据条数
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getTradeList();
    },
    // 当前页码
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getTradeList();
    },
    // 添加弹窗
    addVisible() {
      this.tradeDialogVisible = true;
    },
    // 图片上传成功的回调
    handleAvatarSuccess(res, file) {
      console.log(res);
      this.tradeForm.logoUrl = res.data;
    },
    // 图片上传之前的回调
    beforeAvatarUpload(file) {
      console.log(file);
    },
    // 关闭弹窗触发
    handleDialog() {
      this.tradeForm.logoUrl = "";
      this.tradeForm.tmName = "";
      if (this.tradeForm.id) {
        delete this.tradeForm.id;
      }
    },
    // 添加确定表单
    addTradeForm() {
      this.$refs.tradeRef.validate(async (valid) => {
        if (valid) {
          let data = await reqTradeSaveOrUpdate(this.tradeForm);
          if (data.code === 200) {
            this.$message.success(this.tradeForm.id ? "修改成功" : "添加成功");
            this.getTradeList();
            this.tradeDialogVisible = false;
          } else {
            this.$message.error("添加失败");
          }
        }else{
            return false
        }
      });
    },
    // 修改弹窗
    editTradeMark(row) {
      this.tradeForm = { ...row };
      this.tradeDialogVisible = true;
    },
    // 删除tradeMark表单
    async removeTradeMark(row) {
      // reqRemoveTradeMarkId
      let confirm = await this.$confirm("是否删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      });
      if(confirm === 'confirm'){
          let data = await reqRemoveTradeMarkId(row.id)
          if(data.code === 200){
              this.$message.success('删除成功')
              this.getTradeList()
          }else{
              this.$message.error('删除失败')
          }
      }
    },
  },
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>