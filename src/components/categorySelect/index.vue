<template>
  <div>
    <el-form :inline="true" :model="attrForm" class="demo-form-inline">
      <el-form-item label="一级菜单">
        <el-select
          placeholder="请选择"
          v-model="attrForm.category1Id"
          @change="handle1"
          :disabled="show"
        >
          <el-option
            :label="cate.name"
            :value="cate.id"
            v-for="cate in list1"
            :key="cate.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级菜单">
        <el-select
          placeholder="请选择"
          v-model="attrForm.category2Id"
          @change="handle2"
          :disabled="show"
        >
          <el-option
            :label="cate.name"
            :value="cate.id"
            v-for="cate in list2"
            :key="cate.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级菜单">
        <el-select
          placeholder="请选择"
          v-model="attrForm.category3Id"
          @change="handle3"
          :disabled="show"
        >
          <el-option
            :label="cate.name"
            :value="cate.id"
            v-for="cate in list3"
            :key="cate.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  reqGetCategory1Id,
  reqGetCategory2Id,
  reqGetCategory3Id,
} from "@/api/product/attr";
export default {
  props:['show'],
  data() {
    return {
      // 收集表单数据
      attrForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      // 一级下拉菜单数据列表
      list1: [],
      // 二级下拉菜单数据
      list2: [],
      // 三级下拉菜单数据
      list3: [],
    };
  },
  created() {
    // 获取平台属性一级ID列表数据
    this.getCategoryList();
  },
  methods: {
    // 获取平台属性一级ID列表数据
    async getCategoryList() {
      let data = await reqGetCategory1Id();
      if (data.code === 200) {
        this.list1 = data.data;
      }
    },
    // 一级菜单触发函数
    async handle1() {
      this.attrForm.category2Id = ''
      this.attrForm.category3Id = ''
      this.list2 = ''
      this.list3 = ''
      let { category1Id } = this.attrForm;
      let data = await reqGetCategory2Id(category1Id);
      if (data.code === 200) {
        this.list2 = data.data;
      }
      this.$emit('getCategoryId',{categoryId:category1Id,level:1})
    },
    // 二级菜单触发函数
    async handle2() {
      this.attrForm.category3Id = ''
      this.list3 = ''
      let { category2Id } = this.attrForm;
      let data = await reqGetCategory3Id(category2Id);
      if (data.code === 200) {
        this.list3 = data.data;
      }
      this.$emit('getCategoryId',{categoryId:category2Id,level:2})
    },
    handle3() {
      let { category3Id } = this.attrForm;
      this.$emit('getCategoryId',{categoryId:category3Id,level:3})
    },
  },
};
</script>