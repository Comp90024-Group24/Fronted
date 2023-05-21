<template>
  <div>
    <h1>Twitter</h1>
    <p>This is the twitter page content.</p>
    <button class="btn btn-primary" @click="getData">update city number</button>
    <div id="chart" style="width: 600px;height:400px;"></div>
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
      data: [],
    };
  },
  async mounted() {
    this.chart = echarts.init(document.getElementById('chart'));
    await this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/city_num');
        console.log(response.data);
        this.data = response.data;
        this.updateChart();
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

  