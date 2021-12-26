<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称"> {{ skuInfo.spuName }} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuForm.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" v-model="skuForm.price"></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuForm.weight"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" rows="4" v-model="skuForm.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item
            :label="attr.attrName"
            v-for="attr in skuBaseInfo"
            :key="attr.id"
          >
            <el-select placeholder="请选择" v-model="attr.attrIdOrValueId">
              <el-option
                :label="attrValue.valueName"
                :value="`${attr.id}:${attrValue.id}`"
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form>
          <el-form-item
            :label="sale.saleAttrName"
            v-for="sale in skuSaleList"
            :key="sale.id"
          >
            <el-select placeholder="请选择" v-model="sale.saleIdOrValueId">
              <el-option
                :label="saleValue.saleAttrValueName"
                :value="`${sale.id}:${saleValue.id}`"
                v-for="saleValue in sale.spuSaleAttrValueList"
                :key="saleValue.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          border
          stripe
          :data="skuImgList"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="60"
            align="center"
          ></el-table-column>
          <el-table-column label="图片属性">
            <template slot-scope="scope">
              <img
                :src="scope.row.imgUrl"
                alt=""
                style="width: 100px; height: 100px"
              />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{ row }">
              <el-button
                type="primary"
                v-if="row.isDefault === 0"
                @click="changeDefault(row)"
                >设置默认</el-button
              >
              <el-button type="success" v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveBtn">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  reqGetSkuImageList,
  reqGetSaleAttrList,
  reqGetAttrInfoList,
  reqSkuForm
} from "@/api/product/spu";
export default {
  data() {
    return {
      skuImgList: [], // 图片信息
      skuSaleList: [], // 销售属性
      skuBaseInfo: [], // 平台数据
      // 当前数据
      skuInfo: {},
      // 提交数据
      skuForm: {
        category3Id: '',
        spuId: '',
        tmId: '',
        skuName: "",
        price: '',
        weight: "",
        skuDesc: "",
        skuDefaultImg: "",
        skuAttrValueList: [
          //   {
          //     attrId: 0,
          //     valueId: 0,
          //   },
        ],
        skuImageList: [
          //   {
          //     id: 0,
          //     imgName: "string",
          //     imgUrl: "string",
          //     isDefault: "string",
          //     skuId: 0,
          //     spuImgId: 0,
          //   },
        ],
        skuSaleAttrValueList: [
          //   {
          //     saleAttrId: 0,
          //     saleAttrValueId: 0,
          //   },
        ],
      },
      // 图片的收集
      imgList: [],
    };
  },
  methods: {
    // 初始化数据
    async getData(category1Id, category2Id, spu) {
      this.skuInfo = spu;
      this.skuForm.category3Id = spu.category3Id;
      this.skuForm.spuId = spu.id;
      this.skuForm.tmId = spu.tmId;
      // 图片信息
      let result = await reqGetSkuImageList(spu.id);
      if (result.code === 200) {
        result.data.forEach((item) => {
          item.isDefault = 0;
        });
        this.skuImgList = result.data;
      }
      // 获取销售属性
      let result1 = await reqGetSaleAttrList(spu.id);
      if (result1.code === 200) {
        this.skuSaleList = result1.data;
      }
      // 获取平台基础数据
      let result2 = await reqGetAttrInfoList(category1Id, category2Id, spu.id);
      if (result2.code === 200) {
        this.skuBaseInfo = result2.data;
      }
    },
    // 设置 table 按钮默认设置
    changeDefault(row) {
      this.skuImgList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.skuForm.skuDefaultImg = row.imgUrl;
    },
    // 收集table 图片
    handleSelectionChange(imgList) {
      this.imgList = imgList;
    },
    // 提交数据
    async saveBtn() {
      const { skuBaseInfo, skuSaleList, skuForm, imgList } = this;
      skuForm.skuAttrValueList = skuBaseInfo.reduce((sum, item) => {
        if (item.attrIdOrValueId) {
          let [attrId, valueId] = item.attrIdOrValueId.split(":");
          sum.push({ attrId, valueId });
        }
        return sum;
      }, []);
      skuForm.skuSaleAttrValueList = skuSaleList.reduce((prev, item) => {
        if (item.saleIdOrValueId) {
          let [saleAttrId, saleAttrValueId] = item.saleIdOrValueId.split(":");
          prev.push({ saleAttrId, saleAttrValueId });
        }
        return prev;
      }, []);
      skuForm.skuImageList = imgList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          spuImgId: item.id,
        };
      });
      let result = await reqSkuForm(skuForm)
      if(result.code === 200){
          this.$message.success('保存成功')
          this.$emit('changeScene',0)
      }
    },
  },
};
</script>