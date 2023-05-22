<template>
  <div>
    <h1>Twitter</h1>
    <p>This is the twitter page content.</p>

    <div class="button-container">
      <button class="btn btn-primary" @click="getData1">city</button>
      <button class="btn btn-primary" @click="getData2">language</button>
      <button class="btn btn-primary" @click="getData3">month</button>
      <button class="btn btn-primary" @click="getData4">city-polarity</button>
      <button class="btn btn-primary" @click="getData5">month-polarity</button>
    </div>

    <button class="btn btn-primary close-button" @click="closeData">close all</button>
    <div class="chart-container">
    <div id="chart" v-show="showChart1" style="width: 600px;height:400px;"></div>
      <div id="chart2" v-show="showChart2" style="width: 600px;height:800px;"></div>
      <div id="chart3" v-show="showChart3" style="width: 600px;height:400px;"></div>
      <div id="chart4" v-show="showChart4" style="width: 600px;height:400px;"></div>
      <div id="chart5" v-show="showChart5" style="width: 600px;height:400px;"></div>
    </div>
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
      chart3: null,
      chart4: null,
      chart5: null,
      data: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      showChart1: false,
      showChart2: false,
      showChart3: false,
      showChart4: false,
      showChart5: false
    };
  },
  async mounted() {
    this.chart = echarts.init(document.getElementById('chart'));
    this.chart2 = echarts.init(document.getElementById('chart2'));
    this.chart3 = echarts.init(document.getElementById('chart3'));
    this.chart4 = echarts.init(document.getElementById('chart4'));
    this.chart5 = echarts.init(document.getElementById('chart5'));
    
  },
  methods: {
    closeData(){
      this.showChart1 = false;
      this.showChart2 = false;
      this.showChart3 = false;
      this.showChart4 = false;
      this.showChart5 = false;
    },
    async getData1() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/city_num');
        console.log(response.data);
        this.data = response.data;
        this.showChart1 = true;
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
        this.showChart2 = true;
        this.updateChart2();
      } catch (error) {
        console.log(error);
      }
    },
    async getData3() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/month_num');
        console.log(response.data);
        this.data3 = response.data;
        this.showChart3 = true;
        this.updateChart3();
      } catch (error) {
        console.log(error);
      }
    },
    async getData4() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/city_polarity');
        console.log(response.data);
        this.data4 = response.data;
        this.showChart4 = true;
        this.updateChart4();
      } catch (error) {
        console.log(error);
      }
    },
    async getData5() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/polarity_month_average');
        console.log(response.data);
        this.data5 = response.data;
        this.showChart5 = true;
        this.updateChart5();
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
      const pieOption =
      {
        title: {
          text: 'Twitter Count by Language'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['30%', '70%'],
            avoidLabelOverlap: true,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: this.data2.map(item => ({ name: item.language, value: item.twitterCount })),
          }
        ]
      };
      this.chart2.setOption(pieOption);
    },
    updateChart3() {
      const option = {
        title: {
          text: 'Twitter Count by Month in 2022'
        },
        tooltip: {},
        xAxis: [{
          type: 'category',
          data: ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
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
          data: this.data3.map(item => item.twitterCount)
        }]
      };
      this.chart3.setOption(option);
    },
    updateChart4() {
      const option = {
        title: {
          text: 'Average Polarity by City'
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
        yAxis: {
        },
        series: [{
          name: 'Average Polarity',
          type: 'bar',
          data: this.data4.map(item => item.polarity)
        }]
      };
      this.chart4.setOption(option);
    },
    updateChart5() {
      const option = {
        title: {
          text: 'Average Polarity by Month in 2022'
        },
        tooltip: {},
        xAxis: [{
          type: 'category',
          data: ['FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
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
          name: 'Average Polarity',
          type: 'bar',
          data: this.data5.map(item => item.polarity)
        }]
      };
      this.chart5.setOption(option);
    },

  }
}
</script>

<style scoped>
.twitterall {
  text-align: center;
  margin-top: 20px;
}

.button-container {
  display: flex;
  justify-content: space-around;
}

.close-button {
  margin-top: 20px;
}
.chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>

  