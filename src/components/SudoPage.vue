<template>
  <div>
    <h1>SUDO Data</h1>
    <p>This is the SUDO page content.</p>
    <div class="button-container">
      <button class="btn btn-primary" @click="getData1">job number</button>
      <button class="btn btn-primary" @click="getData2">job Time</button>

    </div>

    <button class="btn btn-primary close-button" @click="closeData">close</button>

    <div id="chart" v-show="showChart1" style="width: 600px;height:400px;"></div>
    <div id="chart2" v-show="showChart2" style="width: 600px;height:400px;"></div>


  </div>
</template>
  
<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
  name: 'SudoPage',
  data() {
    return {
      chart: null,
      chart2: null,


      data: [],
      data2: [],


      showChart1: false,
      showChart2: false,


    };
  },
  async mounted() {
    this.chart = echarts.init(document.getElementById('chart'));
    this.chart2 = echarts.init(document.getElementById('chart2'));

  },
  methods: {
    closeData() {
      this.showChart1 = false;
      this.showChart2 = false;

    },
    async getData1() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/eachjobtype_num');
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
        const response = await axios.get('http://127.0.0.1:8000/job_type_time');
        console.log(response.data);
        this.data2 = response.data;
        this.showChart2 = true;
        this.updateChart2();
      } catch (error) {
        console.log(error);
      }
    },



    updateChart() {
      let artData = this.data.filter(item => item.Eachjobtype.startsWith('art')).map(item => item.num);
      let eduData = this.data.filter(item => item.Eachjobtype.startsWith('education')).map(item => item.num);
      let finData = this.data.filter(item => item.Eachjobtype.startsWith('finance')).map(item => item.num);
      let techData = this.data.filter(item => item.Eachjobtype.startsWith('technolopy')).map(item => item.num);
      let totalArt = artData.reduce((a, b) => a + b, 0);
      let totalEdu = eduData.reduce((a, b) => a + b, 0);
      let totalFin = finData.reduce((a, b) => a + b, 0);
      let totalTech = techData.reduce((a, b) => a + b, 0);

      const option = {

        title: {
          text: 'Job Count by Type'
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
        }],
        yAxis: [
          {
            type: 'value',
            name: 'type',
            min: 0,
            max: 500000,

          },
          {
            type: 'value',
            name: 'sum',

          }
        ],
        series: [
          {
            name: 'Labourers',
            type: 'bar',
            data: [artData[0], eduData[0], finData[0], techData[0]]
          },
          {
            name: 'Managers',
            type: 'bar',
            data: [artData[1], eduData[1], finData[1], techData[1]]
          },
          {
            name: 'Professionals',
            type: 'bar',
            data: [artData[2], eduData[2], finData[2], techData[2]]
          },
          {
            name: 'Total',
            type: 'line',
            yAxisIndex: 1,
            data: [totalArt, totalEdu, totalFin, totalTech]
          }
        ]
      };
      this.chart.setOption(option);
    },
    updateChart2() {
      const option = {
        title: {
          text: 'Average Work Time by City'
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
          name: 'time',
          type: 'bar',
          data: this.data2.map(item => item.time)
        }]
      };
      this.chart2.setOption(option);
    },

  }
}
</script>
  
<style scoped>
.button-container {
  display: flex;
  justify-content: space-around;
}

.close-button {
  margin-top: 20px;
}
</style>