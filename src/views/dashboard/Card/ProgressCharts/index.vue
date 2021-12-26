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
        // 设置x轴的最小值
        min: 0,
        // 设置x轴的最大值
        max: 100,
      },
      yAxis: {
        show: false,
        // 平均分布
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "pink",
          // 图表的宽度
          barWidth: 10,
          // 显示背景颜色 true || false
          showBackground: true,
          // 设置背景颜色
          backgroundStyle: {
            color: "#eee",
          },
          // 设置图表上的提示显示
          label: {
            show: true,
            formatter: "|",
            position: "right",
            color: "red",
          },
        },
      ],
      grid: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      },
    });
  },
};
</script>
<style lang="scss" scope>
.main {
  width: 100%;
  height: 100%;
}
</style>