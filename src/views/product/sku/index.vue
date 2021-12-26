<template>
  <div>
    <el-table border stripe :data="records">
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column label="名称" prop="skuName"></el-table-column>
      <el-table-column label="描述" prop="skuDesc"></el-table-column>
      <el-table-column label="默认图片">
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt=""
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="80" prop="weight"></el-table-column>
      <el-table-column label="价格" width="80" prop="price"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <HintButton
            type="primary"
            icon="el-icon-sort-down"
            @click="sale(row)"
            title="下架商品"
            v-if="row.isSale == 0"
          />
          <HintButton
            type="success"
            icon="el-icon-sort-up"
            @click="cancel(row)"
            title="上架商品"
            v-else
          />
          <HintButton
            type="primary"
            icon="el-icon-edit"
            title="编辑"
            @click="editInfo"
          />
          <HintButton
            type="info"
            icon="el-icon-info"
            title="查看详情"
            @click="onDetail(row)"
          />
          <HintButton type="danger" icon="el-icon-delete" title="删除" />
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.pageSize"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="total"
    >
    </el-pagination>
    <!-- 抽屉 -->

    <el-drawer :visible.sync="skuDrawer" :with-header="false" size="50%">
      <el-row>
        <el-col :span="5"> 名称 </el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"> 描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"> 价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5"> 商品属性 </el-col>
        <el-col :span="16">
          <el-tag
            type="success"
            v-for="sku in skuInfo.skuAttrValueList"
            :key="sku.id"
            >{{ sku.attrId }}-{{ sku.valueId }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5"> 商品图片 </el-col>
        <el-col :span="16">
          <el-carousel trigger="click" height="150px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
import {
  reqGetSkuList,
  reqSale,
  reqCancel,
  reqGetSkuById,
} from "@/api/product/sku";
export default {
  data() {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 10,
      },
      // sku数据列表
      records: [],
      // 数据总条数
      total: 0,
      // 抽屉弹窗
      skuDrawer: false,
      // 详情数据
      skuInfo: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 获取 sku列表
    async getData() {
      let { pageNum, pageSize } = this.queryInfo;
      let result = await reqGetSkuList(pageNum, pageSize);
      if (result.code === 200) {
        this.total = result.data.total;
        this.records = result.data.records;
        this.queryInfo.pageSize = result.data.size;
      }
    },
    // 分页- 当前数据
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize;
      this.getData();
    },
    // 分页 - 当前页
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage;
      this.getData();
    },
    // 商品下架
    async cancel(row) {
      let result = await reqCancel(row.id);
      if (result.code === 200) {
        row.isSale = 0;
        this.$message.success("下架成功");
      }
    },
    // 商品上架
    async sale(row) {
      let result = await reqSale(row.id);
      if (result.code === 200) {
        row.isSale = 1;
        this.$message.success("上架成功");
      }
    },
    // 编辑提示
    editInfo() {
      this.$message.info("正在开发中");
    },
    // 查看当前ID详情
    async onDetail(sku) {
      let result = await reqGetSkuById(sku.id);
      if (result.code === 200) {
        this.skuInfo = result.data;
      }
      this.skuDrawer = true;
    },
  },
};
</script>
<style>
.el-col {
  margin: 20px 10px;
}
.el-col-5 {
  font-size: 20px;
  text-align: right;
}
.el-tag {
  margin-right: 10px;
}
.el-carousel__item img {
  width: 100%;
  height: 100%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>