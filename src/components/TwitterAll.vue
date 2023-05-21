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
    props:{
      msg: String
    },
    data() {
      return{
        data: [],
      };
    },
    methods: {
      async getData() {
        try {
          const response = await axios.get('http://127.0.0.1:5000/getTest');
          console.log(response.data);
          this.data = response.data;
       
        } catch (error) {
          console.log(error);
        }
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
  
  