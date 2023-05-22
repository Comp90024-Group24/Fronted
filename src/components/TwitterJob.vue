<template>
  <div>
    <h1>Twitter Job Data</h1>
    <p>This is the twitter page content.</p>
    <div class="button-container">
      <button class="btn btn-primary" @click="getData1">month</button>
      <button class="btn btn-primary" @click="getData2">job number</button>
      <button class="btn btn-primary" @click="getData3">month number</button>
      <button class="btn btn-primary" @click="getData4">polarity</button>
      
    </div>

    <button class="btn btn-primary close-button" @click="closeData">close</button>

    <div class="chart-container">
      <div id="chart" v-show="showChart1" style="width: 600px;height:400px;"></div>
      <div id="chart2" v-show="showChart2" style="width: 600px;height:400px;"></div>
      <div id="chart3" v-show="showChart3" style="width: 600px;height:400px;"></div>
      <div id="chart4" v-show="showChart4" style="width: 600px;height:400px;"></div>
    </div>
    

  </div>
</template>
  
<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
  name: 'TwitterJob',
  data() {
    return {
      chart: null,
      chart2: null,
      chart3: null,
      chart4: null,
      
      data: [],
      data2: [],
      data3: [],
      data4: [],
      data5: [],
      data6: [],
      data7: [],
      data8: [],
      data9: [],
      data0: [],

      showChart1: false,
      showChart2: false,
      showChart3: false,
      showChart4: false,
      
    };
  },
  async mounted() {
    this.chart = echarts.init(document.getElementById('chart'));
    this.chart2 = echarts.init(document.getElementById('chart2'));
    this.chart3 = echarts.init(document.getElementById('chart3'));
    this.chart4 = echarts.init(document.getElementById('chart4'));
  },
  methods: {
    closeData() {
      this.showChart1 = false;
      this.showChart2 = false;
      this.showChart3 = false;
      this.showChart4 = false;
    },
    async getData1() {
      try {
        const response = await axios.get('http://172.26.133.42:8000/art_num');
        console.log(response.data);
        this.data = response.data;
        this.showChart1 = true;
        const response2 = await axios.get('http://172.26.133.42:8000/edu_num');
        console.log(response2.data);
        this.data2 = response2.data;
        const response3 = await axios.get('http://172.26.133.42:8000/fin_num');
        console.log(response3.data);
        this.data3 = response3.data;
        const response4 = await axios.get('http://172.26.133.42:8000/tech_num');
        console.log(response4.data);
        this.data4 = response4.data;
        this.updateChart();
      } catch (error) {
        console.log(error);
      }
    },
    async getData2() {
      try {
        const response = await axios.get('http://172.26.133.42:8000/job_type_num');
        console.log(response.data);
        this.data5 = response.data;
        this.showChart2 = true;
        this.updateChart2();
      } catch (error) {
        console.log(error);
      }
    },
    async getData3() {
      try {
        const response = await axios.get('http://172.26.133.42:8000/industry_month_num');
        console.log(response.data);
        this.data6 = response.data;
        this.showChart3 = true;
        this.updateChart3();
      } catch (error) {
        console.log(error);
      }
    },
    async getData4() {
      try {
        const response = await axios.get('http://172.26.133.42:8000/art_polarity_num');
        console.log(response.data);
        this.data7 = response.data;
        const response2 = await axios.get('http://172.26.133.42:8000/edu_polarity_num');
        console.log(response2.data);
        this.data8 = response2.data;
        const response3 = await axios.get('http://172.26.133.42:8000/fin_polarity_num');
        console.log(response3.data);
        this.data9 = response3.data;
        const response4 = await axios.get('http://172.26.133.42:8000/tech_polarity_num');
        console.log(response4.data);
        this.data0 = response4.data;

        this.showChart4 = true;
        this.updateChart4();
      } catch (error) {
        console.log(error);
      }
    },
    
    
    updateChart() {
      const option = {
        
        title: {
          text: 'Twitter of Jobs Count by Month'
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
        }],
        yAxis: {},
        series: [
          {
            name: 'ART',
            type: 'bar',
            
            data: this.data.map(item => item.num)
          },
          {
            name: 'EDU',
            type: 'bar',
            
            data: this.data2.map(item => item.num)
          },
          {
            name: 'FIN',
            type: 'bar',
            
            data: this.data3.map(item => item.num)
          },
          {
            name: 'TECH',
            type: 'bar',
            
            data: this.data4.map(item => item.num)
          }
        ]
      };
      this.chart.setOption(option);
    },
    updateChart2() {
      const option = {
        title: {
          text: 'Twitter Count by Job Type'
        },
        tooltip: {},
        xAxis: [{
          type: 'category',
          data: ['ART', 'EDU', 'FIN', 'TECH'],
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
          data: this.data5.map(item => item.num)
        }]
      };
      this.chart2.setOption(option);
    },


    updateChart3() {
      const option = {
        title: {
          text: 'Twitter about Jobs Count by Month in 2022'
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
          data: this.data6.map(item => item.num)
        }]
      };
      this.chart3.setOption(option);
    },
    updateChart4() {
      const option = {
        
        title: {
          text: 'Polarity of Jobs'
        },
        tooltip: {},
        xAxis: [{
          type: 'category',
          data: ['Negative', 'Neutral', 'Positive'],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            rotate: 45
          }
        }],
        yAxis: {},
        series: [
          {
            name: 'ART',
            type: 'bar',
            
            data: this.data7.map(item => item.num)
          },
          {
            name: 'EDU',
            type: 'bar',
            
            data: this.data8.map(item => item.num)
          },
          {
            name: 'FIN',
            type: 'bar',
            
            data: this.data9.map(item => item.num)
          },
          {
            name: 'TECH',
            type: 'bar',
            
            data: this.data0.map(item => item.num)
          }
        ]
      };
      this.chart4.setOption(option);
    },

  }
}
</script>
  
  
<style scoped>
.twitterjob {
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

  
    