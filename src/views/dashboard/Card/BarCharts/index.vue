<template>
  <div class="main" ref="main"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    let myCharts = echarts.init(this.$refs.main);
    myCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "bar",
          data: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
          color: "red",
        },
      ],
      grid: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
      },
    });
  },
};
</script>
<style lang="scss" >
.main {
  width: 100%;
  height: 100%;
}
</style>