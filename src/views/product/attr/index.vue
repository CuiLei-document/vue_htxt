<template>
  <div>
    <el-card>
      <category-select @getCategoryId="getCategoryId" :show="!isTableShow" />
    </el-card>
    <el-card>
      <!-- 展示表格数据 -->
      <div v-show="isTableShow">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加</el-button
        >
        <el-table :data="attrList" border stripe style="width: 100%">
          <el-table-column type="index" label="#" width="80"></el-table-column>
          <el-table-column
            label="属性名称"
            width="150"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值列表">
            <template slot-scope="scope">
              <el-tag
                style="margin: 0 10px"
                type="success"
                v-for="attrValue in scope.row.attrValueList"
                :key="attrValue.id"
              >
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                type="warning"
                icon="el-icon-edit"
                @click="updateAttr(scope.row)"
              ></el-button>
              <el-button type="danger" icon="el-icon-delete"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 添加表格数据 -->
      <div v-show="!isTableShow">
        <el-form label-width="80px" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              style="width: 180px"
              placeholder="请输入属性名"
              v-model="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addTableInfo"
          >添加属性</el-button
        >
        <el-button @click="isTableShow = true">取消</el-button>
        <el-table
          border
          stripe
          style="marginbottom: 20px"
          :data="attrInfo.attrValueList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.valueName"
                size="mini"
                v-if="scope.row.flag"
                @blur="totalVisible(scope.row)"
                @keyup.native.enter="totalVisible(scope.row)"
                :ref="scope.$index"
              ></el-input>
              <span
                v-else
                @click="toEdit(scope.row, scope.$index)"
                style="display: block"
                >{{ scope.row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeAttrValue(scope.row.$index)"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addUpdateOrAttr" :disabled="attrInfo.attrValueList.length < 1" >保存</el-button>
        <el-button @click="isTableShow = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import CategorySelect from "@/components/categorySelect/index.vue";

import cloneDeep from "lodash/cloneDeep";
import { reqGetAttrList, reqSaveAttrInfo } from "@/api/product/attr";
export default {
  components: { CategorySelect },
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      // 三级菜单数据
      attrList: [],
      // 切换添加表单显示
      isTableShow: true,
      // 收集表单数据
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    getCategoryId({ categoryId, level }) {
      if (level === 1) {
        this.category2Id = "";
        this.category3Id = "";
        this.category1Id = categoryId;
      } else if (level === 2) {
        this.category3Id = "";
        this.category2Id = categoryId;
      } else {
        this.category3Id = categoryId;
        // 有了三级Id 之后发送请求
        // console.log(categoryId)
        this.getAttrList();
      }
    },
    // 获取三级联动菜单的数据
    async getAttrList() {
      let { category1Id, category2Id, category3Id } = this;
      console.log(category1Id, category2Id, category3Id);
      let data = await reqGetAttrList(category1Id, category2Id, category3Id);
      if (data.code === 200) {
        this.attrList = data.data;
      }
    },
    // 添加表格表单
    addTableInfo() {
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    // 切换到添加表单
    addAttr() {
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
      };
      this.isTableShow = false;
    },
    // 修改表单数据
    updateAttr(row) {
      // row.attrValueList.forEach(item=>{
      //   item.flag = false
      // })
      this.attrInfo = cloneDeep(row);
      this.attrInfo.attrValueList.forEach((item) => {
        this.$set(item, "flag", false);
      });
      console.log(row);
      this.isTableShow = false;
    },
    // 切换input和span的显示
    totalVisible(row) {
      if (row.valueName.trim() === "") {
        this.$message.info("请输入属性值名称");
        return;
      }
      let name = this.attrInfo.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName === item.valueName;
        }
      });
      if (name) return this.$message.info("属性值名称重复了");
      row.flag = false;
    },
    // 点击span 获取焦点
    toEdit(row, index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 删除表格
    removeAttrValue(index) {
      console.log(index);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.attrInfo.attrValueList.splice(index, 1);
          this.$message.success("删除成功");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 保存数据
    async addUpdateOrAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName !== "") {
            delete item.flag;
            return true;
          }
        }
      );
      try {
        await reqSaveAttrInfo(this.attrInfo) 
        this.$message.success('保存成功')
        this.getAttrList()
        this.isTableShow = true
      } catch (error) {
        this.$message.error('保存失败')
      }
    },
  },
};
</script>