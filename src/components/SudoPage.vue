<template>
  <div>
    <h1>SUDO Data</h1>
    <p>This is the SUDO page content.</p>
    <div class="button-container">
      <button class="btn btn-primary" @click="getData1">job number</button>
      <button class="btn btn-primary" @click="getData2">city num</button>
      <button class="btn btn-primary" @click="getData3">gender</button>
      <button class="btn btn-primary" @click="getData4">work Time</button>

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
  name: 'SudoPage',
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
        const response = await axios.get('http://172.26.133.42:8000/eachjobtype_num');
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
        const response = await axios.get('http://172.26.133.42:8000/job_type_time');
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
        const response = await axios.get('http://172.26.133.42:8000/job_type_gender');
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
        const response = await axios.get('http://172.26.133.42:8000/num_jobtype');
        console.log(response.data);
        this.data4 = response.data;
        this.showChart4 = true;
        this.updateChart4();
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
          text: 'Job number by City'
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
          name: 'number',
          type: 'bar',
          data: this.data2.map(item => item.time)
        }]
      };
      this.chart2.setOption(option);
    },
    updateChart3() {
      const option = {
        title: {
          text: 'Different gender number by Job Type'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        xAxis: {
          type: 'category',
          data: this.data3.map(item => item.job_type)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Female',
            data: this.data3.map(item => item.gender.female),
            type: 'bar',
            stack: 'gender',
          },
          {
            name: 'Male',
            data: this.data3.map(item => item.gender.male),
            type: 'bar',
            stack: 'gender',
          },
        ]
      };
      this.chart3.setOption(option);
    },
    
    updateChart4() {
      






      const ageGroups = ["16_24", "25_34", "35_39", "41_48", "49over"];
      const jobTypes = ["art", "education", "finance", "technology"];

      let chartData = [];

      jobTypes.forEach(job => {
        let jobDataMale = { name: `${job} Male`, type: 'bar', stack: job, data: [] };
        let jobDataFemale = { name: `${job} Female`, type: 'bar', stack: job, data: [] };

        ageGroups.forEach(age => {
          let ageData = this.data4.find(item => item.num === `${job}_${age}`);
          if (ageData) {
            jobDataMale.data.push(ageData.jobetype.male);
            jobDataFemale.data.push(ageData.jobetype.female);
          } else {
            jobDataMale.data.push(0);
            jobDataFemale.data.push(0);
          }
        });

        chartData.push(jobDataMale);
        chartData.push(jobDataFemale);
      });









      const option = {
        title: {
          text: 'Average Work Time by Job Type and Gender'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: chartData.map(item => item.name),
          top: '7%',
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['16-24', '25-34', '35-39', '41-48', '49over']
        },
        series: chartData
      };

      this.chart4.setOption(option);
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

.chart-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>