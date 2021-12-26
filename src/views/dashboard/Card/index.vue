<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <Detail title="总销售额" number="￥126560">
            <template slot="charts">
              <span>周同比</span>
              <span
                >56.67%
                <svg
                  t="1640350073601"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4235"
                  width="12"
                  height="12"
                >
                  <path
                    d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z"
                    p-id="4236"
                    fill="#d81e06"
                  ></path></svg
              ></span>
              <span>日同比</span>
              <span
                >19.16%<svg
                  t="1640351067370"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6137"
                  width="16"
                  height="16"
                >
                  <path
                    d="M787.2 380.8c-9.6-9.6-22.4-12.8-35.2-12.8l-480 3.2c-12.8 0-25.6 3.2-35.2 12.8-19.2 19.2-19.2 48 0 67.2l240 240c0 0 0 0 0 0 0 0 0 0 0 0 3.2 3.2 9.6 6.4 12.8 9.6 0 0 3.2 3.2 3.2 3.2 16 6.4 38.4 3.2 51.2-9.6l240-243.2C806.4 428.8 803.2 400 787.2 380.8z"
                    p-id="6138"
                    fill="#1afa29"
                  ></path></svg
              ></span>
            </template>
            <template slot="footer">
              <span>日销售额</span>
              <span>￥12323</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" number="88460">
            <template slot="charts">
              <line-charts />
            </template>
            <template slot="footer">
              <span>日访问量</span>
              <span>12323</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" number="88468">
            <template slot="charts">
              <BarCharts />
            </template>
            <template slot="footer">
              <span>转化率</span>
              <span>65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" number="78%">
            <template slot="charts">
              <ProgressCharts />
            </template>
            <template slot="footer">
              <span>周同比</span>
              <span
                >12%
                <svg
                  t="1640350073601"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="4235"
                  width="12"
                  height="12"
                >
                  <path
                    d="M583.93 296.842l234.8 318.515a73.059 73.059 0 0 1-14.99 102.048l-2.62 1.806a78.116 78.116 0 0 1-44.612 13.908h-469.6a75.588 75.588 0 0 1-76.762-74.414 72.878 72.878 0 0 1 14.269-43.348l234.8-318.515a78.568 78.568 0 0 1 106.834-16.888 77.574 77.574 0 0 1 17.881 16.888z"
                    p-id="4236"
                    fill="#d81e06"
                  ></path></svg
              ></span>
              <span>日同比</span>
              <span
                >11%<svg
                  t="1640351067370"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="6137"
                  width="16"
                  height="16"
                >
                  <path
                    d="M787.2 380.8c-9.6-9.6-22.4-12.8-35.2-12.8l-480 3.2c-12.8 0-25.6 3.2-35.2 12.8-19.2 19.2-19.2 48 0 67.2l240 240c0 0 0 0 0 0 0 0 0 0 0 0 3.2 3.2 9.6 6.4 12.8 9.6 0 0 3.2 3.2 3.2 3.2 16 6.4 38.4 3.2 51.2-9.6l240-243.2C806.4 428.8 803.2 400 787.2 380.8z"
                    p-id="6138"
                    fill="#1afa29"
                  ></path></svg
              ></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import LineCharts from "./LineCharts/index.vue";
import BarCharts from "./BarCharts/index.vue";
import ProgressCharts from "./ProgressCharts/index.vue";
export default {
  components: { Detail, LineCharts, BarCharts, ProgressCharts },
  mounted() {},
};
</script>

<style lang="scss" scope>
.icon {
  position: relative;
  bottom: -2px;
}
span {
  margin-right: 8px;
}
</style>