<template>
  <div>
    <el-card>
      <div slot="header" class="box-card">
        <span class="title">销售额类别比例</span>
        <el-radio-group v-model="cateValue" size="mini" class="radio">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
      <div class="content">
        <div class="chart" ref="charts"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      cateValue: "全部渠道",
    };
  },
  mounted() {
    let myCharts = echarts.init(this.$refs.charts);
    myCharts.setOption({
      title: {
        // 主标题
        text: "视频",
        // 子标题
        subtext: "1044",
        // 标题位置
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      // 头部点击显示和隐藏数据
      // legend: {
      //   top: "5%",
      //   left: "center",
      // },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: "#fff",
            borderWidth: 2,
          },
          // label 显示图像数据提示
          label: {
            show: true,
            position: "outside",
          },
          // 显示图像数据的放大效果
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: "40",
          //     fontWeight: "bold",
          //   },
          // },
          // 显示 外部数据和图像的线条连接
          labelLine: {
            show: true,
          },
          data: [
            { value: 1048, name: "视频" },
            { value: 735, name: "娱乐" },
            { value: 580, name: "游戏" },
            { value: 484, name: "邮箱" },
            { value: 300, name: "直播" },
          ],
        },
      ],
    });
    // echarts 有一些事件 可以查看官网
    // echarts的鼠标移动事件
    myCharts.on("mousemove", (params) => {
      const { name, value } = params.data;
      myCharts.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
      console.log(params);
    });
  },
};
</script>
<style lang="scss" scope>
.box-card {
  border-bottom: 1px solid #ebeef5;
  padding: 3px 0;
  width: 100%;
  position: relative;
}
.radio {
  position: absolute;
  right: 0;
  top: -6px;
}
.chart {
  width: 100%;
  height: 300px;
}
</style>
