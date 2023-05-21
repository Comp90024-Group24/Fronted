<template>
  <div>
    <h1>Twitter</h1>
    <p>This is the twitter page content.</p>
    <button class="btn btn-primary" @click="getData1">update city number</button>
    <div id="chart" style="width: 600px;height:400px;"></div>
    <button class="btn btn-primary" @click="getData2">update language number</button>
    <div id="chart2" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
  name: 'TwitterAll',
  data() {
    return {
      chart: null,
      chart2: null,
      data: [],
      data2:[],
    };
  },
  async mounted() {
    this.chart = echarts.init(document.getElementById('chart'));
    this.chart2 = echarts.init(document.getElementById('chart2'));
    await this.getData1();
  },
  methods: {
    async getData1() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/city_num');
        console.log(response.data);
        this.data = response.data;
        this.updateChart();
      } catch (error) {
        console.log(error);
      }
    },
    async getData2() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/lang_num');
        console.log(response.data);
        this.data2 = response.data;
        this.updateChart2();
      } catch (error) {
        console.log(error);
      }
    },
    updateChart() {
      const option = {
        title: {
          text: 'Twitter Count by City'
        },
        tooltip: {},
        xAxis: [{
            type: 'category',
            data: ['Adelaide', 'Capital', 'Brisbane', 'Darwin', 'Hobart', 'Melbourne', 'Perth', 'Sydney'],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              interval: 0,   
              rotate: 45 
            }
          }
        ],
        yAxis: {},
        series: [{
          name: 'Twitter Count',
          type: 'bar',
          data: this.data.map(item => item.twitterCount)
        }]
      };
      this.chart.setOption(option);
    },
    updateChart2() {
      const pieOption = {
        title: {
          text: 'Pie Chart Title',
          subtext: 'Subtext',
          left: 'center'
        },
        series: [{
          name: 'Series Name',
          type: 'pie',
          radius: '50%',
          data: this.data2.map(item => ({ name: item.language, value: item.twitterCount })),
        }]
      };
      this.chart2.setOption(pieOption);
    }

  }
}
</script>

<style scoped>
.twitterall {
  text-align: center;
  margin-top: 20px;
}
</style>

  