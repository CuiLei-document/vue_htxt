<template>
  <el-card>
    <div slot="header" class="clearfix">
      <el-tabs class="tab" v-model="activeName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visits"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          class="date"
          type="daterange"
          range-separator="|"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="dateValue"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>
    <el-row>
      <el-col :span="19">
        <div class="chart" ref="charts"></div>
      </el-col>
      <el-col :span="5" class="col-top">
        <div class="content-right">
          <h4>门店{{ title }}排名</h4>
          <section class="content">
            <ul>
              <li>
                <span class="num-bg">1</span>
                <span>肯德基</span>
                <span class="number">323.342</span>
              </li>
              <li>
                <span class="num-bg">2</span>
                <span>麦当劳</span>
                <span class="number">323.342</span>
              </li>
              <li>
                <span class="num-bg">3</span>
                <span>肯德基</span>
                <span class="number">323.342</span>
              </li>
              <li>
                <span class="">4</span>
                <span>肯德基</span>
                <span class="number">323.342</span>
              </li>
              <li>
                <span class="">5</span>
                <span>肯德基</span>
                <span class="number">323.342</span>
              </li>
              <li>
                <span class="">6</span>
                <span>肯德基</span>
                <span class="number">323.342</span>
              </li>
              <li>
                <span class="">7</span>
                <span>肯德基</span>
                <span class="number">323.342</span>
              </li>
            </ul>
          </section>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";

import { mapState } from "vuex";
export default {
  data() {
    return {
      // 标签选中
      activeName: "sale",
      // echarts实例获取
      myCharts: null,
      // 保存开始和结束时间
      dateValue: [],
    };
  },
  computed: {
    title() {
      return this.activeName === "sale" ? "销售额" : "访问量";
    },
    // 获取mock数据
    ...mapState({
      listMock: (state) => state.home.list,
    }),
  },
  mounted() {
    this.myCharts = echarts.init(this.$refs.charts);
    this.myCharts.setOption({
      title: {
        text: this.title + "趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [],
          color: "green",
        },
      ],
    });
  },
  methods: {
    // 今日
    setDay() {
      //   console.log(dayjs);
      let start = dayjs().day(0).format("YYYY-MM-DD");
      this.dateValue = [start, start];
    },
    // 本周
    setWeek() {
      let start = dayjs().day(1).format("YYYY-MM-DD");
      let end = dayjs().day(7).format("YYYY-MM-DD");
      this.dateValue = [start, end];
    },
    // 本月
    setMonth() {
      let start = dayjs().startOf("month").format("YYYY-MM-DD");
      let end = dayjs().endOf("month").format("YYYY-MM-DD");
      this.dateValue = [start, end];
    },
    // 本年
    setYear() {
      let start = dayjs().startOf("year").format("YYYY-MM-DD");
      let end = dayjs().endOf("year").format("YYYY-MM-DD");
      this.dateValue = [start, end];
    },
  },
  watch: {
    title(newValue, oldValue) {
      console.log(newValue);
      // if (this.myCharts) {
      this.myCharts.setOption({
        title: {
          text: newValue + "趋势",
        },
        xAxis: [
          {
            type: "category",
            data:
              this.title === "销售额"
                ? this.listMock.orderFullYearAxis
                : this.listMock.userFullYearAxis,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data:
              this.title === "销售额"
                ? this.listMock.orderFullYear
                : this.listMock.userFullYear,
            color: "green",
          },
        ],
      });
    },
    listMock() {
      this.myCharts = echarts.init(this.$refs.charts);
      this.myCharts.setOption({
        title: {
          text: this.title + "趋势",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.listMock.orderFullYearAxis,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Direct",
            type: "bar",
            barWidth: "60%",
            data: this.listMock?.orderFullYear,
            color: "green",
          },
        ],
      });
    },
  },
};
</script>
<style lang="scss" scope>
.clearfix {
  display: flex;
  justify-content: space-between;
  position: relative;
}
.tab {
  width: 100%;
}
.right {
  position: absolute;
  right: 0;
  span {
    margin: 0 20px;
    &:hover {
      cursor: pointer;
    }
  }
  .date {
    width: 300px;
    margin: 0 20px;
  }
}
.chart {
  width: 100%;
  height: 300px;
}
.col-top {
  position: relative;
  top: -30px;
}
.content-right {
  .content {
    height: 300px;
    ul {
      list-style: none;
      padding: 0;
      li {
        width: 100%;
        height: 40px;
        :nth-child(1) {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin-right: 26px;
          text-align: center;
          line-height: 20px;
        }

        .num-bg {
          color: white;
          border-radius: 50%;
          background: black;
        }
        .number {
          float: right;
        }
      }
    }
  }
}
</style>