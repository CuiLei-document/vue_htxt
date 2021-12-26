<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="SPU属性名称" :model="spu">
        <el-input
          placeholder="请输入SPU属性名称"
          v-model="spu.spuName"
        ></el-input>
      </el-form-item>
      <el-form-item label="品牌名称">
        <el-select value="" placeholder="请输入品牌名称" v-model="spu.tmId">
          <el-option
            :label="tm.tmName"
            :value="tm.id"
            v-for="tm in tradeMarkList"
            :key="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input type="textarea" rows="4" v-model="spu.description"></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :file-list="imgList"
          :on-success="handleSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          value=""
          :placeholder="`还有${unSaleAttr.length}个属性未选择`"
          v-model="saleIdOrName"
        >
          <el-option
            :label="sale.name"
            :value="`${sale.id}:${sale.name}`"
            v-for="sale in unSaleAttr"
            :key="sale.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!saleIdOrName"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table border stripe :data="spu.spuSaleAttrList">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
          <el-table-column label="属性名称列表">
            <!-- 
                
                 -->
            <template slot-scope="{ row }">
              <el-tag
                :key="tag.id"
                v-for="(tag, index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="handleClose(row.spuSaleAttrValueList, index)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @blur="handleInputConfirm(row)"
                @keyup.enter.native="handleInputConfirm(row)"
              >
              </el-input>
              <!-- -->
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row)"
                >添加</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeSale(scope.$index)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addSpu">添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  reqGetSpu,
  reqGetTradeMark,
  reqGetSpuImageList,
  reqGetSakeAttrList,
  reqAddOrUpdateId,
} from "@/api/product/spu";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // spu基本信息
      spu: {
        // 三级ID
        category3Id: 0,
        // 商品描述
        description: "",
        // 图片的收集
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        // 属性名称
        spuName: "",
        // 销售属性
        spuSaleAttrList: [
          //   {
          //     baseSaleAttrId: 0,
          //     id: 0,
          //     saleAttrName: "string",
          //     spuId: 0,
          //     spuSaleAttrValueList: [
          //       {
          //         baseSaleAttrId: 0,
          //         id: 0,
          //         isChecked: "string",
          //         saleAttrName: "string",
          //         saleAttrValueName: "string",
          //         spuId: 0,
          //       },
          //     ],
          //   },
        ],
        //品牌的ID
        tmId: '',
      },
      // 品牌名称数据
      tradeMarkList: [],
      // 图片信息
      imgList: [],
      // 销售属性
      sakeAttrList: [],
      // 品牌属性ID的收集
      saleIdOrName: "",
    };
  },
  computed: {
    unSaleAttr() {
      return this.sakeAttrList.filter((item) => {
        return this.spu.spuSaleAttrList.every((item1) => {
          return item.name !== item1.saleAttrName;
        });
      });
    },
  },
  methods: {
    // 删除的回调
    handleRemove(file, fileList) {
      this.imgList = fileList;
    },
    // dialog 弹窗回调
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传成功的回调
    handleSuccess(response, file, fileList) {
      this.imgList = fileList;
    },
    // 初始化获取数据
    async updateInfoSpu(row) {
      // 获取spu 基本信息
      let spuData = await reqGetSpu(row.id);
      if (spuData.code === 200) {
        this.spu = spuData.data;
      }
      // 获取品牌名称数据
      this.getTradeMark();
      //获取图片信息
      let imgData = await reqGetSpuImageList(row.id);
      if (imgData.code === 200) {
        imgData.data.forEach((item) => {
          item.name = item.imgName;
          item.url = item.imgUrl;
        });
        this.imgList = imgData.data;
      }
      // 获取全部销售属性信息
      this.getSakeAttrList()
    },
    // 获取品牌的数据
    async getTradeMark() {
      // 获取品牌名称数据
      let tradeMark = await reqGetTradeMark();
      if (tradeMark.code === 200) {
        this.tradeMarkList = tradeMark.data;
      }
    },
    // 获取销售数据的数据
    async getSakeAttrList() {
      // 获取全部销售属性信息
      let sakeData = await reqGetSakeAttrList();
      if (sakeData.code === 200) {
        this.sakeAttrList = sakeData.data;
      }
    },
    // 收集销售属性ID和NAME
    addSaleAttr() {
      let [baseSaleAttrId, saleAttrName] = this.saleIdOrName.split(":");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      this.saleIdOrName = "";
    },

    // 切换button和input
    showInput(row) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
      this.$nextTick(() => {
        this.$refs.saveTagInput.focus();
      });
    },
    // 失去焦点生成tag
    handleInputConfirm(row) {
      const { baseSaleAttrId, inputValue: saleAttrValueName } = row;
      if (saleAttrValueName.trim() === "") {
        this.$message.info("标签不能为空");
        return;
      }
      let someValue = row.spuSaleAttrValueList.some((item) => {
        return item.saleAttrValueName === saleAttrValueName;
      });
      if (someValue) {
        return this.$message.error("标签重复了");
      }
      row.spuSaleAttrValueList.push({ baseSaleAttrId, saleAttrValueName });
      row.inputVisible = false;
    },
    // 删除tag标签
    handleClose(row, index) {
      row.splice(index, 1);
    },
    // 删除table
    removeSale(index) {
      this.spu.spuSaleAttrList.splice(index, 1);
    },
    // 数据提交
    async addSpu() {
      let imgList = this.imgList.map((item) => {
        return {
          imgName: item.name,
          imgUrl: item.response?.data || item.imgUrl,
        };
      });
      this.spu.spuImageList = imgList;
      let result = await reqAddOrUpdateId(this.spu);
      if (result.code === 200) {
        this.$message.success("更新成功");
        this.$emit("changeScene", 0);
      }
      // 保存之后清空数据
       Object.assign(this._data,this.$options.data())
    },
    // 添加操作
    addSpuData(category3Id) {
      this.spu.category3Id = category3Id
      // 获取品牌信息
      this.getTradeMark()
      // 获取销售属性信息
      this.getSakeAttrList()
    },
    // 取消返回 scene 0
    cancel(){
      // this._data 是当前实例的data 所有属性
      // this.$options.data() 是执行data函数返回一个新的对象 覆盖实例的data
      // Object.assign 合并两个对象，相同的会被覆盖
      Object.assign(this._data,this.$options.data())
      this.$emit('changeScene', 0)
    }
  },
};
</script>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>