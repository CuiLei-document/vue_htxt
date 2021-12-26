<template>
  <div ref="main" class="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    let myCharts = echarts.init(this.$refs.main);
    myCharts.setOption({
      xAxis: {
        show: false,
        // 设置x轴平均分布,看起来更均匀
        type: "category",
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "line",
          data: [
            20, 12, 30, 10, 18, 15, 26, 21, 18, 15, 26, 21, 18, 15, 26, 21,
          ],
          color: "purple",
          // 设置折线平滑
          smooth: true,
          // 颜色不透明
          itemStyle: {
            opacity: 0,
          },
          // 区域填充样式
          areaStyle: {
            // 可以设置填充颜色的渐变效果
            color: {
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "white", // 100% 处的颜色
                },
              ],
            },
          },
        },
      ],
      // 布局
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
<style lang="scss">
.charts {
  width: 100%;
  height: 100%;
}
</style>