<template>
  <div>
    <el-card>
      <div slot="header" class="box-card">
        <span class="title">热门搜索数据</span>
        <el-dropdown style="float: right; padding: 3px 0">
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div>
        <el-row :gutter="20">
          <el-col :span="12">
            <LineCharts />
          </el-col>
          <el-col :span="12">
            <LineCharts />
          </el-col>
        </el-row>
      </div>
      <!-- 表格 -->
      <el-table style="width: 100%" border>
        <el-table-column type="index" label="排名" width="80"></el-table-column>
        <el-table-column label="搜索关键字"></el-table-column>
        <el-table-column label="用户数" sortable></el-table-column>
        <el-table-column label="周涨幅" sortable></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination layout="prev, pager, next" :total="1000" class="page">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import LineCharts from "./LineCharts";
export default {
  components: { LineCharts },
};
</script>
<style lang="scss" scope>
.box-card {
  border-bottom: 1px solid #ebeef5;
  padding: 3px 0;
}
.page {
  text-align: right;
}
</style>