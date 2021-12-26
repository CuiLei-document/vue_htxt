<template>
  <div class="line">
    <div class="title">
      <span>搜索用户数据</span>
      <svg
        t="1640348950646"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="1803"
        width="16"
        height="16"
      >
        <path
          d="M513.8 97.1C284.5 97.1 98 283.6 98 512.9s186.5 415.8 415.8 415.8 415.8-186.5 415.8-415.8S743 97.1 513.8 97.1z m0 792.9c-207.9 0-377.1-169.2-377.1-377.1 0-207.9 169.2-377.1 377.1-377.1 207.9 0 377.1 169.2 377.1 377.1 0 207.9-169.2 377.1-377.1 377.1z m70.5-245.3c-20.5-5.1-38.7 68.3-70.3 57.7-3-1.1-2.7-0.7-5-2.5 9.7-104.9 52.5-198.4 72.8-301.1h-5c-42 14.8-104.8 8.9-145.6 25.1v12.5c60.7-1.2 44.9 35.8 32.6 80.3-15.2 55-42.9 123.8-47.7 173.2-4.8 49.3 25.7 67.9 55.2 67.7 41.7-0.2 76.9-41.1 95.4-65.2 4.7-6.2 38.1-42.6 17.6-47.7z m-23.7-401.3c-28.4 0-51.3 23-51.3 51.4s23 51.3 51.3 51.3c28.3 0 51.3-23 51.3-51.3 0-28.4-23-51.4-51.3-51.4z"
          p-id="1804"
          fill="#8a8a8a"
        ></path>
      </svg>
    </div>
    <div class="content">
      <span class="content-num">123321</span>
      <span>17.1</span>
    <svg t="1640493812700" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6818" width="16" height="16"><path d="M325.456471 862.280661" p-id="6819" fill="#d81e06"></path><path d="M882.057788 862.280661" p-id="6820" fill="#d81e06"></path><path d="M236.028491 877.160382" p-id="6821" fill="#d81e06"></path><path d="M960.132455 877.160382" p-id="6822" fill="#d81e06"></path><path d="M63.683483 788.736998" p-id="6823" fill="#d81e06"></path><path d="M958.469023 788.736998" p-id="6824" fill="#d81e06"></path><path d="M64.77753 858.792098" p-id="6825" fill="#d81e06"></path><path d="M861.417121 738.727375c41.604731 0 65.233383-54.963795 34.928639-85.258218L547.071415 304.191372c-20.029996-20.031716-49.822121-20.031716-69.853837 0L127.955275 653.469157c-31.085714 31.073673-5.136514 85.258218 35.441258 85.258218L861.417121 738.727375 861.417121 738.727375z" p-id="6826" fill="#d81e06"></path><path d="M959.523505 858.792098" p-id="6827" fill="#d81e06"></path></svg>
    <svg t="1640502568946" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7921" width="16" height="16"><path d="M325.456471 862.280661" p-id="7922" fill="#1afa29"></path><path d="M882.057788 862.280661" p-id="7923" fill="#1afa29"></path><path d="M236.028491 877.160382" p-id="7924" fill="#1afa29"></path><path d="M960.132455 877.160382" p-id="7925" fill="#1afa29"></path><path d="M63.683483 788.736998" p-id="7926" fill="#1afa29"></path><path d="M958.469023 788.736998" p-id="7927" fill="#1afa29"></path><path d="M64.77753 858.792098" p-id="7928" fill="#1afa29"></path><path d="M163.396533 289.168875c-40.577772 0-66.525252 54.184545-35.441258 85.258218L477.217578 723.704878c20.031716 20.031716 49.823841 20.031716 69.853837 0l349.274345-349.277785c30.304744-30.294423 6.677812-85.258218-34.928639-85.258218L163.396533 289.168875 163.396533 289.168875z" p-id="7929" fill="#1afa29"></path><path d="M959.523505 858.792098" p-id="7930" fill="#1afa29"></path></svg>
    </div>
    <div class="charts" ref="charts"></div>
    
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  mounted() {
    let myCharts = echarts.init(this.$refs.charts);
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
          data: [20, 12, 30, 10, 18, 15, 26, 21, 18, 15, 26, 21],
          color: "#6d97e8",
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
                  color: "#6d97e8", // 0% 处的颜色
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
.line {
  .title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 8px;
    align-items: center;
    color: #868589;
  }
  .content {
    .content-num {
      margin-right: 20px;
      font-size: 22px;
    }
  }
  .charts {
    width: 100%;
    height: 70px;
  }
}
</style>