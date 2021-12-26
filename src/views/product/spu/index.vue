<template>
  <div>
    <el-card>
      <CategorySelect @getCategoryId="getCategoryId" :show="scene !== 0" />
    </el-card>
    <el-card>
      <div v-show="scene === 0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table border stripe :data="records">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column label="SPU名称" prop="spuName"></el-table-column>
          <el-table-column label="SPU描述" prop="description"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <HintButton
                title="添加"
                icon="el-icon-plus"
                type="success"
                @click="addSku(row)"
              />
              <HintButton
                title="修改"
                icon="el-icon-edit"
                type="warning"
                @click="updateSpu(row)"
              />
              <HintButton
                title="提示"
                icon="el-icon-info"
                type="info"
                @click="handle(row)"
              />
              <HintButton
                title="删除"
                icon="el-icon-delete"
                type="danger"
                @click="deleteSpuId(row)"
              />
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="textalign: center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="queryInfo.pageSize"
          layout="prev, pager, next, jumper,->,total, sizes"
          :total="total"
        >
        </el-pagination>
      </div>
      <SpuForm v-show="scene === 1" @changeScene="changeScene" ref="spu" />
      <SkuForm v-show="scene === 2" ref="sku" @changeScene="changeScene" />
    </el-card>

    <el-dialog
      :title="`${spu.spuName}的列表`"
      :visible.sync="dialogVisible"
      width="50%"
      @before-close="resetClose"
    >
     <el-table :data="spuList" border  v-loading="loading">
       <el-table-column label="名称" prop="skuName"></el-table-column>
       <el-table-column label="价格" prop="price" width="80" ></el-table-column>
       <el-table-column label="重量" prop="weight" width="80"></el-table-column>
       <el-table-column label="默认图片"  width="120">
         <template slot-scope="{row}">
           <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px;">
         </template>
       </el-table-column>
     </el-table>
    </el-dialog>
  </div>
</template>

<script>
import CategorySelect from "@/components/categorySelect/index.vue";
import SkuForm from "./skuForm";
import SpuForm from "./spuForm";
import { reqGetSpuList, reqDeleteSpu ,reqCancelList} from "@/api/product/spu";
import {  } from "@/api/product/sku";
export default {
  components: { CategorySelect, SkuForm, SpuForm },
  data() {
    return {
      // 保存三级联动的1 2 3 ID
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 获取表格数据的条数
      queryInfo: {
        pageNum: 1,
        pageSize: 3,
      },
      // 三级联动获取数据
      records: [],
      // 表格总数据
      total: 0,
      // 切换场景
      scene: 0,
      // spu弹窗
      dialogVisible:false,
      // spu弹窗表格数据
      spuList:[],
      // 当前spu数据
      spu:{},
      // 加载loading
      loading:true
    };
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category1Id = categoryId;
        this.category2Id = "";
        this.category3Id = "";
      } else if (level === 2) {
        this.category2Id = categoryId;
        this.category3Id = "";
      } else {
        this.category3Id = categoryId;
        // 发送请求
        this.getSpuList();
      }
    },
    // 获取三级联动的spu 数据列表
    async getSpuList() {
      let {
        queryInfo: { pageSize, pageNum },
        category3Id,
      } = this;
      let data = await reqGetSpuList(pageNum, pageSize, category3Id);
      if (data.code === 200) {
        this.records = data.data.records;
        this.total = data.data.total;
        this.queryInfo.pageSize = data.data.size;
      }
    },
    // 分页 条数
    handleSizeChange(size) {
      this.queryInfo.pageSize = size;
      this.getSpuList();
    },
    // 分页当前页
    handleCurrentChange(page) {
      this.queryInfo.pageNum = page;
      this.getSpuList();
    },
    // 切换到添加区域spu
    addSpu() {
      this.scene = 1;
      this.$refs.spu.addSpuData(this.category3Id);
    },
    // 切换到添加区域spu修改
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.updateInfoSpu(row);
    },
    // 切换场景接收数字
    changeScene(scene) {
      this.scene = scene;
      this.getSpuList();
    },
    // 删除 spu列表
    deleteSpuId(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await reqDeleteSpu(row.id);
          if (result.code === 200) {
            this.$message.success("删除成功");
            this.getSpuList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 添加到sku列表
    addSku(row) {
      this.scene = 2;
      this.$refs.sku.getData(this.category1Id, this.category2Id, row);
    },
    // sku提示数据展示
    async handle(row) {
      this.spu = row
      let result = await reqCancelList(row.id);
      if(result.code === 200){
        this.spuList = result.data
        this.loading = false
      }
      this.dialogVisible = true
    },
    // 对话框关闭回调
    resetClose(){
      this.spuList = []
      this.loading = true
    }
  },
};
</script>