<template>
  
  <div>
    <h1>Mastodon Data</h1>
    <p>This is the Mastodon page content.</p>
    
    <button class="btn btn-primary" @click="getData1">month and num</button>
      

   
    <ul class="list-group">
        <li class="list-group-item" v-for="(item, index) in data" :key="index">
          {{ item }}
        </li>
      </ul>
    
    <button class="btn btn-primary sec-button" @click="getData2">polarity</button>
    
    <div id="chart2" v-show="showChart2" style="width: 600px;height:400px;"></div>


  </div>
</template>
  
<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
  name: 'MastodonH',
  props: {
    msg: String
  },

  data() {
    return {

      chart2: null,


      data: [],
      data2: [],

      showChart2: false,




      


    };
  },
  async mounted() {

    this.chart2 = echarts.init(document.getElementById('chart2'));

  },
  methods: {
    async getData1() {
      try {
        const response = await axios.get('http://172.26.133.42:8000/mastodon_month_num');
        console.log(response.data);
        this.data = response.data;

      } catch (error) {
        console.log(error);
      }
    },
    async getData2() {
      try {
        const response = await axios.get('http://172.26.133.42:8000/polarity_sum');
        console.log(response.data);
        this.data2 = response.data;
        this.showChart2 = true;
        this.updateChart2();
      } catch (error) {
        console.log(error);
      }
    },
    updateChart2() {
      const option = {
        title: {
          text: 'Polarity Sum'
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
        }
        ],
        yAxis: {
        },
        series: [{
          name: 'sum',
          type: 'bar',
          data: this.data2.map(item => item.sum)
        }]
      };
      this.chart2.setOption(option);
    },

  }
}
</script>
  
<style scoped>


.sec-button {
  text-align: center;
  margin-top: 40px;
}
</style>